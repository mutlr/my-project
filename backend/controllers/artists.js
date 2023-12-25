const router = require('express').Router();
const { Artist } = require('../models');

router.get('/', async (req, res) => {
	const artists = await Artist.findAll({});
	res.status(200).json({ artists });
});

router.post('/', async (req, res) => {
	try {
		const artist = await Artist.create(req.body);
		res.status(201).json(artist);
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;