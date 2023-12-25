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

router.post('/', async (req, res) => {
	try {
		const song = await Song.create(req.body);
		res.status(201).json(song);
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;