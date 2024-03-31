const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('songs', 'image_url', {
			type: DataTypes.STRING,
			defaultValue: null,
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('songs', 'image_url');
	}
};