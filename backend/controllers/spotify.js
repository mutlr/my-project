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
		res.status(500).json({ error: error.response.data.error_description });
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
		const token = req.userSpotifyToken
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

router.get('/playlists/:id',refreshUserToken,  async (req, res) => {
	try {		
		const user = await User.findByPk(1, {
			include: {
				model: Auth,
			}
		})
		const result = await axios.get(`https://api.spotify.com/v1/users/${user.auth.spotifyId}/playlists`, {
			headers: {
				Authorization: `Bearer ${user.auth.accessToken}`
			}
		});
		const tracks = result.data.items[0].tracks.href;
		const playlist = await axios.get(tracks, {
			headers: {
				Authorization: `Bearer ${user.auth.accessToken}`
			}
		});
		const t = playlist.data.items
		for (const [key, value] of Object.entries(t)) {
			const track = {
				name: value.track.name,
				artist: value.track.artists[0].name,
			}
			console.log(track);
		}
		res.status(200).json({ data: result.data, playlist: playlist.data.items })
	} catch (error) {
		console.log('Error in playlist: ', error)
		res.status(500).json({ error })
	}
})
module.exports = router;