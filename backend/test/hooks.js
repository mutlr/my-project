const { User, Song, Artist, Post } = require('../models/index');
const initDatabase = async () => {
	try {
		await User.bulkCreate([
			{ username: 'User1', email: 'user1@hotmail.com', password: 'user123' },
			{ username: 'User2', email: 'user2@hotmail.com', password: 'user123' }
		]);

		await Artist.bulkCreate([
			{ id: 'drake', artistName: 'Drake' },
			{ id: 'taylor_swift', artistName: 'Taylor Swift' }
		]);

		await Song.bulkCreate([
			{ id: 'gods_plan', songName: 'Gods plan', artistId: 'drake' },
			{ id: 'hotline_bling', songName: 'Hotline Bling', artistId: 'drake' },
			{ id: 'bad_blood', songName: 'Bad Blood', artistId: 'taylor_swift' }
		]);

		await Post.bulkCreate([
			{ title: 'Post number 1 title', description: 'Post number 1 description', userId: 1, songId: 'gods_plan' },
			{ title: 'Post number 2 title', description: 'Post number 2 description', userId: 1, songId: 'hotline_bling' },
			{ title: 'Post number 3 title', description: 'Post number 3 description', userId: 2, songId: 'bad_blood' },
		]);
		console.log('Database initted: ');
	} catch (error) {
		console.log('Error in bulk insert: ', error);
	}
};
const emptyDatabase = async () => {
	await User.truncate({ cascade: true, restartIdentity: true });
	await Song.truncate({ cascade: true, restartIdentity: true });
	await Artist.truncate({ cascade: true, restartIdentity: true });
	await Post.truncate({ cascade: true, restartIdentity: true });
};

module.exports = { initDatabase, emptyDatabase };