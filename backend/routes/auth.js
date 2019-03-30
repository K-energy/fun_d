'use strict'

const express = require('express')

const AuthController = require('../controllers/AuthController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/')
    .get(AuthMiddleware.authenticate, (req, res) => {
        res.status(200).send(req.headers.authorization)
    })

router.route('/login')
    .post(AuthController.login, AuthController.generateToken, AuthController.sendToken)



module.exports = router