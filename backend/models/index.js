const User = require('./user');
const Artist = require('./artist');
const Song = require('./song');
const Post = require('./post');
const Comment = require('./comment');
const Admin = require('./admin');
const Auth = require('./auth');

Artist.hasMany(Song);
Song.belongsTo(Artist);

User.hasMany(Post);
User.hasMany(Comment);
User.hasOne(Auth);

Post.belongsTo(User);
Post.belongsTo(Song);
Post.hasMany(Comment);

Auth.belongsTo(User);


Comment.belongsTo(User);
Comment.belongsTo(Post);
Comment.belongsTo(Song);



module.exports = {
	User, Artist, Song, Post, Comment, Admin, Auth
};