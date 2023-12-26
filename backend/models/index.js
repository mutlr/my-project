const User = require('./user');
const Artist = require('./artist');
const Song = require('./song');
const Post = require('./post');

Artist.hasMany(Song);
Song.belongsTo(Artist);

User.hasMany(Post);
Post.belongsTo(User);
Post.belongsTo(Song);

module.exports = {
	User, Artist, Song, Post,
};