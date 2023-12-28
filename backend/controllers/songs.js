const router = require('express').Router();
const { Song, Artist } = require('../models');

router.get('/', async (req, res) => {
	const songs = await Song.findAll({
	});
	res.status(200).json({ songs });
});

router.post('/', async (req, res, next) => {
	const { artistId, artistName, songName, id } = req.body
	try {
		let artist = await Artist.findByPk(artistId)
		console.log('Artist by find: ', artist)
		if (artist === null) {
			artist = await Artist.create({ artistId, artistName})
		}
		console.log('Artist after creation: ', artist)
		const song = await Song.create({ artistId, songName, id});
		res.status(201).json(song);
	} catch (error) {
		next(error);
	}
});

module.exports = router;