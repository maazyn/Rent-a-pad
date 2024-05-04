const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const validateBooking = [
    check('startDate')
      .isDate().notEmpty()
      .withMessage("startDate cannot be in the past"),
    check('endDate')
      .isDate().notEmpty()
      .withMessage("endDate cannot be on or before startDate"),
  ];

const router = express.Router();


//Return all the bookings that the current user has made.
router.get("/current", async (req, res) => {
    const { user } = req;
    if ( !user ) {
        return res.status(401).json({ message: "Authentication required" })
    }
    const userBookings = await Booking.findAll({
        where: {userId: user.id},
        order: [["createdAt", "ASC"]],
        attributes: [
        "id",
        "spotId",
        "userId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
        ],
        include: [
        {
            model: Spot,
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price" ],
            include: [{
                model: SpotImage,
                where: {"preview": true},
                attributes: ["url"]
            }]
        },
        ]
    });
    return res.status(200).json({userBookings: userBookings})
})




//authz
//Add booking conflict error handling
//Updates and returns an existing spot.
router.put("/:bookingId", validateBooking, requireAuth, async (req, res) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const theBooking = await Booking.findByPk(bookingId);
    if (!theBooking) {
        return res.status(404).json({ message: "Booking couldn't be found"})
    }
    if (new Date(theBooking.endDate) < new Date()) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
    };

    if (theBooking.userId === user.id) {
    const { startDate, endDate } = req.body;

    if (startDate) theBooking.startDate = startDate;
    if (endDate) theBooking.endDate = endDate;

    await theBooking.save()

    return res.status(200).json({ updatedBooking: theBooking });
    } else {
    return res.status(403).json({ message: "Forbidden" });

    };
  });

module.exports = router;
