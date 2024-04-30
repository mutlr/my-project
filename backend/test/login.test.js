const { api } = require('./helpers.js');

describe('Login tests', () => {
	beforeAll(async () => {
		const user = {
			username: 'User3',
			email: 'user3@hotmail.com',
			password: 'user123',
		};
		await api.post('/api/register').send(user).expect(201);
	});
	it('Login with working credentials', async () => {
		const user = { username: 'User3', password: 'user123' };
		const result = await api.post('/api/login').send(user).expect(200);

		expect(result.body).toBeDefined();
		expect(result.body).toHaveProperty('token');
		expect(result.body).toHaveProperty('username', 'User3');
		expect(result.body).toHaveProperty('authenticated', false);
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
