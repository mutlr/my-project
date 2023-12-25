const User = require('./user');
const Artist = require('./artist')
const Song = require('./song')

User.sync();
Artist.sync()
Song.sync()

module.exports = {
	User, Artist, Song
};