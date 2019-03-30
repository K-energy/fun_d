'use strict'

const express = require('express')
const PostController = require('../controllers/PostController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/:id')
    .get(AuthMiddleware.authenticate, PostController.getPostById)

router.route('/')
    .get(AuthMiddleware.authenticate, PostController.getAllPosts)
    .post(AuthMiddleware.authenticate, PostController.createPost)

module.exports = router