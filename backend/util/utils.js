const jwt = require('jsonwebtoken');
const { SECRET, CLIENT_ID, CLIENT_SECRET } = require('./config');
const { Artist, Admin, } = require('../models');
const axios = require('axios');
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

const timeChecker = (updatedAt) => {
	const old = new Date(updatedAt);
	const today = new Date();
	console.log('Time chekcer: ', updatedAt, Math.floor((today - old) / 1000 / 60) >= 58);
	return Math.floor((today - old) / 1000 / 60) >= 58;
};

const refreshToken = async (token) => {
	try {
		const body = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: token,
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET
		});
		const result = await axios.post('https://accounts.spotify.com/api/token', body, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		return result.data;
	} catch (error) {
		console.log('Error refreshToken: ', error);
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
		const token = await refreshAdminToken();
		admin.token = token;
		await admin.save();
	}
};

module.exports = {
	signToken,
	findArtist,
	timeChecker,
	refreshAdminToken,
	checkAdminTime,
	refreshToken,
};