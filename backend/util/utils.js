const jwt = require('jsonwebtoken');
const { SECRET, CLIENT_ID, CLIENT_SECRET } = require('./config');
const { Artist, Admin, Song } = require('../models');
const axios = require('axios');
const signToken = (user) => {
	return jwt.sign(user, SECRET);
};

const findOrCreateSong = async (name, songId, artistName, artistId, image) => {
	const artist = await findArtist(artistId, artistName);
	const song = await Song.findByPk(songId);
	if (!song) {
		return await Song.create({ id: songId, songName: name, artistId: artist.id, imageUrl: image });
	}
	return song;
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
	const options = {
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
const checkAdmin = async () => {
	try {
		const admin = await Admin.findByPk(1);
		if (!admin) {
			const newAdmin = await Admin.create({ id: 1 });
			const token = await refreshAdminToken();
			newAdmin.token = token;
			await newAdmin.save();
			console.log('Admin not found, created one');
		}
	} catch (error) {
		console.log('Error during admin check!', error);
	}
};
const checkAdminTime = async () => {
	const admin = await Admin.findByPk(1);
	if (timeChecker(admin.updatedAt) === true) {
		console.log('Admin check time is truth: ');
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
	checkAdmin,
	findOrCreateSong
};