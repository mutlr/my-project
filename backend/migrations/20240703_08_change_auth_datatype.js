const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.changeColumn('auths', 'access_token', {
			type: DataTypes.STRING(1000)
		}),
		await queryInterface.changeColumn('auths', 'refresh_token', {
			type: DataTypes.STRING(1000)
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.changeColumn('auths', 'access_token', {
			type: DataTypes.STRING(1000)
		}),
		await queryInterface.changeColumn('auths', 'refresh_token', {
			type: DataTypes.STRING(1000)
		});
	}
};