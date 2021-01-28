'use strict';
const TABLE_NAME = 'Posts';

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
      title: {
        allowNull: false,
        min: 8,
        max: 64,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        min: 8,
        max: 64,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        min: 8,
        max: 64,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
        type: Sequelize.INTEGER,
      },
      published: {
        isDate: true,
        type: Sequelize.DATE,
      },
      updated: {
        isDate: true,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
