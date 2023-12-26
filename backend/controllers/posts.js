const router = require('express').Router();
const { Artist, Song, Post, User } = require('../models');

router.get('/', async (req, res) => {
	const posts = await Post.findAll({
		include: {
			model: Song,
            include: {
                model: Artist
            }
		}
	});
	res.status(200).json({ posts });
});

router.post('/', async (req, res, next) => {
	try {
		console.log('Req body posts: ', req.body.songId);
		const post = await Post.create(req.body);
		res.status(201).json({ post });
	} catch (error) {
		console.log('Menee tänne: ', error.message);
		next(error);
	}
});

module.exports = router;