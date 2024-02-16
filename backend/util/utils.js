const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Artist } = require('../models');
const signToken = (user) => {
	return jwt.sign(user, SECRET);
};

const findArtist = async (id, artistName) => {
	const artist = await Artist.findByPk(id);
	if (artist === null) {
		return await Artist.create({ id, artistName });
	}
	return artist;
};

const timeChecker = async (updatedAt) => {
	const old = new Date(updatedAt);
	const today = new Date();
	console.log('Time chekcer: ', Math.floor((today - old) / 1000 / 60) >= 58);
	return Math.floor((today - old) / 1000 / 60) >= 58;
};

module.exports = {
	signToken,
	findArtist,
	timeChecker,
};