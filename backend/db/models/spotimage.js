'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
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
            throw new Error ("Must be a valid URL")
          }
        }
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
