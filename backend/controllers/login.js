const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../util/utils');

router.post('/', async (req, res) => {
	const { password } = req.body;
	try {
		const user = await User.findOne({
			where: { username: req.body.username },
			attributes: ['password', 'refreshToken', 'accessToken'],
		});
		const match = await bcrypt.compare(password, user.password);

		if (!user || !match) {
			return res.status(404).json({ error: 'Invalid username or password' });
		}
		const { username, id, accessToken } = user;
		const token = signToken({ username, id });
		console.log('Access token: ', user);
		const authenticated = accessToken === null ? false : true;
		res.status(200).json({ token, username, id, authenticated });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;