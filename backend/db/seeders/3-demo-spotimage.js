'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {h
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://media.istockphoto.com/id/526181511/photo/autumn-foliage-and-reflection-in-vermont-elmore-state-park.jpg?s=612x612&w=0&k=20&c=MJXzWaQJaEgXE4lhwjonBtTIjIn09P2X3ejyAg99BiI=",
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://bensonwood.com/wp-content/uploads/2022/11/EckVT2008_007.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://elevatedliving.design/wp-content/uploads/2021/05/butler-creek-test.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://coolmaterial.com/wp-content/uploads/2023/03/Heat-8.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://people.com/thmb/IHG7zgfiGMK0Jin4QW6htY8ZR-4=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/robert-de-niro-heat-home-sale-031623-6-8b15b15faaa9437f8e5bdb886da0cb49.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://toptenrealestatedeals.com/wp-content/uploads/2023/03/Heat-Movie-Home-14-1440x961.jpeg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://coolmaterial.com/wp-content/uploads/2023/03/Heat-7.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://people.com/thmb/_TEuHbchySFUO6tEggF5otgXzWA=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/robert-de-niro-heat-home-sale-031623-7-0391cf5568784aeba3d3079a619c839d.jpg',
        preview: false,
      },

      {
        spotId: 3,
        url: 'https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_lg/84688f65efca9ddf8e4be5913da7b944',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.squarespace-cdn.com/content/v1/5db2201c0c544c3c1d94f85c/1571958102361-LPWPCXPGRFD5250UZ2C2/SLO+Brew+Lofts_075.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://static1.mansionglobal.com/production/media/article-images/d1cdde46b065f49a5cbf26ed09d34efb/large_ARTE-Residence_16.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://images1.apartments.com/i2/8YxfzqFp3AVXQg7a9Bdv7zN5nuY1LNmy3wc3YVHUknw/117/image.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.globaltyinvestment.com/uploads/picture/picture/64/louer-appart-21.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: "https://npr.brightspotcdn.com/dims4/default/8419018/2147483647/strip/true/crop/6000x3375+0+313/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F5e%2F7d%2F82d37ec14ff5b46d357e02bea705%2Fimg-6158.JPG",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2020/11/portland-social.jpg",
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://ssl.cdn-redfin.com/photo/rent/300ecb82-c623-446f-84c0-58b3c5efc797/islphoto/genIsl.0_6.webp',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/38757376b963d81d4749a858c0c161ea-cc_ft_960.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://cdngeneral.rentcafe.com//dmslivecafe/UploadedImages/d2f3e086-0a52-4726-ab6a-7eb48be8df3b.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551838512.jpg?k=21ec238647e8060c636d80c8002f168aba83e74a8134363115df58171e330ec7&o=&hp=1",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://images.adsttc.com/media/images/5e2f/77a1/3312/fdac/0700/0038/newsletter/KIE_AD-RiverHouse-mainhouse-07-Bedroom_A.jpg?1580169046",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://jamaicacottageshop.com/wp-content/uploads/2024/07/12x14-writers-haven-moss-Poets-Seat-2.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://timberhomesllc.com/wp-content/uploads/2021/06/Cabin-in-the-Woods-with-built-in-bookshelves.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://www.canopyandstars.co.uk/var/self_catering_site/storage/images/canopy-and-stars/france/languedoc-roussillon/aude/les-seilhols/the-writer-s-cabin/the-writer-s-cabin-gallery/18318391_10155499952882952_266370739_o/185282943-2-eng-GB/18318391_10155499952882952_266370739_o_cs_large_gallery_preview.jpg",
        preview: false,
      },

    ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://media.istockphoto.com/id/526181511/photo/autumn-foliage-and-reflection-in-vermont-elmore-state-park.jpg?s=612x612&w=0&k=20&c=MJXzWaQJaEgXE4lhwjonBtTIjIn09P2X3ejyAg99BiI=",
        "https://bensonwood.com/wp-content/uploads/2022/11/EckVT2008_007.jpg",
        'https://elevatedliving.design/wp-content/uploads/2021/05/butler-creek-test.jpg',
        'https://coolmaterial.com/wp-content/uploads/2023/03/Heat-8.jpg',
        'https://people.com/thmb/IHG7zgfiGMK0Jin4QW6htY8ZR-4=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/robert-de-niro-heat-home-sale-031623-6-8b15b15faaa9437f8e5bdb886da0cb49.jpg',
        'https://toptenrealestatedeals.com/wp-content/uploads/2023/03/Heat-Movie-Home-14-1440x961.jpeg',
        'https://coolmaterial.com/wp-content/uploads/2023/03/Heat-7.jpg',
        'https://people.com/thmb/_TEuHbchySFUO6tEggF5otgXzWA=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/robert-de-niro-heat-home-sale-031623-7-0391cf5568784aeba3d3079a619c839d.jpg',
        'https://rentpath-res.cloudinary.com/t_3x2_fixed_webp_lg/84688f65efca9ddf8e4be5913da7b944',
        'https://images.squarespace-cdn.com/content/v1/5db2201c0c544c3c1d94f85c/1571958102361-LPWPCXPGRFD5250UZ2C2/SLO+Brew+Lofts_075.jpg',
        'https://static1.mansionglobal.com/production/media/article-images/d1cdde46b065f49a5cbf26ed09d34efb/large_ARTE-Residence_16.jpg',
        'https://images1.apartments.com/i2/8YxfzqFp3AVXQg7a9Bdv7zN5nuY1LNmy3wc3YVHUknw/117/image.jpg',
        'https://www.globaltyinvestment.com/uploads/picture/picture/64/louer-appart-21.jpg',
        "https://npr.brightspotcdn.com/dims4/default/8419018/2147483647/strip/true/crop/6000x3375+0+313/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F5e%2F7d%2F82d37ec14ff5b46d357e02bea705%2Fimg-6158.JPG",
        "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2020/11/portland-social.jpg",
        'https://ssl.cdn-redfin.com/photo/rent/300ecb82-c623-446f-84c0-58b3c5efc797/islphoto/genIsl.0_6.webp',
        'https://photos.zillowstatic.com/fp/38757376b963d81d4749a858c0c161ea-cc_ft_960.jpg',
        'https://cdngeneral.rentcafe.com//dmslivecafe/UploadedImages/d2f3e086-0a52-4726-ab6a-7eb48be8df3b.jpg',
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/551838512.jpg?k=21ec238647e8060c636d80c8002f168aba83e74a8134363115df58171e330ec7&o=&hp=1",
        "https://images.adsttc.com/media/images/5e2f/77a1/3312/fdac/0700/0038/newsletter/KIE_AD-RiverHouse-mainhouse-07-Bedroom_A.jpg?1580169046",
        "https://jamaicacottageshop.com/wp-content/uploads/2024/07/12x14-writers-haven-moss-Poets-Seat-2.jpg",
        "https://timberhomesllc.com/wp-content/uploads/2021/06/Cabin-in-the-Woods-with-built-in-bookshelves.jpeg",
        "https://www.canopyandstars.co.uk/var/self_catering_site/storage/images/canopy-and-stars/france/languedoc-roussillon/aude/les-seilhols/the-writer-s-cabin/the-writer-s-cabin-gallery/18318391_10155499952882952_266370739_o/185282943-2-eng-GB/18318391_10155499952882952_266370739_o_cs_large_gallery_preview.jpg"
      ]},
    }, {})
    await queryInterface.sequelize.query("DELETE FROM sqlite_sequence WHERE name='SpotImages';");

  }
};
