'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
        {
          reviewId: 3,
          url: "https://img.freepik.com/premium-photo/room-with-desk-computer-it_860952-541.jpg",
        },
        {
          reviewId: 4,
          url: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/262693459/original/eb262517cd75cfc8f305dd2bb4b20537b23b5852/create-anime-style-background-for-game-visual-novel-and-interior-design.jpg",
        },

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        "https://img.freepik.com/premium-photo/room-with-desk-computer-it_860952-541.jpg",
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/262693459/original/eb262517cd75cfc8f305dd2bb4b20537b23b5852/create-anime-style-background-for-game-visual-novel-and-interior-design.jpg"
      ]},
    }, {})
  }
};
