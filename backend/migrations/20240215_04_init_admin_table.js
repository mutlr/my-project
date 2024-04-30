const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('admins', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			token: {
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
