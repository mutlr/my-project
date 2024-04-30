const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Artist extends Model {}

Artist.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		artistName: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'artist',
	},
);

Artist.addScope('defaultScope', {
	attributes: ['id', 'artistName'],
});

module.exports = Artist;
