const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const validateBooking = [
//   check('review')
//     .isString().notEmpty()
//     .withMessage("Review text is required"),
//   check('stars')
//     .isNumeric({ min: 1, max: 5 }).notEmpty()
//     .withMessage("Stars must be an integer from 1 to 5"),
//     handleValidationErrors
// ];

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



module.exports = router;
