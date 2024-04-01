const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDatabase } = require('./util/db');
const { checkAdminTime, checkAdmin } = require('./util/utils');
const { PORT } = require('./util/config');
const userRouter = require('./controllers/users');
const artistRouter = require('./controllers/artists');
const songRouter = require('./controllers/songs');
const postRouter = require('./controllers/posts');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const spotifyRouter = require('./controllers/spotify');
const { errorHandler } = require('./util/middleware');
const commentRouter = require('./controllers/comments');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.use('/api/users', userRouter);
app.use('/api/songs', songRouter);
app.use('/api/artists', artistRouter);
app.use('/api/posts', postRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/spotifyapi', spotifyRouter);
app.use('/api/comments', commentRouter);
app.use(errorHandler);

const start = async () => {
	if (process.env.NODE_ENV === 'test') return;
	await connectToDatabase();
	await checkAdmin();
	await checkAdminTime();
	app.listen(PORT, () => {
		console.log('App running on port', PORT);
	});
	setInterval(async () => {
		console.log('Refreshing admin token!');
		await checkAdminTime();
	}, 59 * 60000);
};

start();

module.exports = app;