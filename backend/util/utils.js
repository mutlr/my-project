const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Artist } = require('../models');
const axios = require('axios');
const qs = require('qs');
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
	// const admin = await Admin.findByPk(1);
	const old = new Date(updatedAt);
	const today = new Date();
	return Math.floor((today - old) / 1000 / 60) >= 58;
=======
const spotifyToken = {
	accessToken: '',
	renewed: '',
};

const hasBeenHour = (compareDate) => {
	// Get the current timestamp
	const currentTimestamp = new Date().getTime();

	// Assume you have a previous timestamp stored somewhere

	// Calculate the time difference in milliseconds
	const timeDifference = currentTimestamp - compareDate;

	// Convert milliseconds to hours
	const hoursDifference = timeDifference / (1000 * 60 * 60);
	console.log('tulee tän');
	// Check if it has been an hour (you can adjust the threshold as needed)
	return hoursDifference >= 1;
};
const initToken = async () => {
	if (hasBeenHour(spotifyToken.renewed)) {
		try {
			const data = qs.stringify({
				grant_type: 'client_credentials'
			});
			const result = await axios.post('https://accounts.spotify.com/api/token', data, {
				headers: {
					'Content-Type':'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
				},
			});
			//console.log(result);
			spotifyToken.accessToken = result.data.access_token;
			console.log(result.data);
			const date = new Date.now();
			console.log('Date: ', date);
			spotifyToken.renewed = new Date().getTime();
		} catch (error) {
			console.log('Error refreshing the token!');
		}
	}
};
module.exports = {
	signToken,
	findArtist,
	timeChecker,
	initToken,
	spotifyToken,
};