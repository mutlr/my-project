const router = require('express').Router();
const { Song, Artist } = require('../models');

router.get('/', async (req, res) => {
	const songs = await Song.findAll({
		include: {
			model: Artist,
		}
	});
	res.status(200).json({ songs });
});

router.post('/', async (req, res, next) => {
	try {
		const song = await Song.create(req.body);
		res.status(201).json(song);
	} catch (error) {
		next(error);
	}
});

module.exports = router;