const jwt = require('jsonwebtoken');
const { SECRET, } = require('./config');
const { Admin, User } = require('../models');
const { checkAdminTime, timeChecker, refreshToken } = require('../util/utils');

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
	const token = req.headers['authorization'].split(' ')[1];
	try {
		const user = jwt.verify(token, SECRET);
		req.decodedToken = user;
		next();
	} catch (error) {
		return res.status(404).json({ error: 'Invalid token' });
	}
};

const apiTokenExtractor = async (req, res, next) => {
	await checkAdminTime();
	const admin = await Admin.findByPk(1);
	req.api_token = admin.token;
	next();
};

const refreshUserToken = async (req, res, next) => {
	const user = await User.findByPk(req.params.id, {
		attributes: ['updatedAt', 'refreshToken']
	});

	if (timeChecker(user.updatedAt)) {
		const data = await refreshToken(user.refreshToken);
		user.accessToken = data.access_token;
		user.refreshToken = data.refresh_token;
		await user.save();
	}

	next();
}

module.exports = {
	errorHandler,
	tokenExtractor,
	apiTokenExtractor,
	refreshUserToken,
};