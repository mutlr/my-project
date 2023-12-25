const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Artist extends Model {}

Artist.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	artistName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'artist'
});

module.exports = Artist;