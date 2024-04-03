const { api } = require('./helpers.js');

describe('Post tests', () => {
    let token;
    beforeAll(async () => {
        const user = { username: 'User3', email: 'user3@hotmail.com', password: 'user123' };
        const result = await api.post('/api/register').send(user).expect(201);
        token = result.body.token;
    })
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