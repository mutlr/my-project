const router = require('express').Router();
const axios = require('axios');
const { apiTokenExtractor, tokenExtractor, refreshUserToken } = require('../util/middleware');
const { CLIENT_ID, CLIENT_SECRET } = require('../util/config');
const { User } = require('../models');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: 'http://localhost:3000/myprofile',
});

router.post('/spotifyauthentication', tokenExtractor, async (req, res) => {
	const { code } = req.body;
	try {
		const data = await spotifyApi.authorizationCodeGrant(code);
		const user = await User.findByPk(req.decodedToken.id);
		const { access_token, refresh_token } = data.body;

		user.accessToken = access_token;
		user.refreshToken = refresh_token;

		await user.save();
		res.status(200).end();
	} catch (error) {
		console.log('Something went wrong!', error);
		res.status(500).json({ error });
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

router.get('/user/me', tokenExtractor, apiTokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id, {
			attributes: ['accessToken'],
		});
		console.log('Tulee: ', user.accessToken)
		const result = await axios.get('https://api.spotify.com/v1/me', {
			headers: {
				'Authorization': `Bearer ${user.accessToken}`
			}
		});
		console.log('REsult from spotify me: ', result)
		res.status(200).json({ data: result.data });
	} catch (error) {
		res.status(500).json({ error })
	}
})

router.get('/info/:id', refreshUserToken, async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			attributes: ['accessToken', 'name'],
		});
		const headers = {
			Authorization: `Bearer ${user.accessToken}`
		}
		const currentlyPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers });
		const info = await axios.get('https://api.spotify.com/v1/me', { headers })
		
		const userInfo= {
			display_name: info.data.display_name,
			uri: info.data.href,
			country: info.data.country
		}

		const player = currentlyPlaying.data === '' ? null : {
			preview_url: currentlyPlaying.data.item.preview_url,
			name: currentlyPlaying.data.item.name,
			artist: currentlyPlaying.data.item.album.artists[0].name
		}

		res.status(200).json({ userInfo, player, username: user.username })
	} catch (error) {
		console.log(error)
	}
})
module.exports = router;