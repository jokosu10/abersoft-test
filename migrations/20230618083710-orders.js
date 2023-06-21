'use strict';
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      total: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // await queryInterface.addIndex("orders", ["total"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("orders");
  }
};