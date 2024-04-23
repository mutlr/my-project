const router = require('express').Router();
const { Post } = require('../models');
const { tokenExtractor, postFinder } = require('../util/middleware');
const { findOrCreateSong } = require('../util/utils');

router.get('/', async (req, res) => {
	const posts = await Post.findAll({});
	res.status(200).json({ posts });
});

router.delete('/:id', tokenExtractor, postFinder, async (req, res) => {
	const post = req.foundPost;
	if (post.userId !== req.decodedToken.id || !post) {
		throw new Error('unauthorized');
	}
	await post.destroy();
	res.status(200).end();
});

router.get('/:id', postFinder, async (req, res) => {
	const post = req.foundPost;
	res.status(200).json({ data: post });
});

router.get('/all/:id', async (req, res) => {
	const { id } = req.params;
	if (!id || !Number(id)) throw new Error('data_missing');
	const posts = await Post.findAll({ where: { userId: id } });
	return res.status(200).json({ data: posts });
});
router.post('/', tokenExtractor, async (req, res) => {
	const requestBody = req.body;
	if (!requestBody.song || !requestBody.artist || !requestBody.title) {
		throw new Error('data_missing');
	}

	const { title, description } = requestBody;
	const { artistId, artistName } = requestBody.artist;
	const { songId, songName, imageUrl } = requestBody.song;
	const { id } = req.decodedToken;

	const song = await findOrCreateSong(songName, songId, artistName, artistId, imageUrl);
	const postId = await Post.create({ userId: id, title, songId: song.id, description });
	const post = await Post.findByPk(postId.id);

	res.status(201).json({ post });
});

router.post('/:id', tokenExtractor, postFinder, async (req, res) => {
	const { title, description } = req.body;
	if (title === '' || !title) {
		return res.status(401).json({ error: 'Title cannot be empty' });
	}

	const post = req.foundPost;
	if (req.decodedToken.id !== post.userId ) {
		throw new Error('unauthorized');
	}

	post.title = title;
	post.description = description;
	await post.save();

	res.status(200).json({ data: post });
});

module.exports = router;