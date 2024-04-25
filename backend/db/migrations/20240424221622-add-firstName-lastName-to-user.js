'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // use the correct schema
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'firstName', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'lastName', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'firstName');
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'lastName');
  },
};
