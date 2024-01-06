const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'access_token', {
      type: DataTypes.STRING,
      defaultValue: null,
    });
    await queryInterface.addColumn('users', 'refresh_token', {
      type: DataTypes.STRING,
      defaultValue: null,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'access_token');
    await queryInterface.removeColumn('users', 'refresh_token');
  },
};
