const router = require('express').Router();
const { Song, Post, Comment, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { findArtist } = require('../util/utils');
const {sequelize } = require('../util/db')
const { Op } = require('sequelize')
router.get('/', async (req, res) => {
	const posts = await Post.findAll();
	res.status(200).json({ posts });
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id); 
		if (post.userId !== req.decodedToken.id || !post) {
			return res.status(400).json({ error: 'Something went wrong with deleting post!'});
		}

		await post.destroy();
		res.status(200).json({ post });
	} catch (error) {
		console.log(error)
		res.status(500).json({ error })
	}
});

router.delete('/comment/:id', tokenExtractor, async (req, res) => {
	console.log('Tulee kommenttii: ', req.params.id)
	try {
		const comment = await Comment.findByPk(req.params.id); 
		if (comment.userId !== req.decodedToken.id || !comment) {
			return res.status(400).json({ error: 'Something went wrong with deleting comment!'});
		}

		await comment.destroy();
		res.status(200).json({ comment });
	} catch (error) {
		console.log(error)
		res.status(500).json({ error })
	}
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const query = req.query.type ? req.query.type.toLowerCase() : null
	console.log('ID ku hakee postin: ', id, query)
	try {
		if (query === 'posts') {
			const posts = await Post.findAll({ where: { userId: id }})
			return res.status(200).json({ posts })
		}
		const post = await Post.findByPk(id);
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

router.post('/comment', tokenExtractor, async (req, res, next) => {
	const { title, postId, description } = req.body;
	const { artistId, artistName } = req.body.artist;
	const { songId, songName } = req.body.song;
	try {
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId);
		const comment = await Comment.create({ userId: id, songId: song.id, title, postId, description: description });
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

router.post('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params;
	const { type } = req.query;
	const { title, description } = req.body;
	console.log('ID: ', id, 'title and desc: ', title, ' ja desc: ', description, ' ja type: ', type);
	try {
		if (title === '') {
			throw new Error('Title cannot be empty');
		}
		let item;
		if (type === 'post') {
			console.log('Tulee tänne postii');
			item = await Post.findByPk(id);
		} else if (type === 'comment') {
			console.log('Tulee tänne commenttii')
			item = await Comment.findByPk(id);
		}

		item.title = title;
		item.description = description;
		await item.save();
		res.status(200).end();
	} catch (error) {
		console.log('Tulee tän ja ', error)
		res.status(500).json({ error })
	}

})
router.get('/comments/:id', async (req, res) => {
	try {
		const query = req.query.type ? req.query.type.toLowerCase() : null
		const { id } = req.params;
		const where = {}
		if (query === 'comments') {
			where.userId = {
				[Op.eq]: id
			}
		} else {
			where.postId = {
				[Op.eq]: id
			}
		}
		const comments = await Comment.findAll({
			where,
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