'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        startDate: new Date('2023-12-25'),
        endDate: new Date('2024-01-02'),
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-14'),
      },
      {
        userId: 2,
        spotId: 3,
        startDate: new Date('2024-04-19'),
        endDate: new Date('2024-04-26'),
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2]},
      spotId: { [Op.in]: [1,3]},
    }, {})
  }
};