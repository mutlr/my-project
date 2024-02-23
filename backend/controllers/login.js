const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../util/utils');

router.post('/', async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({
			where: { username },
			attributes: ['password', 'refreshToken', 'accessToken'],
		});
		const match = await bcrypt.compare(password, user.password);

		if (!user || !match) {
			return res.status(404).json({ error: 'Invalid username or password' });
		}
		const token = signToken({ username: user.username, id: user.id });
		res.status(200).json({ token, username: user.username, id: user.id });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = router;