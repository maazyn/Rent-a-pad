const express = require('express')
const { requireAuth } = require('../../utils/auth');

const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

const router = express.Router();


//All review images
router.get("/", async (req, res) => {
    const images = await ReviewImage.findAll({
        order: [["createdAt", "ASC"]],
        attributes: [
            "id",
            "url",
            "reviewId",
        ]
    })
    return res.status(200).json({ message: images });

});




//Delete an existing image for a Review.
router.delete("/:imageId", requireAuth, async (req, res) => {
    const { user } = req;
    const { imageId } = req.params;
    const reviewImage = await ReviewImage.findByPk(imageId);
    if ( !reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }
    const review = await Review.findOne({
      where: {id: reviewImage.reviewId}
    })
    if ( review.userId === user.id ) {
      await reviewImage.destroy()
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
});




module.exports = router;
