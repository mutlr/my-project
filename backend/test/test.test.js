const server = require('../app.js');
const { connectToDatabase, sequelize, runMigrations } = require('../util/db');
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
	it('Register', async () => {
		const user = { username: 'User3', email: 'user2@hotmail.com', password: 'user123' }
		const res = await api.post('/register').send(user);
		expect(res.status).toEqual(201)
		expect(res.status.body).toHaveProperty('token')
		console.log('Res from users test: ', res.body);
		 
	});
	afterAll(async () => {
		await emptyDatabase();
	});
});