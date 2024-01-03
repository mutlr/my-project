const router = require('express').Router();
const { Song, Artist } = require('../models');
const { findArtist } = require('../util/utils')
router.get('/', async (req, res) => {
	const songs = await Song.findAll();
	res.status(200).json({ songs });
});

router.post('/', async (req, res, next) => {
	const { artistId, artistName, songName, id } = req.body
	try {
		const artist = await findArtist(artistId, artistName);
		const song = await Song.create({ artistId: artist.id, songName, id});
		res.status(201).json({song});
	} catch (error) {
		next(error);
	}
});

module.exports = router;