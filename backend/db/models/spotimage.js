'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImages.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });

    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        urlCheck(value) {
          if (!Validator.isURL(value)) {
            throw new Error ("Must be a URL")
          }
        }
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,

    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
