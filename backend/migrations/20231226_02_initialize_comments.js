const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('comments', {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			description: {
				type: DataTypes.STRING,
			},
			title: {
				type: DataTypes.STRING
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
		await queryInterface.addColumn('comments', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		});
		await queryInterface.addColumn('comments', 'song_id', {
			type: DataTypes.STRING,
			allowNull: false,
			references: { model: 'songs', key: 'id' },
		});
		await queryInterface.addColumn('comments', 'post_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'posts', key: 'id' }
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('comments');
	},
};