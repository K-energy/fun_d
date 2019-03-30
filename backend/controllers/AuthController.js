'use strict'

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const Student = require('../models/Student')
const Tutor = require('../models/Tutor')
const toJSON = require('../helpers/toJson')

dotenv.config()

const controller = {

    login: async(req, res, next) => {
        try {
            const username = req.body.username
            const password = req.body.password

            let user = await User.findOne({
                'username': username
            })
            if (!user) {
                return res.status(404).send('User Not Found')
            }

            let passwordMatched = await user.comparePassword(password)

            if (!passwordMatched) {
                return res.status(401).send('Password not Matched')
            }

            let isStudent = await Student.findOne({
                'user': user._id
            })

            let isTutor = await Tutor.findOne({
                'user': user._id
            })

            if (isStudent) {
                req.auth = {
                    id: user._id,
                    type: 'student'
                }
            } else if (isTutor) {
                req.auth = {
                    id: user._id,
                    type: 'tutor'
                }
            } else {
                req.auth = {
                    id: user._id,
                    type: 'admin'
                }
            }

            next()
        } catch (e) {
            res.status(500).send(toJson.toJSON(e))
        }
    },

    createToken: (auth) => {
        return jwt.sign({
            id: auth.id,
            type: auth.type
        }, process.env.JWT_SECRET)
    },

    generateToken: (req, res, next) => {
        req.token = controller.createToken(req.auth)
        next()
    },

    sendToken: (req, res) => {
        res.setHeader('authorization', req.token)
        res.status(200).json(req.auth)
    }
}


module.exports = controller