const router = require('express').Router();
const { Artist, Song } = require('../models');

router.get('/', async (_, res) => {
	const artists = await Artist.findAll({
        include: {
            model: Song,
        }
    });
	res.status(200).json({ artists });
});

router.post('/', async (req, res, next) => {
	try {
		const artist = await Artist.create(req.body);
		res.status(201).json({artist});
	} catch (error) {
        next(error)
    }
});

module.exports = router;