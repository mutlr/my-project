const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const { connectToDatabase } = require('./util/db');
const { checkAdminTime, checkAdmin } = require('./util/utils');
const { PORT } = require('./util/config');
const { errorHandler } = require('./util/middleware');
const routes = require('./controllers');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(routes);
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
