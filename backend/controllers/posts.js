const router = require('express').Router();
const { Song, Post, Comment, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { findArtist } = require('../util/utils');
router.get('/', async (req, res) => {
	const posts = await Post.findAll();
	res.status(200).json({ posts });
});

router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id);
		if (!post) return res.status(404).json({ error: 'No post found by ID' });
		res.status(200).json({ post });
	} catch (error) {
		console.log('Error from id posting: ', error);
		res.send(error);
	}
});

const findOrCreateSong = async (name, songId, artistName, artistId) => {
	const artist = await findArtist(artistId, artistName);
	const song = await Song.findByPk(songId);
	if (!song) {
		return await Song.create({ id: songId, songName: name, artistId: artist.id });
	}
	return song;
};
router.post('/', tokenExtractor, async (req, res, next) => {
	console.log('Req bodyn song: ', req.body.song);
	const { title, description } = req.body;
	const { artistId, artistName } = req.body.artist;
	const { songId, songName } = req.body.song;
	try {
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId);
		const post = await Post.create({ userId: id, title, songId: song.id, description });
		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
});

router.post('/comment', tokenExtractor, async (req, res, next) => {
	const { title, postId, description } = req.body;
	const { artistId, artistName } = req.body.artist;
	const { songId, songName } = req.body.song;
	try {
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId);
		const comment = await Comment.create({ userId: id, songId: song.id, text: title, postId, description: description });
		const returnComment = await Comment.findByPk(comment.id, {
			include: [
				{
					model: User
				},
				{
					model: Song,
				}
			]
		});
		res.status(201).json({ returnComment });
	} catch (error) {
		next(error);
	}
});

router.get('/comments/:id', async (req, res) => {
	try {
		const comments = await Comment.findAll({
			where: { postId: req.params.id },
			include: [{
				model: User,
			},
			{
				model: Song,
			}]
		});
		res.status(201).json({ comments });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
module.exports = router;