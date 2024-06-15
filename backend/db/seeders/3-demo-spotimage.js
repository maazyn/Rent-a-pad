'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://as2.ftcdn.net/v2/jpg/05/55/95/33/1000_F_555953348_h2WODHOuUyTzt7a0Z5VnB3LI8BulBabn.jpg",
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://as1.ftcdn.net/v2/jpg/05/61/12/26/1000_F_561122679_hpojQnUSbk0I9gHpeItb2yRwcTqjtUA5.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://img.freepik.com/premium-photo/cyberpunk-high-rise-apartment-room_237803-1981.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://m.media-amazon.com/images/I/41P-VERdoxL._UXNaN_FMjpg_QL85_.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://images.nightcafe.studio/jobs/7oz2P8xaC9WGJ03CRXVe/7oz2P8xaC9WGJ03CRXVe--1--zpez3.jpg?tr=w-1600,c-at_max',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://i.ytimg.com/vi/910ZDdzb4OY/maxresdefault.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://i.ytimg.com/vi/8vSGD6y-piQ/mqdefault.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://image.lexica.art/full_webp/863c254d-de14-4336-887f-63d7efbfed47',
        preview: false,
      },
    ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://as2.ftcdn.net/v2/jpg/05/55/95/33/1000_F_555953348_h2WODHOuUyTzt7a0Z5VnB3LI8BulBabn.jpg",
        "https://as1.ftcdn.net/v2/jpg/05/61/12/26/1000_F_561122679_hpojQnUSbk0I9gHpeItb2yRwcTqjtUA5.jpg",
        "https://img.freepik.com/premium-photo/cyberpunk-high-rise-apartment-room_237803-1981.jpg",
        "https://m.media-amazon.com/images/I/41P-VERdoxL._UXNaN_FMjpg_QL85_.jpg",
        "https://images.nightcafe.studio/jobs/7oz2P8xaC9WGJ03CRXVe/7oz2P8xaC9WGJ03CRXVe--1--zpez3.jpg?tr=w-1600,c-at_max",
        "https://i.ytimg.com/vi/910ZDdzb4OY/maxresdefault.jpg",
        "https://i.ytimg.com/vi/8vSGD6y-piQ/mqdefault.jpg",
        "https://image.lexica.art/full_webp/863c254d-de14-4336-887f-63d7efbfed47"
      ]},
    }, {})
  }
};
