const express = require('express');
const app = express();
const cors = require('cors');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { CLIENT_ID, CLIENT_SECRET } = require('./util/config');

const userRouter = require('./controllers/users');
const artistRouter = require('./controllers/artists');
const songRouter = require('./controllers/songs');
const postRouter = require('./controllers/posts');
const registerRouter = require('./controllers/register');
const loginRouter = require('./controllers/login');
const { errorHandler } = require('./util/middleware');
const { Admin } = require('./models');

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/songs', songRouter);
app.use('/artists', artistRouter);
app.use('/posts', postRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use(errorHandler);

const timeChecker = async (updatedAt) => {
	// const admin = await Admin.findByPk(1);
	const old = new Date(updatedAt);
	const today = new Date();
	return Math.floor((today - old) / 1000 / 60) >= 58;
};
const refreshAdminToken = async () => {
	const result = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
		},
		body: 'grant_type=client_credentials'
	});
	const data = await result.json();
	return data.access_token;
};
const checkAdminTime = async () => {
	const admin = await Admin.findByPk(1);
	if (timeChecker(admin.updatedAt)) {
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
			console.log('Admin after token: ', admin);
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