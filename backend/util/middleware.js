const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Song } = require('../models')
const errorHandler = (error, req, res, next) => {
	//   console.log('Error: ', error)

	if (error.name === 'SequelizeUniqueConstraintError') {
		const value = error.errors[0].value;
		const type = error.errors[0].path;
		return res.status(400).json({ error: `${type} ${value} is already in database` });
	} else if (error.name === 'SequelizeForeignKeyConstraintError') {
		return res.status(404).json({ error: error.parent.detail });
	} else if (error.name === 'SequelizeValidationError') {
		return res.status(500).json({ error: error.errors[0].message });
	}
	next(error);
};

const tokenExtractor = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const user = jwt.verify(token, SECRET);
		req.decodedToken = user;
		next();
	} catch (error) {
		return res.status(404).json({ error: 'Invalid token' });
	}
};

const songFinder = async (req, res, next) => {
	return await Song.findOne({ where: {songName: req.songName}})
}
module.exports = {
	errorHandler,
	tokenExtractor,
	songFinder,
};