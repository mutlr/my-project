const router = require('express').Router();
const { Song, Post, Comment, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { findOrCreateSong } = require('../util/utils');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
	const posts = await Post.findAll({});
	res.status(200).json({ posts });
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id);
		if (post.userId !== req.decodedToken.id || !post) {
			return res.status(400).json({ error: 'Something went wrong with deleting post!' });
		}

		await post.destroy();
		res.status(200).json({ post });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const post = await Post.findByPk(id);
		if (!post) return res.status(404).json({ error: 'No post found by ID' });
		res.status(200).json({ data: post });
	} catch (error) {
		console.log('Error from id posting: ', error);
		res.send(error);
	}
});

router.get('/all/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const posts = await Post.findAll({ where: { userId: id } });
		return res.status(200).json({ data: posts })
	} catch (error) {
		console.log('Error from id posting: ', error);
		res.send(error);
	}
});
router.post('/', tokenExtractor, async (req, res, next) => {
	const { title, description } = req.body;
	const { artistId, artistName } = req.body.artist;
	const { songId, songName } = req.body.song;
	try {
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId);
		const postId = await Post.create({ userId: id, title, songId: song.id, description });
		const post = await Post.findByPk(postId.id);
		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
});

router.post('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		if (title === '') {
			throw new Error('Title cannot be empty');
		}
		const post = await Post.findByPk(id);
		if (req.decodedToken.id !== post.userId ) return res.status(400).json({ error: 'Not your content to edit' });
		post.title = title;
		post.description = description;
		await post.save();
		res.status(200).end();
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;