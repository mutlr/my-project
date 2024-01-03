const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Comment extends Model {}

Comment.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: DataTypes.STRING,
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'comment',
});

  
module.exports = Comment;