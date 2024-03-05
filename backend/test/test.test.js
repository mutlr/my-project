const server = require('../app.js');
const { connectToDatabase } = require('../util/db');
const supertest = require('supertest');
const { emptyDatabase, initDatabase } = require('./helpers.js');
let api = supertest(server);

describe('User Endpoints', () => {
	let token;
	beforeAll(async () => {
		await connectToDatabase();
		return initDatabase();
	});
	it('All users are in', async () => {
	  const res = await api.get('/users');
		expect(res.status).toEqual(200);
		expect(res.type).toEqual(expect.stringContaining('json'));
		expect(res.body).toHaveProperty('users');
		expect(res.body.users.length).toBe(2);
	});
	it('Register', async () => {
		const usersBefore = await api.get('/users');
		expect(usersBefore.body.users).toHaveLength(2);

		const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' }
		const res = await api.post('/register').send(user);
		expect(res.status).toEqual(201)
		expect(res.body).toHaveProperty('token')
		expect(res.body).toHaveProperty('id', 3)
		expect(res.body).toHaveProperty('username', 'User3')


		const usersAfter = await api.get('/users');
		expect(usersAfter.body.users).toHaveLength(3);
	});

	it('Login', async () => {
		const user = {username: 'User3', password: 'user123'};
		const result = await api.post('/login').send(user).expect(200);
		expect(result.body).toHaveProperty('authenticated', false)
		expect(result.body).toHaveProperty('username', 'User3')
		token = result.body.token;
	});
	it('Cant post without token', async () => {
		const postsBefore = await api.get('/posts').expect(200)
	
		const song = {
			songName: 'New random song',
			songId: 'song_id',
		};
		const artist = {
			artistName: 'Artist name',
			artistId: 'artist_id'
		}
		const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist}

		await api.post('/posts').send(post).expect(500)
		const postsAfter = await api.get('/posts').expect(200)

		expect(postsBefore.body.posts).toHaveLength(3)
		expect(postsAfter.body.posts).toHaveLength(3);
	})
	it('User can post', async () => {
		const postsBefore = await api.get('/posts').expect(200)
	
		const song = {
			songName: 'New random song',
			songId: 'song_id',
		};
		const artist = {
			artistName: 'Artist name',
			artistId: 'artist_id'
		}
		const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist}

		await api.post('/posts').set('authorization', `Bearer ${token}`).send(post).expect(201)
		const postsAfter = await api.get('/posts').expect(200)

		expect(postsBefore.body.posts).toHaveLength(3)
		expect(postsAfter.body.posts).toHaveLength(4);
	});
	afterAll(async () => {
		await emptyDatabase();
	});
});