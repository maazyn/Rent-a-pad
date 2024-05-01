const express = require('express')
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
    .isString().notEmpty()
    .withMessage("Review text is required"),
  check('stars')
    .isFloat({ min: 1, max: 5 }).notEmpty()
    .withMessage("Stars must be an integer from 1 to 5"),
];

const router = express.Router();



//avgRating func
const getAvgRating = async () => {
  const starCount = await Review.count();
  const starSum = await Review.sum("stars");
  return starSum / starCount;
};



//Find all spots
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
      return res.status(500).json({ message: 'An error occurred while fetching the spots' });
    }
});




//Find all spots of a logged in user
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
    return res.status(500).json({ message: 'An error occurred while fetching the spots' });
  }
});


//Find a Spot with a specified Id
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
    console.error('Error fetching spots:', error);
    return res.status(500).json({ message: 'An error occurred while fetching the spots.' });
  }
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
    const theSpot = await Spot.findOne({
      where: {
        id: newSpot.id
      },
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
    })
    return res.status(201).json({ spot: theSpot });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  };

});



//Create and return a new image for a spot specified by id.
router.post("/:spotId/images", async (req, res) => {
  try {
    const { user } = req;
    const spotId = req.params.spotId;
    if (user) {
      const spot = await Spot.findByPk(spotId);
      if (spot) {
        const { url, preview } = req.body;
        const newSpotImage = await SpotImage.create({
          spotId,
          url,
          preview
        })
        const theSpotImage = await SpotImage.findByPk(newSpotImage.id, {
          attributes: [
            "id",
            "url",
            "preview",
          ],
        })
        return res.status(200).json({ spotImage: theSpotImage });
      } else {
        return res.status(404).json({ message: "Spot couldn't be found"})
      }
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    };
  } catch (error) {
    console.error('Error fetching Owner"s spots:', error);
    return res.status(500).json({ message: "An error occurred while creating the spot image" });
  }
});


//Updates and returns an existing spot.
router.put("/:spotId", validateSpot, async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  if (user) {
    const spot = await Spot.findByPk(spotId);
    if (spot) {
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

      const updatedSpot = await Spot.findByPk(theSpot.id, {
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
          "updatedAt"
        ],
      })
      return res.status(200).json({ updatedSpot: updatedSpot });
    } else {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  };
});



//Deletes an existing spot.
router.delete("/:spotId", async (req, res) => {
  const { user } = req;
  const spotId = req.params.spotId;
  if (user) {
    const spot = await Spot.findByPk(spotId);
    if (spot) {
      const theSpot = await Spot.findByPk(spotId);
      theSpot.destroy()

      return res.status(200).json({ message: "Successfully deleted" });
    } else {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
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


//Re-check for proper error-handling
//Create and return a new review for a spot specified by id.
router.post("/:spotId/reviews", validateReview, async (req, res) => {
  const { user } = req;
  if (user) {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
      include: [{model: Review}]
    });
    if (spot) {
      const checkReview = await Review.findOne({
        where: {spotId}
      });
      if (!checkReview) {
        const { review, stars } = req.body;
        const newReview = await Review.create({
          userId: user.id,
          spotId,
          review,
          stars,
        });
        const createdReview = await Review.findOne({
          where: {
            id: newReview.id
          },
          attributes: [
            "id",
            "userId",
            "spotId",
            "review",
            "stars",
            "createdAt",
            "updatedAt",
          ],
        })
        return res.status(201).json({ createdReview: createdReview });
      } else {
        return res.status(500).json({ message: "User already has a review for this spot" });
      }
    } else {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
});



module.exports = router;
