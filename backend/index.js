const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { CLIENT_ID, CLIENT_SECRET } = require('./util/config');
const { timeChecker } = require('./util/utils');
const userRouter = require('./controllers/users');
const artistRouter = require('./controllers/artists');
const songRouter = require('./controllers/songs');
const postRouter = require('./controllers/posts');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const spotifyRouter = require('./controllers/spotify');
const { Admin } = require('./models');
const { errorHandler } = require('./util/middleware');
const axios = require('axios');

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

const refreshAdminToken = async () => {
	let options = {
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
		},
		params: {
			grant_type: 'client_credentials'
		}
	};

	const result = await axios(options);
	return result.data.access_token;
};

const checkAdminTime = async () => {
	const admin = await Admin.findByPk(1);
	if (timeChecker(admin.updatedAt) === true) {
		const token = await refreshAdminToken();
		admin.token = token;
		await admin.save();
	}
};

const checkAdmin = async () => {
	try {
		const admin = await Admin.findByPk(1);
		if (!admin) {
			console.log('Menee tän');
			const createdAdmin = await Admin.create({ id: 1 });
			const token = await refreshAdminToken();
			createdAdmin.token = token;
			await createdAdmin.save();
		}
	} catch (error) {
		console.log('Error during admin check!', error);
	}
};
const start = async () => {
	await connectToDatabase();
	await checkAdmin();
	await checkAdminTime();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};
setInterval(async () => {
	console.log('Refreshing admin token!');
	await checkAdminTime();
}, 59 * 60000);

start();