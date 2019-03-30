'use strict'

const express = require('express')
const SearchController = require('../controllers/SearchController')

const router = express.Router()

router.route('/')
    .get(SearchController.gets)

router.route('/coursesbyname')
    .get(SearchController.get_courses_by_name)

// router.route('/coursesbyid')
//     .get(Auth.authenticate, SearchController.get_courses_by_id)

router.route('/coursesbytags')
    .get(SearchController.get_courses_by_tags)

router.route('/coursesbylocations')
    .get(SearchController.get_courses_by_locations)

router.route('/coursesbyfilters')
    .get(SearchController.get_courses_by_filters)

router.route('/coursesbytagsandlocs')
    .get(SearchController.get_courses_by_locs_and_tags)


module.exports = router