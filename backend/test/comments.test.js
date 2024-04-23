const { api } = require('./helpers.js');
const song = {
	songName: 'New random song',
	songId: 'song_id',
};
const artist = {
	artistName: 'Artist name',
	artistId: 'artist_id'
};
const comment = { title: 'Second comment on first post', description: 'Description for comment number 2', song, artist, postId: 1 };
describe('Comment tests', () => {
	let token;
	beforeAll(async () => {
		const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' };
		const result = await api.post('/api/register').send(user).expect(201);
		token = result.body.token;
		const comment = { title: 'First comment on first post', song, artist, postId: 1 };
		await api.post('/api/comments').set('authorization', `Bearer ${token}`).send(comment).expect(201);
	});

	it('Commenting with token', async () => {
		const commentsBefore = await api.get('/api/comments/1').expect(200);
		expect(commentsBefore.body.data).toHaveLength(2);

		const res = await api.post('/api/comments').set('authorization', `Bearer ${token}`).send(comment).expect(201);

		expect(res.body.returnComment['title']).toEqual(comment.title);
		expect(res.body.returnComment['description']).toEqual(comment.description);

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