'use strict'

const express = require('express')
const TagController = require('../controllers/TagController')
const LocationController = require('../controllers/LocationController')

const router = express.Router()

router.route('/tags')
    .get(TagController.getAllTags)

router.route('/locations')
    .get(LocationController.getAllLocations)

router.route('/tagslocations')
    .get(TagController.getAllTagsThenAllLocations, LocationController.getAllLocations)

module.exports = router