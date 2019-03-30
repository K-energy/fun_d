'use strict'

const Ratings = require('../models/Rating')
const Courses = require('../models/Course')
const Students = require('../models/Student')
const toJson = require('../helpers/toJson')
const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getRatingById: async(req, res) => {
        try {
            const ratingId = req.params.id
            let rating = await Ratings.findById(ratingId).populate(['ratingGiver', 'ratedCourse'])
            return res.status(200).json(rating)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },

    // getRatingByCourseId: async(req, res) => {
    //     try {
    //         const courseId = ObjectId(req.params.id)
    //         let comments = await Ratings.find({
    //                 ratedCourse: courseId
    //             })
    //             .populate(
    //                 'ratingGiver'
    //             )
    //         return res.status(200).json(comments)
    //     } catch (e) {
    //         return res.status(500).send(toJson.toJSON(e))
    //     }
    // },

    createRating: async(req, res) => {
        try {
            const userId = Object(req.auth.id)

            let student = await Students.findOne({
                'user': userId
            })
            if (!student) {
                return res.status(401).send('You are not Student')
            }

            let course = await Courses.findById(req.body.ratedCourse).populate(['rating.allRating','courseInfo.courseOwner'])
            if (!course) {
                return res.status(404).send('Course Not Found')
            }

            let rated = await Ratings.findOne({
                'ratedCourse': ObjectId(req.body.ratedCourse),
                'ratingGiver': student._id,
            })

            if(rated) return res.status(403).send('You already rated this course')


            let newRating = new Ratings(req.body)
            newRating.set({
                ratingGiver: student._id,
                ratedCourse: course._id
            })
            await newRating.save()

            // update course's overall rating
            course.rating.allRating.addToSet(newRating._id)
            let n = course.rating.allRating.length
            //console.log(course.rating.allRating);
            
            course.set('rating.overall', course.rating.overall + (req.body.ratingScore - course.rating.overall)/n)
            
            // update tutor's rating
            course.courseInfo.courseOwner.tutorInfo.allRating.addToSet(newRating._id)
            n = course.courseInfo.courseOwner.tutorInfo.allRating.length
            course.courseInfo.courseOwner.set('tutorInfo.rating',
            course.courseInfo.courseOwner.tutorInfo.rating +
            (req.body.ratingScore - course.courseInfo.courseOwner.tutorInfo.rating)/n)
            
            await course.save()
            await course.courseInfo.courseOwner.save()

            return res.status(200).json(newRating)
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller