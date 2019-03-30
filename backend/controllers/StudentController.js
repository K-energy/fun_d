'use strict'

const User = require('../models/User')
const Student = require('../models/Student')
const AttendedCourse = require('../models/AttendedCourse')
const Tutor = require('../models/Tutor')
const toJson = require('../helpers/toJson')
const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getStudentById: async(req, res, next) => {
        try {
            const studentId = req.params.id

            let student = await Student.findById(studentId)
                .populate({
                    path: 'attendedCourses',
                    model: 'AttendedCourse',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        populate: {
                            path: 'courseInfo.courseOwner',
                            model: 'Tutor'
                        }
                    }
                }).populate({
                    path: 'attendedCourses',
                    model: 'AttendedCourse',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        populate: {
                            path: 'courseInfo.tags',
                            model: 'Tag'
                        }
                    }
                }).populate({
                    path: 'attendedCourses',
                    model: 'AttendedCourse',
                    populate: {
                        path: 'course',
                        model: 'Course',
                        populate: {
                            path: 'courseInfo.locations',
                            model: 'Location'
                        }
                    }
                }).populate('user')


            if (!student) {
                return res.status(404).send('Student Not Found')
            }

            return res.status(200).json({
                'student': student
            })
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getStudentByUserId: async(req, res, next) => {
        try {
            const userId = ObjectId(req.auth.id)

            const student = await Student.findOne({
                user: userId
            }).populate({
                path: 'attendedCourses',
                model: 'AttendedCourse',
                populate: {
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.courseOwner',
                        model: 'Tutor'
                    }
                }
            }).populate({
                path: 'attendedCourses',
                model: 'AttendedCourse',
                populate: {
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.tags',
                        model: 'Tag'
                    }
                }
            }).populate({
                path: 'attendedCourses',
                model: 'AttendedCourse',
                populate: {
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.locations',
                        model: 'Location'
                    }
                }
            }).populate('user')


            if (!student) {
                return res.status(404).send('Student Not Found')
            }

            return res.status(200).json({
                'student': student
            })
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createStudent: async(req, res) => {
        try {
            const username = req.body.user.username

            let user = await User.findOne({
                'username': username
            })
            if (!user) {
                return res.status(404).send('User Not Found')
            }
            const userId = user._id

            let newStudent = new Student(req.body.student)
            newStudent.set({ user: userId })

            await newStudent.save()

            return res.status(200).send('Create Student Success')

        } catch (e) {
            const username = req.body.user.username

            let user = await User.findOneAndDelete({
                'username': username
            })
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    updateStudent: async(req, res) => {
        try {
            const userId = ObjectId(req.auth.id)
            let student = await Student.findOne({
                'user': userId
            }).populate('user')
            if (!student) {
                return res.status(404).send('Student not found')
            }

            if (!req.body.student) {
                return res.status(200).json({
                    'student': student
                })
            }

            student.set(req.body.student)
            await student.save()

            return res.status(200).json({
                'student': student
            })
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    },

}

module.exports = controller