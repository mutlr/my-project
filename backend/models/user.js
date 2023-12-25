const { Model, DataTypes } = require('sequelize');
const { sequelize  } = require('../util/db');

class User extends Model {}

User.init({
	userId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, {
	sequelize,
    underscored: true,
	timestamps: true,
	modelName: 'user',
});

module.exports = User