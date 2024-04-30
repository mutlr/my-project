const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
class Admin extends Model {}

Admin.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		token: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: true,
		modelName: 'admin',
		hooks: {
			beforeCreate: async () => {
				const admins = await Admin.findAll({});
				if (admins.length > 0) throw new Error('Only one admin allowed!!!');
			},
		},
	},
);

module.exports = Admin;
