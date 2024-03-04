const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Auth extends Model {}

Auth.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	accessToken: {
		type: DataTypes.STRING,
		defaultValue: null
	},
	refreshToken: {
		type: DataTypes.STRING,
		defaultValue: null
	},
	spotifyId: {
		type: DataTypes.STRING,
		defaultValue: null
	},
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'auth',
	defaultScope: ['accessToken', 'refreshToken', 'spotifyId'],
});


module.exports = Auth;