const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const bcrypt = require('bcrypt');
const { signToken } = require('../util/utils')
router.post('/', async (req, res, next) => {
	const { username, name, email, password } = req.body;
	try {
		const saltedPassword = await bcrypt.hash(password, 10);
		console.log('On register: ', saltedPassword, password);
		const user = await User.create({ username, name, email, password: saltedPassword });
		const token = signToken({username: user.username, id: user.id});
		res.status(201).json({ token });
	} catch (error) {
		console.log('Error on register: ', error.message);
		next(error)
	}
});

module.exports = router;