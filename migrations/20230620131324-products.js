'use strict';
module.exports = {
  // eslint-disable-next-line
  up: async (queryInterface, Sequelize) => {
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
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // await queryInterface.addIndex("products", ['order_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
  }
};