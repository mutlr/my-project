const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
	    await queryInterface.createTable('artists', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			artist_name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
		});
		await queryInterface.createTable('songs', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			song_name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
		});
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'This email is already in use'
				},
				validate: {
					isEmail: {
						msg: 'Not a valid email'
					},
					notNull: {
						msg: 'An email is required'
					}
				}
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'A name is required'
					}
				}
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Username is already taken'
				},
				validate: {
					len: {
						args: [3, 45],
						msg: 'Username must be between 3 and 45 characters',
					}
				}
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
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: new Date(),
			},

		});
		await queryInterface.addColumn('songs', 'artist_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'artists', key: 'id' },
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('users');
		await queryInterface.dropTable('songs');
		await queryInterface.dropTable('artists');
	},
};