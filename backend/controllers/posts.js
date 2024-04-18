const router = require('express').Router();
const { Post } = require('../models');
const { tokenExtractor, postFinder } = require('../util/middleware');
const { findOrCreateSong } = require('../util/utils');

router.get('/', async (req, res) => {
	const posts = await Post.findAll({});
	res.status(200).json({ posts });
});

router.delete('/:id', tokenExtractor, postFinder, async (req, res) => {
	try {
		const post = req.foundPost;
		if (post.userId !== req.decodedToken.id || !post) {
			return res.status(401).json({ error: 'Not your post to delete!' });
		}
		await post.destroy();
		res.status(200).end();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

router.get('/:id', postFinder, async (req, res) => {
	try {
		const post = req.foundPost;
		res.status(200).json({ data: post });
	} catch (error) {
		res.status(300).json({ error });
	}
});

router.get('/all/:id', async (req, res) => {
	try {
		const { id } = req.params;
		if (!id || !Number(id)) return res.status(500).json({ error: 'Id missing' });
		const posts = await Post.findAll({ where: { userId: id } });
		return res.status(200).json({ data: posts });
	} catch (error) {
		res.status(500).json({ error });
	}
});
router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const requestBody = req.body;
		if (!requestBody.song || !requestBody.artist || !requestBody.title) return res.status(500).json({ error: 'Data missing' });
		const { title, description } = requestBody;
		const { artistId, artistName } = requestBody.artist;
		const { songId, songName, imageUrl } = requestBody.song;
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId, imageUrl);
		const postId = await Post.create({ userId: id, title, songId: song.id, description });
		const post = await Post.findByPk(postId.id);
		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
});

router.post('/:id', tokenExtractor, postFinder, async (req, res) => {
	const { title, description } = req.body;
	try {
		if (title === '' || !title) return res.status(400).json({ error: 'Title cannot be empty' });
		const post = req.foundPost;
		if (req.decodedToken.id !== post.userId ) return res.status(401).json({ error: 'Not your content to edit' });
		post.title = title;
		post.description = description;
		await post.save();
		res.status(200).json({ data: post });
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;