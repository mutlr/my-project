const router = require('express').Router();
const { User, } = require('../models');
const bcrypt = require('bcrypt');
const { signToken } = require('../util/utils');

router.post('/', async (req, res) => {
	const { username, email, password } = req.body;
	const saltedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ username, email, password: saltedPassword });
	const token = signToken({ username: user.username, id: user.id });
	res.status(201).json({ token, username: user.username, id: user.id, authenticated: false });
});

module.exports = router;