'use strict'

const Comment = require('../models/Comment')
const Course = require('../models/Course')
const Student = require('../models/Student')
const toJson = require('../helpers/toJson')

const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getCommentById: async(req, res) => {
        try {
            const commentId = req.params.id
            let comment = await Comment.findById(commentId)
                .populate(
                    'commentGiver', 'commentedCourse'
                )
            return res.status(200).json(comment)
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getCommentByCourseId: async(req, res) => {
        try {
            const courseId = ObjectId(req.params.id)
            let comments = await Comment.find({
                    commentedCourse: courseId
                })
                .populate(
                    'commentGiver'
                )
            return res.status(200).json(comments)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createComment: async(req, res) => {
        try {
            const userId = Object(req.auth.id)

            let student = await Student.findOne({
                'user': userId
            })

            if (!student) {
                return res.status(401).send('You are not Student')
            }

            // console.log(req.body)
            let course = await Course.findOne({
                'courseInfo.courseName': req.body.commentedCourse
            })

            if (!course) {
                return res.status(404).send('Course Not Found')
            }

            let newComment = new Comment(req.body)
            newComment.set({
                commentGiver: student._id,
                commentedCourse: course._id
            })
            await newComment.save()

            course.comments.addToSet(newComment._id)

            await course.save()

            res.status(200).json(newComment)
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller