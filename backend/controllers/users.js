const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { signToken } = require('../util/utils')
const { CLIENT_ID, CLIENT_SECRET } = require('../util/config')
const axios = require('axios');

router.get('/', async (req, res) => {
	const users = await User.findAll({});
	res.status(200).json({ users });
});

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		const token = signToken({ username: user.username, id: user.id });
		res.status(201).json({ user, token });
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({
			where: { id },
		});

		if (user.username !== req.decodedToken.username) {
			return res.send('Not your account!');
		}
		await user.destroy();
		res.status(200).send('User deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
});
const getToken = async (code) => {
	try {
		const REDIRECT_URI = 'http://localhost:3000/';
		const params = new URLSearchParams({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "authorization_code",
			code: code,
			redirect_uri: REDIRECT_URI,
		});
	  
		const result = await axios.post("https://accounts.spotify.com/api/token", params, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		});
		return result.data;
	} catch (error) {
		throw error
	}
};
router.post('/authenticatespotify', tokenExtractor, async (req, res) => {
	const { code } = req.body;
	try {
		const tokenData = await getToken(code);
		console.log('Tuleeks ees tänne?')
		const user = await User.findByPk(req.decodedToken.id);
		user.accessToken = tokenData.access_token;
		user.refreshToken = tokenData.refresh_token;
		await user.save();
		console.log('Token data ', tokenData.access_token)
		return res.status(200).json({tokenData});
	} catch (error) {
		return res.status(500).json({error})
	}
});

const refreshToken = async (token) => {
	try {
		const body = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: token,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		})
		const result = await axios.post("https://accounts.spotify.com/api/token", body, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
		console.log('Result from refreshing token: ', result.data)
		return result.data
	} catch (error) {
		throw error
	}
}
router.get('/refreshtoken', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id, {
			attributes: ['refreshToken']
		})
		const result = await refreshToken(user.refreshToken);
		user.accessToken = result.access_token
		await user.save()
		res.status(200).json({data: result})
	} catch (error) {
		console.log('Error in refreshing token: ', error + '!!!')
		res.status(500).json({error})
	}
});

module.exports = router;