const router = require('express').Router();
const { Comment } = require('../models');
const { tokenExtractor } = require('../util/middleware');
const { findOrCreateSong } = require('../util/utils');

router.post('/', tokenExtractor, async (req, res) => {
	const requestBody = req.body;
	if (!requestBody.song || !requestBody.artist || !requestBody.title || !requestBody.postId) {
		throw new Error('data_missing');
	}

	const { title, description, postId } = requestBody;
	const { artistId, artistName } = requestBody.artist;
	const { songId, songName, imageUrl } = requestBody.song;
	const { id } = req.decodedToken;

	const song = await findOrCreateSong(songName, songId, artistName, artistId, imageUrl);
	const comment = await Comment.create({ userId: id, songId: song.id, title, postId, description: description });
	const returnComment = await Comment.findByPk(comment.id);

	res.status(201).json({ returnComment });
});

router.delete('/:id', tokenExtractor, async (req, res) => {
	const comment = await Comment.findByPk(req.params.id);
	if (comment.userId !== req.decodedToken.id || !comment) {
		throw new Error('unauthorized');
	}

	await comment.destroy();
	res.status(200).end();
});
router.get('/all/:id', async (req, res) => {
	const { id } = req.params;
	const comments = await Comment.findAll({
		where: {
			userId: id
		}
	});
	return res.status(200).json({ data: comments });
});
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const comments = await Comment.findAll({
		where: {
			postId: id
		},
	});

	res.status(200).json({ data: comments });
});
router.post('/:id', tokenExtractor, async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	if (title === '' || !title) return res.status(400).json({ error: 'Title cannot be empty' });

	const comment = await Comment.findByPk(id);

	if (req.decodedToken.id !== comment.userId ) throw new Error('unauthorized');

	comment.title = title;
	comment.description = description;
	await comment.save();

	res.status(200).json({ data: comment });
});
module.exports = router;