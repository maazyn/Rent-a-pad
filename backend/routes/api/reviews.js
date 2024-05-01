const express = require('express')
const { Review, Spot, SpotImage } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateReview = [
  check('review')
    .isString().notEmpty()
    .withMessage("Review text is required"),
  check('stars')
    .isNumeric({ min: 1, max: 5 }).notEmpty()
    .withMessage("Stars must be an integer from 1 to 5"),
];


const router = express.Router();




//Returns all the reviews written by the current user.
router.get("/current", async (req, res) => {
    try {
      const { user } = req;
      if (user) {
        const ownerSpots = await Spot.findAll({
          where: { ownerId: user.id },
          order: [["createdAt", "ASC"]],
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "description",
            "price",
            "createdAt",
            "updatedAt",
          ],
          include: [
            {
              model: SpotImage,
              attributes: ["url"],
              where: { preview: true },
              required: false,
            },
          ],
        });
        const spotsWithAvgRating = ownerSpots.map((spot) => {
          spot.dataValues.avgRating = avgRating;
          return spot;
        });
        return res.status(200).json({ spots: spotsWithAvgRating });
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      };
    } catch (error) {
      console.error('Error fetching Owner"s spots:', error);
      return res.status(500).json({ message: "An error occurred while fetching the spots"});
    }
  });


  module.exports = router;
