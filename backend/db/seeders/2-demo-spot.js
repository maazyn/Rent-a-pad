'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '456 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Apartment',
        description: 'An apartment with ocean views in Miami.',
        price: 200,
      },
      {
        ownerId: 2,
        address: '123 Downtown Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Downtown Loft',
        description: 'A stylish loft in the heart of downtown Los Angeles.',
        price: 180,
      },
      {
        ownerId: 3,
        address: '789 Mountain Road',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain Cabin',
        description: 'A cozy cabin in the mountains of Denver.',
        price: 120.00,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Beachfront Apartment",
    "Downtown Loft", "Mountain Cabin"]}
    }, {})
  }
};
