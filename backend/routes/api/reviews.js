const express = require('express')
const { Review, ReviewImage, Spot, User } = require('../../db/models');


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
        const userReviews = await Review.findAll({
          where: { userId: user.id },
          order: [["createdAt", "ASC"]],
          attributes: [
            "id",
            "userId",
            "spotId",
            "review",
            "stars",
            "createdAt",
            "updatedAt",
          ],
          include: [
            {
              model: User,
              attributes: ["id", "firstName", "lastName"],
              where: { id: userReviews.userId },
            },
          ],
          include: [
            {
              model: Spot,
              attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price", "previewImage"],
              where: { spotId: userReviews.spotId },
            },
          ],
          include: [
            {
              model: ReviewImage,
              attributes: ["id", "url"],
              where: { reviewId: userReviews.id },
              required: false,
            },
          ],
        });
        return res.status(200).json({ userReviews: userReviews });
      } else {
        return res.status(403).json({ message: "Unauthorized" });
      };
    } catch (error) {
      console.error('Error fetching Owner"s spots:', error);
      return res.status(500).json({ message: "An error occurred while fetching the reviews"});
    }
});





  module.exports = router;
