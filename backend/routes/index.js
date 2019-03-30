'use strict'

const express = require('express')
const router = express.Router()

const users = require('./users')
const auth = require('./auth')
const search = require('./search')
const post = require('./posts')
const transaction = require('./transactions')
const tagandlocation = require('./tagandlocation')
const course = require('./courses')
const comment = require('./comments')
const rating = require('./rating')
const attendedcourse = require('./attendedcourses')

router.use('/', tagandlocation)
router.use('/users', users)
router.use('/auth', auth)
router.use('/search', search)
router.use('/post', post)
router.use('/transaction', transaction)
router.use('/course', course)
router.use('/comment', comment)
router.use('/rating', rating)
router.use('/attended', attendedcourse)

module.exports = router