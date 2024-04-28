const jwt = require('jsonwebtoken');
const { SECRET, } = require('./config');
const { Admin, User, Auth, Post } = require('../models');
const { checkAdminTime, timeChecker, refreshToken } = require('../util/utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
	console.log('Error in middleware: ', error);
	if (error.name === 'SequelizeUniqueConstraintError') {
		const value = error.errors[0].value;
		const type = error.errors[0].path;
		return res.status(400).json({ error: `${type} ${value} is already in database` });
	} else if (error.name === 'SequelizeForeignKeyConstraintError') {
		return res.status(404).json({ error: error.parent.detail });
	} else if (error.name === 'SequelizeValidationError') {
		return res.status(500).json({ error: `${error.errors[0].path} is required.` });
	} else if (error.error === 'invalid_grant' && error.error_description === 'Refresh token revoked') {
		return res.status(500).json({ error: error.error_description });
	} else if (error.message === 'not_found') {
		return res.status(404).json({ error: error.message });
	} else if (error.message === 'data_missing') {
		return res.status(500).json({ error: 'Data missing' });
	} else if (error.message === 'unauthorized') {
		return res.status(401).json({ error: 'You are not anauthorized to do that.' });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'Invalid token' });
	}
	return res.status(500).json({ error });
};

const tokenExtractor = (req, res, next) => {
	const token = req.headers['authorization'].split(' ')[1];
	const user = jwt.verify(token, SECRET);
	req.decodedToken = user;
	next();
};

const apiTokenExtractor = async (req, res, next) => {
	await checkAdminTime();
	const admin = await Admin.findByPk(1);
	req.api_token = admin.token;
	next();
};

const refreshUserToken = async (req, res, next) => {
	const id = req.params.id || req.decodedToken.id;
	const user = await User.findByPk(id, {
		include: {
			model: Auth,
			attributes: ['updatedAt', 'accessToken', 'refreshToken', 'id']
		},
	});
	req.username = user.username;
	if (!user.auth) {
		req.userNotAuthenticated = true;
		return next();
	}
	if (user.auth && timeChecker(user.auth.updatedAt) === true) {
		const data = await refreshToken(user.auth.refreshToken);
		user.auth.accessToken = data.access_token;
		await user.auth.save();
	}
	req.userSpotifyToken = user.auth.accessToken;
	next();
};

const postFinder = async (req, res, next) => {
	const { id } = req.params;
	if (!id || !Number(id))  throw new Error('Data missing'); //return res.status(400).json({ error: 'ID missing' });
	const post = await Post.findByPk(id);
	if (!post) throw new Error('not_found'); //return res.status(404).json({ error: 'Post not found' });
	req.foundPost = post;
	next();
};
module.exports = {
	errorHandler,
	tokenExtractor,
	apiTokenExtractor,
	refreshUserToken,
	postFinder,
};