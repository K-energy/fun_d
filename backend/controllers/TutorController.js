'use strict'

const moment = require('moment');
const User = require('../models/User')
const Tutor = require('../models/Tutor')
const toJson = require('../helpers/toJson')
const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getTutorById: async(req, res, next) => {
        try {
            const tutorId = req.params.id

            const tutor = await Tutor.findById(tutorId).populate(['user', 'tutorInfo.courses'])

            if (!tutor) {
                return res.status(404).send('Tutor Not Found')
            }

            return res.status(200).json({
                'tutor': tutor
            })
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getTutorByUserId: async(req, res, next) => {
        try {
            const userId = ObjectId(req.auth.id)

            const tutor = await Tutor.findOne({
                    'user': userId
                }).populate('user')
                .populate({
                    path: 'tutorInfo.courses',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.tags'
                    }
                })
                .populate({
                    path: 'tutorInfo.courses',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.locations'
                    }
                })

            if (!tutor) {
                return res.status(404).send('Tutor Not Found')
            }

            return res.status(200).json({
                'tutor': tutor
            })
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createTutor: async(req, res) => {
        try {
            const username = req.body.user.username
            let user = await User.findOne({
                'username': username
            })
            if (!user) {
                return res.status(404).send('User Not Found')
            }
            const userId = user._id
            let now = new moment()

            let newTutor = new Tutor(req.body.tutor)
            newTutor.set({
                user: userId,
                subStartDate: now.format(),
                subEndDate: now.add(1, 'months').format(),
                tutorInfo: {
                    rating: 0
                }
            })

            await newTutor.save()

            return res.status(200).send('Create Tutor Success')

        } catch (e) {
            const username = req.body.user.username
            let user = await User.findOneAndDelete({
                'username': username
            })
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createIdPhoto: async(req, res) => {
        try {
            if (req.file) {
                const id = ObjectId(req.auth.id)
                const filename = req.file.filename

                let tutor = await Tutor.findOne({
                    'user': id
                })

                if (!tutor) {
                    return res.status(404).send('tutor not found')
                }

                tutor.set({
                    tutorInfo: {
                        idPhoto: filename
                    }
                })

                await tutor.save()

                return res.status(201).send(tutor)
            } else {
                return res.status(500).send('Error uploading user profile photo')
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    updateTutor: async(req, res) => {
        try {
            const userId = ObjectId(req.auth.id)
            let tutor = await Tutor.findOne({
                'user': userId
            }).populate('user')
            if (!tutor) {
                return res.status(404).send('Tutor not found')
            }

            if (!req.body.tutor) {
                return res.status(200).json({
                    'tutor': tutor
                })
            }
            tutor.set(req.body.tutor)
            await tutor.save()

            return res.status(200).json({
                'tutor': tutor
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    },
}

module.exports = controller