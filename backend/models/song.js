const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Song extends Model {}

Song.init({
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
		unique: true,
	},
	songName: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'song'
});

module.exports = Song;