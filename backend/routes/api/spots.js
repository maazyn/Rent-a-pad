const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateSpot = [
  check('address')
    .isString().notEmpty()
    .withMessage("Street address is required"),
  check('city')
    .isString().notEmpty()
    .withMessage("City is required"),
  check('state')
    .isString()
    .withMessage("State is required"),
  check('country')
    .isString().notEmpty()
    .withMessage("Country is required"),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check('name')
    .isString().isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .isString().notEmpty()
    .withMessage("Description is required"),
  check('price')
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .isString().isLength({ min: 2 })
    .withMessage("Review text is required"),
  check('stars')
    .isNumeric({ min: 1, max: 5 }).notEmpty()
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

const router = express.Router();



//avgRating and previewImage funcs
const getAvgRating = async (spotId) => {
  const starCount = await Review.count({
    where: {spotId}
  });
  const starSum = await Review.sum("stars", {
    where: {spotId}
  });
  return starCount === 0? 0: starSum / starCount;
};
const getPreviewImage = async (spotId) => {
  const previewImage = await SpotImage.findOne({
    where: {
      spotId,
      preview: true
    },
    attributes: ["url"]
  })
  return previewImage? previewImage.url: null;
}


//Find all spots
router.get('/', async (req, res) => {
    try {
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
      });

      const spotsWithDetails = await Promise.all( //seems to return empty objs if not wait for all tasks to complete first
        spots.map(async (spot) => {
          const avgRating = await getAvgRating(spot.id);
          const previewImage = await getPreviewImage(spot.id);

          return {
            ...spot.dataValues,
            avgRating,
            previewImage,
          };
        })
      );

      return res.status(200).json({ Spots : spotsWithDetails });

    } catch (error) {
      console.error('Error fetching spots:', error);
      return res.status(500).json({ message: 'An error occurred while fetching the spots' });
    }
});




//Find all spots of a logged in user
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
      });
      const spotsWithDetails = await Promise.all(
        ownerSpots.map(async (spot) => {
          const avgRating = await getAvgRating(spot.id);
          const previewImage = await getPreviewImage(spot.id);

          return {
            ...spot.dataValues,
            avgRating,
            previewImage,
          };
        })
      );
      return res.status(200).json({ spots: spotsWithDetails });
    } else {
      return res.status(401).json({ message: "Authentication required" });
    };
  } catch (error) {
    console.error('Error fetching Owner"s spots:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the spots' });
  }
});


//Find a Spot with a specified Id
router.get("/:spotId", async (req, res) => {
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
        attributes: ["id", "url", "preview"],
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

})



//Creates and returns a new spot.
router.post("/", validateSpot, async (req, res) => {
  const { user } = req;
  if (user) {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    })

    return res.status(201).json({ spot: newSpot });
  } else {
    return res.status(401).json({ message: "Authentication required" });
  };

});


//authz works
//Create and return a new image for a spot specified by id.
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if ( spot.ownerId === user.id) {
    const { url, preview } = req.body;
    const newSpotImage = await SpotImage.create({
      spotId: spotId,
      url,
      preview
    });
    const theSpotImage = await SpotImage.findByPk(newSpotImage.id, {
      attributes: [
        "id",
        "url",
        "preview"
      ]
    });
    return res.status(200).json({ newSpotImage: theSpotImage });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  };
});


//authz works
//Updates and returns an existing spot.
router.put("/:spotId", validateSpot, requireAuth, async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
  if (spot.ownerId === user.id) {
    const theSpot = await Spot.findByPk(spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (address) theSpot.address = address;
    if (city) theSpot.city = city;
    if (state) theSpot.state = state;
    if (country) theSpot.country = country;
    if (lat) theSpot.lat = lat;
    if (lng) theSpot.lng = lng;
    if (name) theSpot.name = name;
    if (description) theSpot.description = description;
    if (price) theSpot.price = price;

    // for (const attribute in req.body) {
    //   if (req.body[attribute] !== undefined) {
    //     theSpot[attribute] = req.body[attribute];
    //   }
    // }
    await theSpot.save()

    return res.status(200).json({ updatedSpot: theSpot });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  };
});


//authz works
//Deletes an existing spot.
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const theSpot = await Spot.findByPk(spotId);
  if (!theSpot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
  if (theSpot.ownerId === user.id) {
    theSpot.destroy()
    return res.status(200).json({ message: "Successfully deleted" });
  } else {
    return res.status(403).json({ message: "Forbidden" });
  };
});



//Returns all the reviews that belong to a spot specified by id.
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  if (spot) {
    const reviews = await Review.findAll({
      where: { spotId },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
          required: false,
        },
      ],
    });
    return res.status(200).json({ reviews: reviews });
  } else {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
});


//Create and return a new review for a spot specified by id.
router.post("/:spotId/reviews", validateReview, async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId , {
    include: [{model: Review}]
  });
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const reviewExists = await Review.findOne({
    where: {
      spotId,
      userId: user.id
    }
  });
  if (!reviewExists) {
    const { review, stars } = req.body;
    const newReview = await Review.create({
      userId: user.id,
      spotId,
      review,
      stars,
    });
    return res.status(201).json({ createdReview: newReview });
  } else {
    return res.status(500).json({ message: "User already has a review for this spot" });
  }
});



module.exports = router;
