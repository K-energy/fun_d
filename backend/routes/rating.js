'use strict'

const express = require('express')
const RatingController = require('../controllers/RatingController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .post(AuthMiddleware.authenticate, RatingController.createRating)

router.route('/:id')
    .get(AuthMiddleware.authenticate, RatingController.getRatingById)

module.exports = router