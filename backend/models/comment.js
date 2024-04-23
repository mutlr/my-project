const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
const User = require('./user');
const Song = require('./song');

class Comment extends Model {}

Comment.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.STRING,
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'comment',
});

Comment.addScope('defaultScope', {
	include: [
		{
			model: User,
		},
		{
			model: Song,
		}
	],
	attributes: { exclude: ['updatedAt'] }
});
module.exports = Comment;