require('dotenv').config();

module.exports = {
	DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:mysecretpassword@localhost:5432/postgres',
	PORT: process.env.PORT || 3001,
	SECRET: process.env.SECRET,
};