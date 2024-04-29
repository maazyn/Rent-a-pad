const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review } = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const starCount = await Review.count();
      const starSum = await Review.sum("stars");
      const avgRating = starSum / starCount;

      const spots = await Spot.findAll({
        order: [['createdAt', 'ASC']],
        attributes: [
          'id',
          'ownerId',
          'address',
          'city',
          'state',
          'country',
          'lat',
          'lng',
          'name',
          'description',
          'price',
          'createdAt',
          'updatedAt',
        ]
    });
      return res.status(200).json({ "Spots": spots, "avgRating": avgRating });
    } catch (error) {
      console.error('Error fetching spots:', error);
      return res.status(500).json({ message: 'An error occurred while fetching the spots.' });
    }
  });


module.exports = router;
