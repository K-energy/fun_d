'use strict'

const express = require('express')

const UserController = require('../controllers/UserController')
const StudentController = require('../controllers/StudentController')
const TutorController = require('../controllers/TutorController')
const UploadController = require('../controllers/UploadController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .get(AuthMiddleware.authenticate, UserController.getUserById)

router.route('/student/:id')
    .get(AuthMiddleware.authenticate, StudentController.getStudentById)

router.route('/student')
    .get(AuthMiddleware.authenticate, StudentController.getStudentByUserId)
    .post(UserController.createUser, StudentController.createStudent)
    .put(AuthMiddleware.authenticate, UserController.updateUser, StudentController.updateStudent)

router.route('/tutor/:id')
    .get(AuthMiddleware.authenticate, TutorController.getTutorById)

router.route('/tutor')
    .get(AuthMiddleware.authenticate, TutorController.getTutorByUserId)
    .post(UserController.createUser, TutorController.createTutor)
    .put(AuthMiddleware.authenticate, UserController.updateUser, TutorController.updateTutor)

router.route('/profilephoto')
    .post([AuthMiddleware.authenticate, UploadController.uploadProfilePhoto.single('picture')], UserController.createProfilePhoto)

router.route('/tutor/idphoto')
    .post([AuthMiddleware.authenticate, UploadController.uploadIdPhoto.single('picture')], TutorController.createIdPhoto)

module.exports = router