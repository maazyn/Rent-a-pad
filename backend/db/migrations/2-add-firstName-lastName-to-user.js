'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema
  }, 'firstName', {
      type: Sequelize.STRING,
    }, options);
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema
  }, 'lastName', {
      type: Sequelize.STRING,
    }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'firstName', options);
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'lastName', options);
  },
}
