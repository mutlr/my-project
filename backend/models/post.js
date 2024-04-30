const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
const User = require('./user');
const Song = require('./song');

class Post extends Model {}

Post.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'post',
	},
);
Post.addScope('defaultScope', {
	include: [
		{
			model: User,
		},
		{
			model: Song,
		},
	],
});
module.exports = Post;
