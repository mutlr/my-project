const router = require('express').Router();
const { Artist, Song } = require('../models');

router.get('/', async (req, res) => {
	const artists = await Artist.findAll({
		include: {
			model: Song,
		}
	});
	res.status(200).json({ artists });
});

router.post('/', async (req, res) => {
	const artist = await Artist.create(req.body);
	res.status(201).json({ artist });
});

module.exports = router;