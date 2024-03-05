const server = require('../app.js');
const { connectToDatabase } = require('../util/db');
const supertest = require('supertest');
const { emptyDatabase, initDatabase } = require('./helpers.js');
let api = supertest(server);

describe('Backend tests', () => {
	let token;
	beforeAll(async () => {
		await connectToDatabase();
		await initDatabase();
	});

	describe('Registering tests', () => {
		it('No duplicate emails or usernames', async () => {
			const user = { username: 'User3', email: 'user2@hotmail.com', password: 'user123' };
			const emailDuplicate = await api.post('/register').send(user).expect(400);
			expect(emailDuplicate.error).toBeDefined();

			user.username = 'User1';
			user.email = 'Notaduplicate@hotmail.com';
			const usernameDuplicate = await api.post('/register').send(user).expect(400);
			expect(usernameDuplicate.error).toBeDefined();
		});

		it('Register fails with missing data', async () => {
			const user = { username: 'User4', email: 'user4@hotmail.com' };
			await api.post('/register').send(user).expect(500);

		});
		it('Register with working data', async () => {
			const usersBefore = await api.get('/users');
			expect(usersBefore.body.users).toHaveLength(2);

			const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' };
			const res = await api.post('/register').send(user);

			expect(res.status).toEqual(201);
			expect(res.body).toHaveProperty('token');
			expect(res.body).toHaveProperty('username', 'User3');

			const usersAfter = await api.get('/users');
			expect(usersAfter.body.users).toHaveLength(3);
		});
	});
	describe('Login tests', () => {
		it('Login with working credintials', async () => {
			const user = { username: 'User3', password: 'user123' };
			const result = await api.post('/login').send(user).expect(200);

			expect(result.body).toBeDefined();
			expect(result.body).toHaveProperty('token');
			expect(result.body).toHaveProperty('username', 'User3');
			expect(result.body).toHaveProperty('authenticated', false);
			token = result.body.token;
		});
		it('Login with invalid username', async () => {
			const user = { username: 'Use', password: 'user123' };
			const res = await api.post('/login').send(user).expect(404);
			expect(res.body).toBeDefined();

		});
		it('Login with invalid password', async () => {
			const user = { username: 'User3', password: 'user' };
			const res = await api.post('/login').send(user).expect(404);
			expect(res.body).toBeDefined();
		});
	});
	describe('Post tests', () => {
		it('Cant post without token', async () => {
			const postsBefore = await api.get('/posts').expect(200);

			const song = {
				songName: 'New random song',
				songId: 'song_id',
			};
			const artist = {
				artistName: 'Artist name',
				artistId: 'artist_id'
			};
			const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist };

			await api.post('/posts').send(post).expect(500);
			const postsAfter = await api.get('/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(3);
			expect(postsAfter.body.posts).toHaveLength(3);
		});
		it('User can post with token', async () => {
			const postsBefore = await api.get('/posts').expect(200);
			const song = {
				songName: 'New random song',
				songId: 'song_id',
			};
			const artist = {
				artistName: 'Artist name',
				artistId: 'artist_id'
			};
			const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist };

			await api.post('/posts').set('authorization', `Bearer ${token}`).send(post).expect(201);
			const postsAfter = await api.get('/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(3);
			expect(postsAfter.body.posts).toHaveLength(4);
		});
	});
	afterAll(async () => {
		await emptyDatabase();
	});
});