const router = require('express').Router();
const { Song, Artist } = require('../models');

router.get('/', async (req, res) => {
	const songs = await Song.findAll({
		include: {
			model: Artist
		}
	});
	res.status(200).json({ songs });
});

router.post('/', async (req, res, next) => {
	const { artistId, artistName, songName, id } = req.body
	try {
		let artist = await Artist.findOne( { where: {id: artistId}})
		if (!artist) {
			artist = await Artist.create({ id: artistId, artistName})
		}
		const song = await Song.create({ artistId: artist.id || artistId, songName, id});
		res.status(201).json({song});
	} catch (error) {
		next(error);
	}
});

module.exports = router;