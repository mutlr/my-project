const router = require('express').Router();
const { Song, Artist, Post, Comment } = require('../models/index');
const { emptyDatabase } = require('../test/helpers');
const axios = require('axios');
const initDatabase = async () => {
	try {
		await emptyDatabase();
		await axios.post('http://localhost:3001/api/register', {
			username: 'User1',
			email: 'user1@hotmail.com',
			password: 'user123',
		});
		await axios.post('http://localhost:3001/api/register', {
			username: 'User2',
			email: 'user2@hotmail.com',
			password: 'user123',
		});

		await Artist.bulkCreate([
			{ id: 'drake', artistName: 'Drake' },
			{ id: 'taylor_swift', artistName: 'Taylor Swift' },
		]);

		await Song.bulkCreate([
			{ id: 'gods_plan', songName: 'Gods plan', artistId: 'drake' },
			{ id: 'hotline_bling', songName: 'Hotline Bling', artistId: 'drake' },
			{ id: 'bad_blood', songName: 'Bad Blood', artistId: 'taylor_swift' },
		]);

		await Post.bulkCreate([
			{
				title: 'Post number 1 title',
				description: 'Post number 1 description',
				userId: 1,
				songId: 'gods_plan',
			},
			{
				title: 'Post number 2 title',
				description: 'Post number 2 description',
				userId: 1,
				songId: 'hotline_bling',
			},
			{
				title: 'Post number 3 title',
				description: 'Post number 3 description',
				userId: 2,
				songId: 'bad_blood',
			},
		]);
		await Comment.bulkCreate([
			{
				title: 'Comment title',
				description: 'Comment description',
				userId: 2,
				songId: 'bad_blood',
				postId: 1,
			},
		]);
	} catch (error) {
		console.log('Error in bulk insert: ', error);
	}
};
router.get('/cypress', async (req, res) => {
	await initDatabase();
	res.status(200).end();
});

router.get('/clear', async (req, res) => {
	await emptyDatabase();
	res.status(200).end();
});

module.exports = router;
