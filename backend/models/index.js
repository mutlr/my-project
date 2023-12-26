const User = require('./user');
const Artist = require('./artist');
const Song = require('./song');

Artist.hasMany(Song);
Song.belongsTo(Artist);

module.exports = {
	User, Artist, Song
};