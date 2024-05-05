const express = require('express')
const { requireAuth } = require('../../utils/auth');

const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

const router = express.Router();


router.get("/", async (req, res) => {
    const images = await SpotImage.findAll({
        order: [["createdAt", "ASC"]],
        attributes: [
            "id",
            "spotId",
            "url",
            "preview",
        ]
    })
    return res.status(200).json({ message: images });

});




//Delete an existing image for a Spot.
router.delete("/:imageId", requireAuth, async (req, res) => {
    const { user } = req;
    const { imageId } = req.params;
    const spotImage = await SpotImage.findByPk(imageId);
    if ( !spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }
    const spot = await Spot.findOne({
      where: {id: spotImage.spotId}
    })
    if ( spot.ownerId === user.id ) {
      await spotImage.destroy()
      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
});




module.exports = router;
