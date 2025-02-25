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
        ownerId: 3,
        address: '789 Mountain Road',
        city: 'Denver',
        state: 'CO',
        country: 'USA',
        lat: 39.7392,
        lng: -104.9903,
        name: 'Mountain Cabin',
        description: 'A cozy cabin in the mountains of Denver.',
        price: 140.00,
      },
      {
        ownerId: 2,
        address: '123 Downtown Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Malibu Retreat',
        description: 'A coveted loft in Malibu.',
        price: 182,
      },
      {
        ownerId: 2,
        address: '789 Tidal Road',
        city: 'San Luis Obispo',
        state: 'CA',
        country: 'USA',
        lat: 38.7392,
        lng: -104.1903,
        name: 'Ocean Salt Flat',
        description: 'Let the tide wash over you.',
        price: 150.00,
      },
      {
        ownerId: 1,
        address: '456 Ocean Drive',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Loft',
        description: 'An apartment with ocean views in Miami.',
        price: 205,
      },
      {
        ownerId: 3,
        address: '789 Lofi Road',
        city: 'Portland',
        state: 'ME',
        country: 'USA',
        lat: 38.1392,
        lng: -104.1901,
        name: 'Mellow Pad',
        description: 'Can you hear the music?',
        price: 158.00,
      },
      {
        ownerId: 1,
        address: '1 Carpenter Av',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        lat: 38.7392,
        lng: -104.9903,
        name: 'Slice of Life',
        description: 'Modernity and timelessness meet here in this unique slice of the American Northwest.',
        price: 146.00,
      },
      {
        ownerId: 3,
        address: '100 Meditation St ',
        city: 'West Townshend',
        state: 'VT',
        country: 'USA',
        lat: 39.7392,
        lng: -104.5903,
        name: 'Winding Brook Nook',
        description: 'Take in the green hills of Vermont.',
        price: 80.00,
      },
      {
        ownerId: 1,
        address: '123 Beaver Brook',
        city: 'Los Alamos',
        state: 'NM',
        country: 'USA',
        lat: 39.4392,
        lng: -103.9903,
        name: "Writer\'s Respite",
        description: 'Writers rejoice, this cabin is your haven.',
        price: 100.00,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Mountain Cabin", "Malibu Retreat", "Ocean Salt Flat",
    "Beachfront Loft", "Mellow Pad", "Slice of Life", "Winding Brook Nook", "Writer\'s Respite" ]}
    }, {})
    await queryInterface.sequelize.query("DELETE FROM sqlite_sequence WHERE name='Spots';");

  }
};
