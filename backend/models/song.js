const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
const Artist = require('./artist');

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
	imageUrl: {
		type: DataTypes.STRING,
		defaultValue: null,
	}
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'song'
});

Song.addScope('defaultScope', {
	attributes: ['id', 'songName', 'imageUrl'],
	include: {
		model: Artist
	}
});

module.exports = Song;