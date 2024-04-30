const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('users', 'authenticated');
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('users', 'authenticated', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
	},
};
