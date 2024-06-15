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
        review: "Elevator was out of order so I had to take 16 flights of stairs everytime I ordered doordash.",
        stars: 1,
      },
      {
        userId: 3,
        spotId: 2,
        review: "Do not recommend, not enough lighting in the apartment",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 2,
        review: "Fantastic, I will definitely book again",
        stars: 5,
      },
      {
        userId: 1,
        spotId: 2,
        review: "I found the apartment clean and stylish, and the host was great!",
        stars: 5,
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3]},
      spotId: { [Op.in]: [1, 2]},
    }, {})
  }
};
