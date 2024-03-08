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

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/songs', songRouter);
app.use('/artists', artistRouter);
app.use('/posts', postRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/spotifyapi', spotifyRouter);

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