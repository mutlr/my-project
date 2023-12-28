const client_id = '15a8e4b64b674454bf09e036d5a16fad';
const client_secret = '99e1cec4003e4bb0a06f24f232c32a07';
const router = require('express').Router();
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.get('/', async function(req, res) {
	const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
		},
		body: 'grant_type=client_credentials'
	})
	const data = await result.json()
	res.status(200).json({data})
});

router.get('/son', async (req, res) => {
	const result = await fetch('https://api.spotify.com/v1/search?q=gods%20plan&type=track&limit=1', {
		headers: {
			'Authorization': 'Bearer BQDnUGKQ_wLzmgJJleVlfLgKZ_hWKQ1BvjeZ83dgpSwBiZHzYbdTY5-tIFj5cGPgLCxzF1m2dlYoWtwty7mJpzBdzKMsnkOKc0XNT_q1AepR-grbwrI' 
		}
	})
	const r = await result.json()
	res.json({album: r})
})

module.exports = router