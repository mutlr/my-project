const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor } = require('../util/middleware')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
router.get('/', async (req, res) => {
	const users = await User.findAll({});
	res.status(200).json({ users });
});

router.post('/', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({user});
	} catch (error) {
        next(error)
	}
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id } });
		await user.destroy();
		res.status(200).send('User deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;