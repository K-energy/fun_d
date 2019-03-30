'use strict'

const express = require('express')
const CommentController = require('../controllers/CommentController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .post(AuthMiddleware.authenticate, CommentController.createComment)
router.route('/:id')
    .get(AuthMiddleware.authenticate, CommentController.getCommentById)

module.exports = router