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
        url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mansionglobal.com%2Farticles%2Fa-high-rise-miami-apartment-with-endless-ocean-views-129450&psig=AOvVaw1-nwyqh8CzBDf67vV73chE&ust=1714333286976000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiSo7mT44UDFQAAAAAdAAAAABAJ",
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thepinnaclelist.com%2Fdesign%2Fecho-brickell-apartment-interior-design-miami-fl-usa-blanca-wall%2Fattachment%2F006-echo-brickell-apartment-interior-design-miami-fl-usa-blanca-wall%2F&psig=AOvVaw04TrlNp-ol4p0FD28621BP&ust=1714333457717000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCZg_2T44UDFQAAAAAdAAAAABBs',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mountainliving.com%2Fa-colorado-getaway%2F&psig=AOvVaw3WUwx_vDmmCOzjK9sxgi_h&ust=1714333534209000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCo5J2U44UDFQAAAAAdAAAAABAJ',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thespruce.com%2Flog-cabin-interiors-7564421&psig=AOvVaw1_6CyrxzVMkUMGLZceoIEr&ust=1714333571117000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCfyLCU44UDFQAAAAAdAAAAABAO',
        preview: true,
      },
    ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mansionglobal.com%2Farticles%2Fa-high-rise-miami-apartment-with-endless-ocean-views-129450&psig=AOvVaw1-nwyqh8CzBDf67vV73chE&ust=1714333286976000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiSo7mT44UDFQAAAAAdAAAAABAJ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thepinnaclelist.com%2Fdesign%2Fecho-brickell-apartment-interior-design-miami-fl-usa-blanca-wall%2Fattachment%2F006-echo-brickell-apartment-interior-design-miami-fl-usa-blanca-wall%2F&psig=AOvVaw04TrlNp-ol4p0FD28621BP&ust=1714333457717000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCZg_2T44UDFQAAAAAdAAAAABBs",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mountainliving.com%2Fa-colorado-getaway%2F&psig=AOvVaw3WUwx_vDmmCOzjK9sxgi_h&ust=1714333534209000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCo5J2U44UDFQAAAAAdAAAAABAJ",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thespruce.com%2Flog-cabin-interiors-7564421&psig=AOvVaw1_6CyrxzVMkUMGLZceoIEr&ust=1714333571117000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCfyLCU44UDFQAAAAAdAAAAABAO"]},
    }, {})
  }
};
