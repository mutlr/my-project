const router = require('express').Router();
const { Artist, Song, Post, Comment } = require('../models');
const { tokenExtractor } = require('../util/middleware')
router.get('/', async (req, res) => {
	const posts = await Post.findAll({
		include: [
			{
				model: Song,
				include: {
					model: Artist
				}
			},
			{
				model: Comment
			}
		]
	});
	res.status(200).json({ posts });
});

router.post('/', tokenExtractor, async (req, res, next) => {
	try {
		const { id } = req.decodedToken
		const post = await Post.create({userId: id, ...req.body});
		res.status(201).json({ post });
	} catch (error) {
		console.log('Menee tänne: ', error);
		next(error);
	}
});

router.post('/comment', tokenExtractor, async (req, res, next) => {
	try {
		const { id } = req.decodedToken
		const comment = await Comment.create({userId: id, ...req.body });
		res.status(201).json({ comment });
	} catch (error) {
		next(error);
	}
});

module.exports = router;