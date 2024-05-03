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
          reviewId: 2,
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Funderrated-things-to-do-in-miami-2018-5&psig=AOvVaw1mEe4xWEyqvOb0t-RvUT69&ust=1714333690454000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCRhOuU44UDFQAAAAAdAAAAABAJ",
        },
        {
          reviewId: 3,
          url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaturalhistory.si.edu%2Feducation%2Fteaching-resources%2Fearth-science%2Fwhen-volcanoes-erupt&psig=AOvVaw3xkJTU_3aO8uVjn4a4dx20&ust=1714333805988000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjT7KOV44UDFQAAAAAdAAAAABAE",
        },

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.businessinsider.com%2Funderrated-things-to-do-in-miami-2018-5&psig=AOvVaw1mEe4xWEyqvOb0t-RvUT69&ust=1714333690454000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCRhOuU44UDFQAAAAAdAAAAABAJ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnaturalhistory.si.edu%2Feducation%2Fteaching-resources%2Fearth-science%2Fwhen-volcanoes-erupt&psig=AOvVaw3xkJTU_3aO8uVjn4a4dx20&ust=1714333805988000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjT7KOV44UDFQAAAAAdAAAAABAE"
      ]},
    }, {})
  }
};
