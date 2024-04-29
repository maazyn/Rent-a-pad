const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, Spot, SpotImage } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



//avgRating func
const getAvgRating = async () => {
  const starCount = await Review.count();
  const starSum = await Review.sum("stars");
  return starSum / starCount;
};



router.get('/', async (req, res) => {
    try {
      const avgRating = await getAvgRating();

      const spots = await Spot.findAll({
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
          },
        ],
      });

      const spotsWithAvgRating = spots.map((spot) => {
        spot.dataValues.avgRating = avgRating;
        return spot;
      });

      return res.status(200).json({ Spots : spotsWithAvgRating });

    } catch (error) {
      console.error('Error fetching spots:', error);
      return res.status(500).json({ message: 'An error occurred while fetching the spots.' });
    }
});




router.get("/current", async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      const avgRating = await getAvgRating();
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
    return res.status(500).json({ message: 'An error occurred while fetching the spots.' });
  }
});


router.get("/:spotId", async (req, res) => {
  try {
    const { spotId } = req.params;
    const numReviews = await Review.count({ where: { spotId }})
    const starSum = await Review.sum("stars", { where: { spotId }});
    const avgStarRating = numReviews ? starSum / numReviews : 0;

    const specificSpot = await Spot.findOne({
      where: {
        id: spotId
      },
      include: [
        {
          model: SpotImage,
          attributes: ["url"],
          where: { preview: true },
          required: false,
        },
      ],
    })
    if (specificSpot) {
      specificSpot.dataValues.numReviews = numReviews;
      specificSpot.dataValues.avgStarRating = avgStarRating;
      return res.status(200).json({ Spot: specificSpot });

    } else {
      return res.status(404).json({ message: "Spot couldn't be found" });
    };
  } catch (error) {
    console.error('Error fetching Owner"s spots:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the spots.' });
  }
})



module.exports = router;
