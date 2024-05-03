'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
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
        review: "Amazing stay, amazing city!",
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: "Elevator was out of order so I had to take 16 flights of stairs everytime I ordered doordash. Will not return",
        stars: 1,
      },
      {
        userId: 2,
        spotId: 3,
        review: "Could be better",
        stars: 3,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2]},
      spotId: { [Op.in]: [1,3]},
    }, {})
  }
};
