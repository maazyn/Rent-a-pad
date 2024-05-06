const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateReview = [
  check('review')
    .isString()
    .isLength({ min: 2 })
    .withMessage("Review text is required"),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
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
            },
            {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "description", "price" ],
                include: [{
                    model: SpotImage,
                    where: {"preview": true},
                    attributes: ["url"]
                }]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"],
                required: false,
            },
            ],
        });
        return res.status(200).json({ userReviews: userReviews });
      } else {
        return res.status(401).json({ message: "Authentication required" });
      };
    } catch (error) {
      console.error('Error fetching Owner"s spots:', error);
      return res.status(500).json({ message: "An error occurred while fetching the reviews"});
    }
});


//authz works
//Create and return a new image for a review specified by id.
router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { user } = req;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" })
    }
    if (review.userId === user.id) {
      const count = await ReviewImage.count({
          where: {
            reviewId,
          }
      })
      if (count >= 10) {
          return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
      } else {
        const { url } = req.body;
        const newImage = await ReviewImage.create({
          reviewId,
          url
        })
        const theImage = await ReviewImage.findByPk(newImage.id, {
          attributes: [
            "id",
            "url"
          ]
        })
        return res.status(200).json({ newImage: theImage})
      };
    } else {
        return res.status(403).json({ message: "Unauthorized" });
    }
})



//authz works
//error handling not perfect
//Update and return an existing review.
router.put("/:reviewId", validateReview, requireAuth, async (req, res) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const theReview = await Review.findByPk(reviewId);
    if (!theReview) {
      return res.status(404).json({ message: "Review couldn't be found"})
    }

    if (theReview.userId === user.id) {
        const { review, stars } = req.body;
        if (review) theReview.review = review;
        if (stars) theReview.stars = stars;

        await theReview.save()

        return res.status(200).json({ updatedReview: theReview });
    } else {
        return res.status(403).json({ message: "Forbidden" });
    };
});



//authz works
//Delete an existing review.
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { user } = req;
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found"})
  }
  if ( review.userId === user.id ) {
    await await review.destroy()
    return res.status(200).json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  };
});


  module.exports = router;
