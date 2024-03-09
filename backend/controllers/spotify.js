const router = require('express').Router();
const axios = require('axios');
const { apiTokenExtractor, tokenExtractor, refreshUserToken } = require('../util/middleware');
const { CLIENT_ID, CLIENT_SECRET } = require('../util/config');
const { User, Auth } = require('../models');

const getUserTokens = async (code) => {
	const options = {
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		params: {
			grant_type: 'authorization_code',
			code,
			redirect_uri: 'http://localhost:3000/myprofile',
		}
	};
	const result = await axios(options);
	return result.data;
};

router.post('/spotifyauthentication', tokenExtractor, async (req, res) => {
	const { code } = req.body;
	try {
		const { id, username } = req.decodedToken;
		const token = req.headers['authorization'].split(' ')[1];

		const { access_token, refresh_token } = await getUserTokens(code);
		const spotifyData = await axios.get('https://api.spotify.com/v1/me', {
			headers: {
				'Authorization': `Bearer ${access_token}`,
			}
		});

		const [auth, created] = await Auth.findOrCreate({
			where: { userId: id },
			defaults: {
				accessToken: access_token,
				refreshToken: refresh_token,
				spotifyId: spotifyData.data.id,
			}
		});

		if (!created) {
			auth.accessToken = access_token;
			auth.refreshToken = refresh_token;
			auth.spotifyId = spotifyData.data.id;
			await auth.save();
		}

		res.status(200).json({ token, username, id, authenticated: true });
	} catch (error) {
		console.log('Something went wrong!', error);
		res.status(500).json({ error: error.data });
	}
});

router.get('/songs/:name', apiTokenExtractor, async (req, res) => {
	try {
		const { name } = req.params;
		const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`, {
			headers: {
				'Authorization': `Bearer ${req.api_token}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		res.status(200).json({ data: result.data.tracks.items });
	} catch (error) {
		console.log('Error in getting songs:', error);
		res.status(500).json({ error });
	}
});

router.get('/audio/:songid', apiTokenExtractor, async (req, res) => {
	try {
		const { songid } = req.params;
		const result = await axios.get(`https://api.spotify.com/v1/tracks/${songid}`, {
			headers: {
				'Authorization': `Bearer ${req.api_token}`,
			}
		});

		res.status(200).json({ data: result.data.preview_url });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.get('/info/:id', refreshUserToken, async (req, res) => {
	try {
		const token = req.userSpotifyToken;
		const username = req.username;
		const headers = {
			Authorization: `Bearer ${token}`
		};
		const info = await axios.get('https://api.spotify.com/v1/me', { headers });
		const currentlyPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers });

		const userInfo = {
			display_name: info.data.display_name,
			uri: info.data.href,
			country: info.data.country
		};

		const player = currentlyPlaying.data === '' ? null : {
			preview_url: currentlyPlaying.data.item.preview_url,
			name: currentlyPlaying.data.item.name,
			artist: currentlyPlaying.data.item.album.artists[0].name
		};

		res.status(200).json({ userInfo, player, username, });
	} catch (error) {
		//console.log('ERror in info: ', error)
		res.status(500).json({ error });
	}
});
const getPlaylists = async (token, spotifyID) => {
	const headers = {
		Authorization: `Bearer ${token}`
	};
	const result = await axios.get(`https://api.spotify.com/v1/users/${spotifyID}/playlists`, { headers });
	const URLS = [];
	for (const v of result.data.items) {
		URLS.push(v.href);
	}
	return Promise.all(URLS.map(url => {
		return axios.get(url, { headers })
			.then(result => {
				return result.data;
			});
	}));
};
const extractPlaylistData = (data) => {
	const lists = [];
	for (const [key, value] of Object.entries(data)) {
		if (value.tracks.items.length === 0) continue;
		const playlist = {
			name: value.name,
			items: []
		};

		for (const v of value.tracks.items) {
			const item = {
				song_name: v.track.name,
				artist: v.track.artists[0].name,
				preview_url: v.track.preview_url,
				id: v.track.id,
			};
			playlist.items.push(item);
		}
		lists.push(playlist);
	}
	return lists;
};
router.get('/playlists/:id', refreshUserToken, async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id, {
			include: {
				model: Auth,
			}
		});
		if (!user.auth) return res.status(200).json({ data: null });
		const { accessToken, spotifyId } = user.auth;
		const playlist = await getPlaylists(accessToken, spotifyId);
		const data = extractPlaylistData(playlist);
		res.status(200).json({ data, playlist: playlist });
	} catch (error) {
		console.log('Error in playlist: ', error.response.data);
		res.status(500).json({ error });
	}
});

const createPlaylist = async (user) => {
	const playlistResult = await axios.post(`https://api.spotify.com/v1/users/${user.auth.spotifyId}/playlists`,
		{ name: 'Project playlist', public: false, description: 'Playlist for my cool project' },
		{
			headers: {
				'Authorization': `Bearer ${user.auth.accessToken}`,
			}
		});
	user.auth.playlist = playlistResult.data.id;
	await user.auth.save();
};

router.post('/addtoplaylist', tokenExtractor, refreshUserToken, async (req, res) => {
	const { songId } = req.body;
	try {
		const user = await User.findByPk(req.decodedToken.id, {
			include: {
				model: Auth,
				attributes: ['accessToken', 'id', 'playlist', 'spotifyId']
			}
		});
		const { playlist, accessToken } = user.auth;
		if (!playlist) {
			await createPlaylist(user);
		}
		await axios.post(`https://api.spotify.com/v1/playlists/${playlist}/tracks`,
			{ uris: ['spotify:track:' + songId] },
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);
		res.status(201).end();
	} catch (error) {
		console.log('Error in adding to playlist: ', error );
		res.status(500).json({ error: error });
	}
});
module.exports = router;