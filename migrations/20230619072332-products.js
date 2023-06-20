'use strict';
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable("products", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.NUMERIC,
        defaultValue: 0,
        allowNull: false,
      },
    }),
  down: queryInterface => queryInterface.dropTable("products")
};