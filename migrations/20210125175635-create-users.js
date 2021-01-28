'use strict';
const TABLE_NAME = 'Users';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(TABLE_NAME, {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        displayName: {
          allowNull: false,
          min: 8,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          isEmail: true,
          type: Sequelize.STRING,
          unique: true,
        },
        image: {
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          min: 6,
          type: Sequelize.STRING,
        },
        createdAt: {
          isDate: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
          isDate: true,
          type: Sequelize.DATE,
        }
      });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
