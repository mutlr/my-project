const router = require('express').Router();
const axios = require('axios');
const { apiTokenExtractor, tokenExtractor } = require('../util/middleware');
const { CLIENT_ID, CLIENT_SECRET } = require('../util/config');

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	redirectUri: 'http://localhost:3000/profile',
});

router.post('/spotifyauthentication', tokenExtractor, async (req, res) => {
	console.log('Req body!!!! ', req.body.code);
	spotifyApi.authorizationCodeGrant(req.body.code)
		.then( async data => {
			console.log('The token expires in ' + data.body['expires_in']);
			console.log('The access token is ' + data.body['access_token']);
			console.log('The refresh token is ' + data.body['refresh_token']);
			const refresh_token = data.body['refresh_token'];
			const access_token = data.body['access_token'];
			const user = req.decodedToken;
			user.access_token = access_token;
			user.refresh_token = refresh_token;
			console.log('User before auth: ', user);
			console.log('Spotify body: ', data.body);
			await user.save();
			console.log('user after auth: ', user);
			// Set the access token on the API object to use it in later calls
			//spotifyApi.setAccessToken(data.body['access_token']);
			//spotifyApi.setRefreshToken(data.body['refresh_token']);
		}).catch(err => console.log('Something went wrong!', err));
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
	const { songid } = req.params;
	const result = await axios.get(`https://api.spotify.com/v1/tracks/${songid}`, {
		headers: {
			'Authorization': `Bearer ${req.api_token}`,
		}
	});

	res.status(200).json({ data: result.data.preview_url });
});
module.exports = router;