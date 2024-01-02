const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Artist } = require('../models');

const signToken = (user) => {
	return jwt.sign(user, SECRET);
};

const findArtist = async (id, artistName) => {
	const artist = await Artist.findByPk(id);
	if (artist === null) {
		return await Artist.create({ id, artistName})
	};
	return artist;
};
module.exports = {
	signToken,
	findArtist,
};