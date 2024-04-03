const { api } = require('./helpers.js');

describe('Register tests', () => {
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