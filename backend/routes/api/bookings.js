const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Booking conflict checker func for startdate
const startDateConflictChecker = async (startDate, {req}) => {
    const spotId = req.params.spotId;
    const conflicts = await Booking.findAll({
        where: {
            spotId,
            [Op.and]: [
                { startDate: {[Op.lte]: startDate } },
                { endDate: {[Op.gte]: startDate} },
            ],
        },
    });
    if (conflicts) {
        throw new Error ("Sorry, this spot is already booked for the specified dates")
    }
};
//Booking conflict checker func for enddate
const endDateConflictChecker = async (endDate, {req}) => {
    const spotId = req.params.spotId;
    const conflicts = await Booking.findAll({
        where: {
            spotId,
            [Op.and]: [
                { startDate: {[Op.lte]: endDate} },
                { endDate: {[Op.gte]: endDate} },
            ],
        },
    });
    if (conflicts) {
        throw new Error ("Sorry, this spot is already booked for the specified dates")
    }
};

const validateBooking = [
    check('startDate')
      .isDate().notEmpty()
      .withMessage("startDate cannot be in the past"),
    check('startDate')
      .custom(startDateConflictChecker)
      .withMessage("Start date conflicts with an existing booking"),
    check('endDate')
      .isDate().notEmpty()
      .withMessage("endDate cannot be on or before startDate"),
    check('endDate')
      .custom(endDateConflictChecker)
      .withMessage("End date conflicts with an existing booking"),
    handleValidationErrors
  ];

const router = express.Router();

//previewImage func
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
        }],
    });
    const updatedBookings = await Promise.all(
        userBookings.map(async (booking) => {
          const previewImage = await getPreviewImage(booking.spotId);
          return {
            id: booking.id,
            spotId: booking.spotId,
            Spot: {
              ...booking.Spot.dataValues,
              previewImage,
            },
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
          };
        })
    );
    return res.status(200).json({userBookings: updatedBookings})
})




//authz
//Add booking conflict error handling
//Updates and returns an existing booking.
router.put("/:bookingId", validateBooking, requireAuth, async (req, res) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found"})
    }

    const now = new Date();
    if (booking.endDate <= now ) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    if (booking.userId === user.id) {
    const { startDate, endDate } = req.body;

    if (startDate) booking.startDate = startDate;
    if (endDate) booking.endDate = endDate;

    await booking.save()

    return res.status(200).json({ updatedBooking: booking });
    } else {
    return res.status(403).json({ message: "Forbidden" });

    };
  });


//Delete an existing booking.
router.delete("/:bookingId", requireAuth, async (req, res) => {
    const {user} = req;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found"})
    }
    const now = new Date();
    if (booking.startDate <= now ) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }
    if (booking.userId === user.id) {
        await booking.destroy();
        return res.status(200).json({ message: "Successfully deleted" })
    } else {
        return res.status(403).json({ message: "Forbidden" });
    };
});

module.exports = router;
