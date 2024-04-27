'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: 'CASCADE'
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 80],
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        rangeCheck(value) {
          if (isNaN(value) || value > 90 || value < -90)
          throw new Error("Latitude must be a number between 90 and -90")
        }
      },
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
       rangeCheck(value) {
          if (isNaN(value) || value > 180 || value < -180)
          throw new Error("Longitude must be a number between 180 and -180")
        }
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        priceMin(value) {
          if (value <= 0) {
            throw new Error("Price must be greater than $0")
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
    indexes: [
      {
        unique: true,
        fields: ['lat', 'lng'],
        name: 'unique_lat_lng',
      }
    ]
  });
  return Spot;
};
