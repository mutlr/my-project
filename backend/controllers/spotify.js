const SpotifyWebApi = require('spotify-web-api-node');
const router = require('express').Router();
const { tokenExtractor, apiTokenExtractor } = require('../util/middleware');
const axios = require('axios');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: 'http://localhost:3000/test'
});

router.post('/authent', async (req, res) => {
	console.log('Req body!!!! ', req.body.code);
	spotifyApi.authorizationCodeGrant(req.body.code)
		.then(function(data) {
			console.log('The token expires in ' + data.body['expires_in']);
			console.log('The access token is ' + data.body['access_token']);
			console.log('The refresh token is ' + data.body['refresh_token']);

			// Set the access token on the API object to use it in later calls
			//spotifyApi.setAccessToken(data.body['access_token']);
			//spotifyApi.setRefreshToken(data.body['refresh_token']);
		},
		function(err) {
			console.log('Something went wrong!', err);
		}
		);
});

router.get('/songs/:name', apiTokenExtractor, async (req, res) => {
	const { name } = req.params;
    const result = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=track&limit=20`, {
        headers: {
            'Authorization': `Bearer ${req.api_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    res.status(200).json({ data: result.data.tracks.items });
});

module.exports = router;