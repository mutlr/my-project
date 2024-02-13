const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const axios = require('axios');

const userRouter = require('./controllers/users');
const artistRouter = require('./controllers/artists');
const songRouter = require('./controllers/songs');
const postRouter = require('./controllers/posts');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const spotifyRouter = require('./controllers/spotify');
const { errorHandler } = require('./util/middleware');
const { initToken } = require('./util/utils');

let spotifyToken = '';
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/songs', songRouter);
app.use('/artists', artistRouter);
app.use('/posts', postRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', spotifyRouter);

app.use(errorHandler);

const start = async () => {
	await connectToDatabase();
	await initToken();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();