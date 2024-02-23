const router = require('express').Router();
const axios = require('axios');
const { apiTokenExtractor, tokenExtractor } = require('../util/middleware');
const { CLIENT_ID, CLIENT_SECRET } = require('../util/config');

const SpotifyWebApi = require('spotify-web-api-node');
const { User } = require('../models');

const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: 'http://localhost:3000/profile',
});

router.post('/spotifyauthentication', tokenExtractor, async (req, res) => {
    const { code } = req.body;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code)
        const user = await User.findByPk(req.decodedToken.id);

        user.access_token = data.body.access_token;
        user.refresh_token = data.body.refresh_token;
        await user.save();
        res.status(200).end()
    } catch (error) {
        console.log('Something went wrong!', error)
        res.status(500).json({ error })
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
		res.status(500).json({ error })
	}
});
module.exports = router;