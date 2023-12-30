const router = require('express').Router();
const { Artist, Song, Post, Comment, User } = require('../models');
const { tokenExtractor } = require('../util/middleware')
const { findArtist } = require('../util/utils')
router.get('/', async (req, res) => {
	const posts = await Post.findAll({
		include: [
			{
				model: Song,
				attributes: { exclude: ['createdAt', 'updatedAt']},
				include: {
					model: Artist,
					attributes: { exclude: ['createdAt', 'updatedAt']},
				}
			},
			{
				model: Comment
			},
			{
				model: User,
				attributes: { exclude: ['createdAt', 'updatedAt', 'password']},
			}
		]
	});
	res.status(200).json({ posts });
});

const findOrCreateSong = async (name, songId, artistName, artistId) => {
	const artist = await findArtist(artistId, artistName);
	const song = await Song.findByPk(songId);
	if (!song) {
		return await Song.create({id: songId, songName: name, artistId: artist.id})
	}
	return song;
}
router.post('/', tokenExtractor, async (req, res, next) => {
	const {songId, artistId, title, songName, artistName} = req.body;
	try {
		const { id } = req.decodedToken
		const song = await findOrCreateSong(songName, songId, artistName, artistId)
		const post = await Post.create({userId: id, title, songId: song.id});
		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
});

router.post('/comment', tokenExtractor, async (req, res, next) => {
	const {songId, artistId, title, songName, artistName, postId} = req.body;
	try {
		const { id } = req.decodedToken
		const song = await findOrCreateSong(songName, songId, artistName, artistId)
		const comment = await Comment.create({userId: id, songId: song.id, text: title, postId });
		res.status(201).json({ comment });
	} catch (error) {
		next(error);
	}
});

module.exports = router;