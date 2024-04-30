const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('posts', {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
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
		await queryInterface.addColumn('posts', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		});
		await queryInterface.addColumn('posts', 'song_id', {
			type: DataTypes.STRING,
			allowNull: false,
			references: { model: 'songs', key: 'id' },
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('posts');
	},
};
