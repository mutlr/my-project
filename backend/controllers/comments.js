const router = require('express').Router();
const { Comment } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { findOrCreateSong } = require('../util/utils');

router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const requestBody = req.body;
		if (!requestBody.song || !requestBody.artist || !requestBody.title) return res.status(500).json({ error: 'Data missing' });
		const { title, description, postId } = requestBody;
		const { artistId, artistName } = requestBody.artist;
		const { songId, songName, imageUrl } = requestBody.song;
		const { id } = req.decodedToken;
		const song = await findOrCreateSong(songName, songId, artistName, artistId, imageUrl);
		const comment = await Comment.create({ userId: id, songId: song.id, title, postId, description: description });
		const returnComment = await Comment.findByPk(comment.id);
		res.status(201).json({ returnComment });
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	try {
		const comment = await Comment.findByPk(req.params.id);
		if (comment.userId !== req.decodedToken.id || !comment) {
			return res.status(401).json({ error: 'Something went wrong with deleting comment!' });
		}

		await comment.destroy();
		res.status(200).json({ comment });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});
router.get('/all/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const comments = await Comment.findAll({
			where: {
				userId: id
			}
		});
		return res.status(200).json({ data: comments });
	} catch (error) {
		res.status(500).json({ error });
	}
});
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const comments = await Comment.findAll({
			where: {
				postId: id
			},
		});
		res.status(200).json({ data: comments });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.post('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		if (title === '' || !title) return res.status(400).json({ error: 'Title cannot be empty' });

		const comment = await Comment.findByPk(id);
		if (req.decodedToken.id !== comment.userId ) return res.status(401).json({ error: 'Not your content to edit' });
		comment.title = title;
		comment.description = description;
		await comment.save();
		res.status(200).json({ data: comment });
	} catch (error) {
		res.status(500).json({ error });
	}
});
module.exports = router;