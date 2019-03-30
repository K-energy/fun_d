'use strict'

const express = require('express')
const CourseController = require('../controllers/CourseController')
const CommentController = require('../controllers/CommentController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .get(CourseController.getAllCourses)
    .post(AuthMiddleware.authenticate, CourseController.createCourse)
router.route('/:id')
    .get(CourseController.getCourseById)
    .put(AuthMiddleware.authenticate, CourseController.updateCourse)
router.route('/comment/:id')
    .get(AuthMiddleware.authenticate, CommentController.getCommentByCourseId)

module.exports = router