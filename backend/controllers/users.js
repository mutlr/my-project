const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { Op } = require('sequelize');

router.delete('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);

	if (user.username !== req.decodedToken.username) {
		throw new Error('unauthorized');
	}

	await user.destroy();
	res.status(200).end();
});
router.get('/getusers/:name', async (req, res) => {
	const { name } = req.params;
	const users = await User.findAll({
		where: {
			username: {
				[Op.like]: `%${name}%`
			},
		},
		limit: 5,
	});
	res.status(200).json({ users });
});

router.get('/', async (req, res) => {
	const users = await User.findAll({});
	res.status(200).json({ users });
});

router.get('/:id', async (req, res) => {
	const user = await User.findByPk(req.params.id, {
	});
	res.status(200).json({ user });
});

module.exports = router;