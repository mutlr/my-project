require('dotenv').config();
module.exports = {
	DATABASE_URL: process.env.DATABASE_URL,
	DATABASE_URL_PRODUCTION: process.env.DATABASE_URL_PRODUCTION,
	DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
	PORT: process.env.PORT || 3001,
	SECRET: process.env.SECRET,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	MODE: process.env.NODE_ENV,
	HOST: process.env.HOST || 'localhost',
	DB_HOST: process.env.LOCALHOST,
};
