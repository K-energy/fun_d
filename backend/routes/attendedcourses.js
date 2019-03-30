'use strict'

const express = require('express')
const AttendedCourseController = require('../controllers/AttendedCourseController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .get(AuthMiddleware.authenticate, AttendedCourseController.getAllAttendedCourses)
router.route('/:id')
    .get(AuthMiddleware.authenticate, AttendedCourseController.getAttendedCourseById)
    .put(AuthMiddleware.authenticate, AttendedCourseController.updateAttendedCourseStudyHour)
router.route('/course/:id')
    .get(AuthMiddleware.authenticate, AttendedCourseController.getAttendedCourseByCourseId)

module.exports = router