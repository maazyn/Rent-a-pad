'use strict';
/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SpotImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      preview: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    }, options);

    // await queryInterface.addConstraint('SpotImages', {
    //   fields: ["spotId", "preview"],
    //   type: "unique",
    //   name: "one_preview_per_spot",
    //   where: { preview: true },
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint("SpotImages", "one_preview_per_spot");
    options.tableName = "SpotImages"
    await queryInterface.dropTable(options);
  }
};
