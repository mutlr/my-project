const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('users', 'authenticated', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
		await queryInterface.removeColumn('users', 'name');
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('users', 'name', {
			type: DataTypes.STRING,
		});
		await queryInterface.removeColumn('users', 'authenticated');
	},
};
