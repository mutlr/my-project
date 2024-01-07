const { Model, DataTypes } = require('sequelize');
const { sequelize  } = require('../util/db');
class User extends Model {
	static async spotifyValues() {
		return this.accessToken;
	}
}

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
			isEmail: {
				msg: 'Not a valid email'
			},
			notNull: {
				msg: 'An email is required'
			},
		}
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'A name is required'
			},
		}
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			len: {
				args: [3, 45],
				msg: 'Username must be between 3 and 45 characters',
			}
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
		  	notNull: {
				msg: 'A password is required'
			},
		},
	},
	accessToken: {
		type: DataTypes.STRING,
		defaultValue: null
	},
	refreshToken: {
		type: DataTypes.STRING,
		defaultValue: null
	}
},{
	sequelize,
	underscored: true,
	timestamps: true,
	modelName: 'user',
});

User.addScope('defaultScope', {
	attributes: ['id', 'username'],
});

module.exports = User;