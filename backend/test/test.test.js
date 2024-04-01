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
	it('Get posts', async () => {
		const postsBefore = await api.get('/api/posts').expect(200);
		console.log('Posts: ', postsBefore);
	});
	describe('Registering tests', () => {
		it('No duplicate emails or usernames', async () => {
			const user = { username: 'User3', email: 'user2@hotmail.com', password: 'user123' };
			const emailDuplicate = await api.post('/api/register').send(user).expect(400);
			expect(emailDuplicate.error).toBeDefined();

			user.username = 'User1';
			user.email = 'Notaduplicate@hotmail.com';
			const usernameDuplicate = await api.post('/api/register').send(user).expect(400);
			expect(usernameDuplicate.error).toBeDefined();
		});

		it('Register fails with missing data', async () => {
			const user = { username: 'User4', email: 'user4@hotmail.com' };
			await api.post('/api/register').send(user).expect(500);

		});
		it('Register with working data', async () => {
			const usersBefore = await api.get('/api/users');
			expect(usersBefore.body.users).toHaveLength(2);

			const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' };
			const res = await api.post('/api/register').send(user);

			expect(res.status).toEqual(201);
			expect(res.body).toHaveProperty('token');
			expect(res.body).toHaveProperty('username', 'User3');

			const usersAfter = await api.get('/api/users');
			expect(usersAfter.body.users).toHaveLength(3);
		});
	});
	describe('Login tests', () => {
		it('Login with working credentials', async () => {
			const user = { username: 'User3', password: 'user123' };
			const result = await api.post('/api/login').send(user).expect(200);

			expect(result.body).toBeDefined();
			expect(result.body).toHaveProperty('token');
			expect(result.body).toHaveProperty('username', 'User3');
			expect(result.body).toHaveProperty('authenticated', false);
			token = result.body.token;
		});
		it('Login with invalid username', async () => {
			const user = { username: 'Use', password: 'user123' };
			const res = await api.post('/api/login').send(user).expect(404);
			expect(res.body).toBeDefined();

		});
		it('Login with invalid password', async () => {
			const user = { username: 'User3', password: 'user' };
			const res = await api.post('/api/login').send(user).expect(404);
			expect(res.body).toBeDefined();
		});
	});

	describe('Post tests', () => {
		it('Cannot post without token', async () => {
			const postsBefore = await api.get('/api/posts').expect(200);

			const song = {
				songName: 'New random song',
				songId: 'song_id',
			};
			const artist = {
				artistName: 'Artist name',
				artistId: 'artist_id'
			};
			const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist };

			await api.post('/api/posts').send(post).expect(500);
			const postsAfter = await api.get('/api/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(3);
			expect(postsAfter.body.posts).toHaveLength(3);
		});
		it('User can post with token', async () => {
			const postsBefore = await api.get('/api/posts').expect(200);
			const song = {
				songName: 'New random song',
				songId: 'song_id',
			};
			const artist = {
				artistName: 'Artist name',
				artistId: 'artist_id'
			};
			const post = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist };

			await api.post('/api/posts').set('authorization', `Bearer ${token}`).send(post).expect(201);
			const postsAfter = await api.get('/api/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(3);
			expect(postsAfter.body.posts).toHaveLength(4);
		});
		it('Can edit your post', async () => {
			const edits = { title: 'Edited post title', description: 'Edit post description' };
			await api.post('/api/posts/4').set('authorization', `Bearer ${token}`).send(edits).expect(200);
		});
		it('Cannot edit someone else\'s post', async () => {
			const edits = { title: 'Edited post title', description: 'Edit post description' };
			const res = await api.post('/api/posts/2').set('authorization', `Bearer ${token}`).send(edits).expect(401);
			expect(res.error).toBeDefined();
		});
		it('Can delete post', async () => {
			const postsBefore = await api.get('/api/posts').expect(200);
			await api.delete('/api/posts/4').set('authorization', `Bearer ${token}`).expect(200);

			const postsAfter = await api.get('/api/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(4);
			expect(postsAfter.body.posts).toHaveLength(3);
		});
		it('Cannot delete someone else\'s post', async () => {
			const postsBefore = await api.get('/api/posts').expect(200);
			await api.delete('/api/posts/2').set('authorization', `Bearer ${token}`).expect(401);
			const postsAfter = await api.get('/api/posts').expect(200);

			expect(postsBefore.body.posts).toHaveLength(3);
			expect(postsAfter.body.posts).toHaveLength(3);
		});
	});

	describe('Comment tests', () => {
		const song = {
			songName: 'New random song',
			songId: 'song_id',
		};
		const artist = {
			artistName: 'Artist name',
			artistId: 'artist_id'
		};
		const comment = { title: 'Post number 1 title', description: 'Post number 1 description', song, artist, postId: 1 };
		beforeAll(async () => {
			const comment = { title: 'Comment for post', description: 'Comment number 1 description', song, artist, postId: 1 };
			await api.post('/api/comments').set('authorization', `Bearer ${token}`).send(comment).expect(201);
		});
		it('Commenting with token', async () => {
			const commentsBefore = await api.get('/api/comments/1').expect(200);
			expect(commentsBefore.body.data).toHaveLength(2);

			const res = await api.post('/api/comments').set('authorization', `Bearer ${token}`).send(comment).expect(201);
			console.log('Comment res: ', res);
			expect(res.body.returnComment['title']).toEqual('Post number 1 title');
			expect(res.body.returnComment['description']).toEqual('Post number 1 description');
			const commentsAfter = await api.get('/api/comments/1').expect(200);
			expect(commentsAfter.body.data).toHaveLength(3);
		});
		it('Cant comment without token', async () => {
			const commentsBefore = await api.get('/api/comments/1').expect(200);
			expect(commentsBefore.body.data).toHaveLength(3);

			const result = await api.post('/api/comments').send(comment).expect(500);
			expect(result.error).toBeDefined();

			const commentsAfter = await api.get('/api/comments/1').expect(200);
			expect(commentsAfter.body.data).toHaveLength(3);
		});
		it('Can edit your comment', async () => {
			const edits = { title: 'Edited comment title', description: 'Edit comment description' };
			await api.post('/api/comments/2').set('authorization', `Bearer ${token}`).send(edits).expect(200);
		});
		it('Cant edit someone elses comment', async () => {
			const edits = { title: 'Edited comment title', description: 'Edit comment description' };
			const res = await api.post('/api/comments/1').set('authorization', `Bearer ${token}`).send(edits).expect(401);
			expect(res.error).toBeDefined();
		});
		it('Can delete comment', async () => {
			await api.delete('/api/comments/2').set('authorization', `Bearer ${token}`).expect(200);
		});
		it('Cant delete someone elses comment', async () => {
			await api.delete('/api/comments/1').set('authorization', `Bearer ${token}`).expect(401);
		});
	});
	afterAll(async () => {
		await emptyDatabase();
	});
});