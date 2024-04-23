const router = require('express').Router();
const { Song, } = require('../models');
const { findArtist } = require('../util/utils');
router.get('/', async (req, res) => {
	const songs = await Song.findAll();
	res.status(200).json({ songs });
});

router.post('/', async (req, res) => {
	const { artistId, artistName, songName, id } = req.body;
	const artist = await findArtist(artistId, artistName);
	const song = await Song.create({ artistId: artist.id, songName, id });
	res.status(201).json({ song });
});

module.exports = router;