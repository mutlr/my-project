const { emptyDatabase, initDatabase } = require('./helpers.js');
const { connectToDatabase } = require('../util/db');

beforeAll(async () => {
	await connectToDatabase();
	await emptyDatabase();
	await initDatabase();
});

afterAll(async () => {
	await emptyDatabase();
});