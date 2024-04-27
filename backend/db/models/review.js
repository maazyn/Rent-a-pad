'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE"
      });
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
        onDelete: "CASCADE"
      });
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [2, 300],
        minLength(value) {
          if (value.length < 2) {
            throw new Error("Review must be at least 2 characters long");
          }
        }
      },
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        starCheck(value) {
          if (value < 1 || value > 5) {
            throw new Error ("Rating must be between 1 and 5");
          }
        }
      },
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
