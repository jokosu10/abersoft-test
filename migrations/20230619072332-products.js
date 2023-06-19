'use strict';
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      }
    }),
  down: queryInterface => queryInterface.dropTable("products")
};