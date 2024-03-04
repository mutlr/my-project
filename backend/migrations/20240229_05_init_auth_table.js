const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('auths', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			access_token: {
				type: DataTypes.STRING,
				defaultValue: null
			},
			refresh_token: {
				type: DataTypes.STRING,
				defaultValue: null
			},
			spotify_id: {
				type: DataTypes.STRING,
				defaultValue: null
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
		await queryInterface.addColumn('auths', 'user_id', {
			type: DataTypes.INTEGER,
			references: { model: 'users', key: 'id' }
		});
		await queryInterface.removeColumn('users', 'access_token');
		await queryInterface.removeColumn('users', 'refresh_token');
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('auths');
		await queryInterface.addColumn('users', 'access_token', {
			type: DataTypes.STRING,
			defaultValue: null,
		});
		await queryInterface.addColumn('users', 'refresh_token', {
			type: DataTypes.STRING,
			defaultValue: null,
		});
	},
};