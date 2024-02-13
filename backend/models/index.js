const User = require('./user');
const Artist = require('./artist');
const Song = require('./song');
const Post = require('./post');
const Comment = require('./comment');
const Admin = require('./admin');

Artist.hasMany(Song);
Song.belongsTo(Artist);

User.hasMany(Post);
Post.belongsTo(User);
Post.belongsTo(Song);

Comment.belongsTo(User);
Comment.belongsTo(Post);
Comment.belongsTo(Song);
Post.hasMany(Comment);


module.exports = {
	User, Artist, Song, Post, Comment, Admin,
};