const server = require('../app.js');
const { connectToDatabase } = require('../util/db');
const supertest = require('supertest');
const { emptyDatabase, initDatabase } = require('./hooks.js');
let api = supertest(server);

describe('User Endpoints', () => {
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
	describe('Registering tests', () => {
		it('No duplicate emails or usernames', async () => {
			const user = { username: 'User3', email: 'user2@hotmail.com', password: 'user123' }
			const emailDuplicate = await api.post('/register').send(user).expect(400);
			expect(emailDuplicate.error).toBeDefined()
	
			user.username = 'User1';
			user.email = 'Notaduplicate@hotmail.com';
			const usernameDuplicate = await api.post('/register').send(user).expect(400);
			expect(usernameDuplicate.error).toBeDefined()
		});
	
		it('Register fails with missing data', async () => {
			const user = { username: 'User4', email: 'user4@hotmail.com' };
			await api.post('/register').send(user).expect(500);
		})
		it('Register', async () => {
			const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' }
			const res = await api.post('/register').send(user).expect(201);
			expect(res.body).toHaveProperty('token')
		});
	});
	describe('Login tests', () => {
		it('Login with working credintials', async () => {
			const user = { username: 'User3', password: 'user123' };
			const result = await api.post('/login').send(user).expect(200);

			expect(result.body).toBeDefined()
			expect(result.body).toHaveProperty('token');
			expect(result.body).toHaveProperty('username', 'User3');
		});
		it('Login with invalid username', async () => {
			const user = { username: 'Use', password: 'user123' };
			const i = await api.post('/login').send(user)
			expect(i.body).toThrow(new Error('Invalid username or password'));

		})
	})
	afterAll(async () => {
		await emptyDatabase();
	});
});