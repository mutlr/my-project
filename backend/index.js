const express = require('express');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const userRouter = require('./controllers/users');
const artistRouter = require('./controllers/artists');
const songRouter = require('./controllers/songs');

app.use(express.json());
app.use('/users', userRouter);
app.use('/songs', songRouter);
app.use('/artists', artistRouter);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();