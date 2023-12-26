const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');

router.get('/', async (req, res) => {
	const users = await User.findAll({});
	res.status(200).json({ users });
});

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		const token = jwt.sign({ username: user.username, id: user.id }, SECRET);
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
		console.log('Menee tänne');
		res.status(500).json({ error });
	}
});

module.exports = router;