'use strict'

const Course = require('../models/Course')
const Tutor = require('../models/Tutor')
const Tag = require('../models/Tag')
const Location = require('../models/Location')
const toJson = require('../helpers/toJson')
const asyncFunction = require('../helpers/asyncFunction')
const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getAllCourses: async(req, res) => {
        try {
            let allCourses = await Course.find().sort({ 'courseAdvertising.boostBudget': -1 })
                .populate({
                    path: 'courseInfo.courseOwner',
                    populate: {
                        path: 'user'
                    }

                })
                .populate({
                    path: 'courseInfo.tags',
                    model: 'Tag'
                })
                .populate({
                    path: 'courseInfo.locations',
                    model: 'Location'
                })

            return res.status(200).json(allCourses)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getCourseById: async(req, res) => {
        try {
            let courseId = req.params.id
            let course = await Course.findById(courseId)
                .populate({
                    path: 'courseInfo.courseOwner',
                    populate: {
                        path: 'user'
                    }

                })
                .populate('comments')
                .populate({
                    path: 'courseInfo.tags',
                    model: 'Tag'
                })
                .populate({
                    path: 'courseInfo.locations',
                    model: 'Location'
                })
                .populate('comment')
            return res.status(200).json(course)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createCourse: async(req, res) => {
        try {
            const userId = ObjectId(req.auth.id)
            var tags = []
            var locations = []
            var tags_name = []
            var locs_name = []

            let tutor = await Tutor.findOne({
                'user': userId
            })

            if (!tutor) {
                return res.status(404).send('Tutor Not Found')
            }

            let course = await Course.findOne({
                courseInfo: {
                    courseName: req.body.courseInfo.courseName
                }
            })

            if (course) {
                return res.status(403).send('Course Existed')
            }

            let newCourse = new Course({
                courseInfo: {
                    courseName: req.body.courseInfo.courseName,
                    courseOwner: tutor._id,
                    cost: req.body.courseInfo.cost
                },
                courseAdvertising: {
                    isPinned: false,
                },
                rating: {
                    overall: 0
                }
            })

            await newCourse.save()

            await asyncFunction.asyncForEach(req.body.courseInfo.tags, (async(element) => {
                let tag = await Tag.findOne({
                    name: element
                })
                if (tag) {
                    let newTagCourses = tag.courses
                    newTagCourses.push(newCourse._id)
                    tag.set({
                        courses: newTagCourses
                    })
                    await (tag.save())
                    tags.push(tag._id)
                    tags_name.push(tag.name)
                } else {
                    let newTag = new Tag({
                        name: element,
                        courses: [newCourse._id]
                    })
                    await newTag.save()
                    tags.push(newTag._id)
                    tags_name.push(newTag.name)
                }
            }))
            await asyncFunction.asyncForEach(req.body.courseInfo.locations, (async(element) => {
                let location = await Location.findOne({
                    name: element
                })
                if (location) {
                    let newLocationCourses = location.courses
                    newLocationCourses.push(newCourse._id)
                    location.set({
                        courses: newLocationCourses
                    })
                    await (location.save())
                    locations.push(location._id)
                    locs_name.push(location.name)
                } else {
                    let newLocation = new Location({
                        name: element,
                        courses: [newCourse._id]
                    })
                    await newLocation.save()
                    locations.push(newLocation._id)
                    locs_name.push(newLocation.name)
                }
            }))

            newCourse.set(req.body)
            newCourse.set({
                courseInfo: {
                    tags: tags,
                    locations: locations
                }
            })

            await newCourse.save()
            tutor.tutorInfo.courses.addToSet(newCourse._id)
            await tutor.save()


            const response = {
                course: newCourse,
                tags_name: tags_name,
                locs_name: locs_name
            }

            res.status(200).send(response)

        } catch (e) {
            console.log(e);
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    updateCourse: async(req, res) => {
        try {
            let courseId = req.params.id
            const userId = ObjectId(req.auth.id)

            let tutor = await Tutor.findOne({
                'user': userId
            })

            if (!tutor) {
                return res.status(404).send('Tutor Not Found')
            }

            let course = await Course.findById(courseId)

            if (!course) {
                return res.status(404).send('Course Not Found')
            }

            var tags = []
            var locations = []
            var tags_name = []
            var locs_name = []

            await asyncFunction.asyncForEach(req.body.courseInfo.tags, (async(element) => {
                let tag = await Tag.findOne({
                    name: element
                })
                if (tag) {
                    tag.courses.addToSet(course._id)
                    await (tag.save())
                    if (!tags.includes(tag._id)) {
                        tags.push(tag._id)
                        tags_name.push(tag.name)
                    }

                } else {
                    let newTag = new Tag({
                        name: element,
                        courses: [course._id]
                    })
                    await newTag.save()
                    tags.push(newTag._id)
                    tags_name.push(newTag.name)
                }
            }))
            await asyncFunction.asyncForEach(req.body.courseInfo.locations, (async(element) => {
                let location = await Location.findOne({
                    name: element
                })
                if (location) {
                    location.courses.addToSet(course._id)
                    await (location.save())
                    if (!locations.includes(locations._id)) {
                        locations.push(location._id)
                        locs_name.push(location.name)
                    }

                } else {
                    let newLocation = new Location({
                        name: element,
                        courses: [course._id]
                    })
                    await newLocation.save()
                    locations.push(newLocation._id)
                    locs_name.push(newLocation.name)
                }
            }))

            course.set(req.body)
            course.set({
                courseInfo: {
                    tags: tags,
                    locations: locations
                }
            })

            await course.save()
            tutor.tutorInfo.courses.addToSet(course._id)
            await tutor.save()

            const response = {
                course: course,
                tags_name: tags_name,
                locs_name: locs_name
            }

            res.status(200).send(response)

        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },

}

module.exports = controller