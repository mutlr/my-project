require('dotenv').config();

module.exports = {
	DATABASE_URL: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
	PORT: process.env.PORT || 3001,
	SECRET: process.env.SECRET,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
};