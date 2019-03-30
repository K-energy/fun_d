'use strict'

const AttendedCourse = require('../models/AttendedCourse')
const toJson = require('../helpers/toJson')
const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getAllAttendedCourses: async(req, res) => {
        try {
            const allAttendedCourses = await AttendedCourse.find().populate(['student', 'course', 'transactions'])
            return res.status(200).json(allAttendedCourses)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getAttendedCourseById: async(req, res) => {
        try {
            const attendedCourseId = req.params.id
            let course = await AttendedCourse.findById(attendedCourseId)
                .populate('transactions')
                .populate({
                    path: 'student',
                    model: 'Student',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })
                .populate({
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.courseOwner',
                        model: 'Tutor',
                        populate: {
                            path: 'user',
                            model: 'User'
                        }
                    }
                })
                .populate({
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'comment',
                        model: 'Comment'
                    }
                })
            if (!course) {
                return res.status(404).send('Attended Course Not Found')
            }
            return res.status(200).json(course)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getAttendedCourseByCourseId: async(req, res) => {
        try {
            const courseId = ObjectId(req.params.id)
            let courses = await AttendedCourse.find({
                    course: courseId
                })
                .populate('transactions')
                .populate({
                    path: 'student',
                    model: 'Student',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })
                .populate({
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'courseInfo.courseOwner',
                        model: 'Tutor',
                        populate: {
                            path: 'user',
                            model: 'User'
                        }
                    }
                })
                .populate({
                    path: 'course',
                    model: 'Course',
                    populate: {
                        path: 'comment',
                        model: 'Comment'
                    }
                })
            return res.status(200).json(courses)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    updateAttendedCourseStudyHour: async(req, res) => {
        try {
            const attendedCourseId = req.params.id
            const currentStudyTakenCourse = req.body.currentStudyTakenCourse
            let course = await AttendedCourse.findById(attendedCourseId)
            if (!course) {
                return res.status(404).send('Attended Course Not Found')
            }
            course.set({
                studyTakenHours: currentStudyTakenCourse
            })
            await course.save()
            return res.status(200).json(course)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller