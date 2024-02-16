const jwt = require('jsonwebtoken');
const { SECRET, CLIENT_ID, CLIENT_SECRET } = require('./config');
const { Song, Admin } = require('../models');
const { timeChecker } = require('../util/utils');
const axios = require('axios');
const errorHandler = (error, req, res, next) => {
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
		console.log('Menee tänne!');
		const token = await refreshAdminToken();
		admin.token = token;
		await admin.save();
	}
};
const apiTokenExtractor = async (req, res, next) => {
	const admin = await Admin.findByPk(1);
	await checkAdminTime();
	req.api_token = admin.token;
	next();
};
const songFinder = async (req, res, next) => {
	return await Song.findOne({ where: { songName: req.songName } });
};
module.exports = {
	errorHandler,
	tokenExtractor,
	songFinder,
	apiTokenExtractor,
};