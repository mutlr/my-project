const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			access_token: {
				type: DataTypes.STRING,

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
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('admins');
	},
};