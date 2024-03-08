const jwt = require('jsonwebtoken');
const { SECRET, } = require('./config');
const { Admin, User, Auth } = require('../models');
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
	} else if (error.error === 'invalid_grant' && error.error_description === 'Refresh token revoked') {
		console.log('Tulee error middlewaree ja id: ', req.params);
		return res.status(500).json({ error: error.error_description });
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
	const id = req.params.id || req.decodedToken.id;
	console.log('ID: in user refresh: ', id);
	try {
		const user = await User.findByPk(id, {
			include: {
				model: Auth,
				attributes: ['updatedAt', 'accessToken', 'refreshToken']
			},
		});
		if (!user.auth) return res.status(200).json({ player: null, userInfo: null, username: user.username });

		if (user.auth && timeChecker(user.auth.updatedAt) === true) {
			const data = await refreshToken(user.auth.refreshToken);
			user.auth.accessToken = data.access_token;
			await user.auth.save();
		}
		req.username = user.username;
		req.userSpotifyToken = user.auth.accessToken;
	} catch (error) {
		next(error);
	}
	next();
};

module.exports = {
	errorHandler,
	tokenExtractor,
	apiTokenExtractor,
	refreshUserToken,
};