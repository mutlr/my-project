const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('auths', 'playlist', {
			type: DataTypes.STRING,
			defaultValue: null,
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('auths', 'playlist');
	},
};
