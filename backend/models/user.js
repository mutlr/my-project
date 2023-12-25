const { Model, DataTypes } = require('sequelize');
const { sequelize  } = require('../util/db');

class User extends Model {}

User.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		}
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			len: [3, 45],
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [6, 45]
		}
	},
}, {
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'user',
});

module.exports = User;