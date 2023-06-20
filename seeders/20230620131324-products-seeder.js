'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const dataProducts = [
      {
        id: uuidv4(),
        name: "baju",
        price: 10000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: "celana",
        price: 20000,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    return queryInterface.bulkInsert("products", dataProducts, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return Sequelize.bulkDelete("products", null, {});
  }
};
