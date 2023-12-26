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