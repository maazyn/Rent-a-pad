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

// Updates a spot image
router.put("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const { spotId, url, preview } = req.body;


  try {
    const spotImage = await SpotImage.findByPk(imageId);
    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    const spot = await Spot.findByPk(spotId, {
        include: SpotImage,
    });
    if (!spot) {
        return res.status(404).json({ message: 'Spot not found.' });
    }

    if (url !== undefined) spotImage.url = url;
    if (preview !== undefined) spotImage.preview = preview;

    await spotImage.save();
    // if (previewImage === "") {
    //     // checks if previewImage is an empty string and deletes old preview image
    //     const oldPreviewImage = spot.SpotImages.find(image => image.preview);

    //     if (oldPreviewImage) {
    //         await oldPreviewImage.destroy();
    //     }
    // }

    res.status(200).json({ message: 'Image updated successfully.' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


//authz works
//Deletes an existing spot image.
router.delete("/:imageId", requireAuth, async (req, res) => {
  // const { user } = req;
  const { imageId } = req.params;

  try {
    const image = await SpotImage.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }
    await image.destroy();
    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



module.exports = router;
