'use strict'
const _ = require('lodash')
const Courses = require('../models/Course')
const Tags = require('../models/Tag')
const Locations = require('../models/Location')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const toJSON = require('../helpers/toJson').toJSON

const controller = {
    gets: async(req, res) => {
        return res.status(200).send('Welcome to search controller!')
    },
    get_courses_by_name: async(req, res) => {
        const query = {
            'courseInfo.courseName': {
                '$regex': req.query.courseName,
                '$options': 'i'
            }
        }
        try {
            let result = await Courses.find(query).sort({ 'courseAdvertising.boostBudget': -1 })
                .populate({
                    path: 'courseInfo.tags',
                    model: 'Tag'
                })
                .populate({
                    path: 'courseInfo.locations',
                    model: 'Location'
                })
                .populate({
                    path: 'courseInfo.courseOwner',
                    populate: {
                        path: 'user'
                    }

                })
            return res.status(200).send(toJSON(result))
        } catch (e) {
            return res.status(500).send(toJSON(e))
        }
    },

    get_courses_by_tags: async(req, res) => {
        let tags = req.query.tags
        const query = { 'name': { '$in': tags } }
        const projection = {
            'courses': 1,
            '_id': 0
        }
        try {
            let out = []
            let result = await Tags.find(query, projection)
                .sort({ 'courseAdvertising.boostBudget': -1 })
                .populate('courses')
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.tags',
                        model: 'Tag'
                    }

                })
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.locations',
                        model: 'Location'
                    }

                })
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.courseOwner',
                        populate: {
                            path: 'user'
                        }
                    }
                })


            result.forEach(tag => {
                out.push.apply(out, tag.courses)
            })
            return res.status(200).send(toJSON(out))
        } catch (e) {
            return res.status(500).send(toJSON(e))
        }
    },

    get_courses_by_locations: async(req, res) => {
        let locs = req.query.locations
        const query = {
            'name': {
                '$in': locs
            }
        }
        const projection = {
            'courses': 1,
            '_id': 0
        }
        try {
            let out = []
            let result = await Locations.find(query, projection)
                .sort({ 'courseAdvertising.boostBudget': -1 })
                .populate('courses')
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.tags',
                        model: 'Tag'
                    }

                })
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.locations',
                        model: 'Location'
                    }

                })
                .populate({
                    path: 'courses',
                    populate: {
                        path: 'courseInfo.courseOwner',
                        populate: {
                            path: 'user'
                        }
                    }
                })

            result.forEach(loc => {
                out.push.apply(out, loc.courses)
            })
            return res.status(200).send(toJSON(out))
        } catch (e) {
            return res.status(500).send(toJSON(e))
        }
    },

    get_courses_by_filters: async(req, res) => {
        // revise search and/or condition
        let query = {}
        query['courseInfo.courseName'] = { '$regex': req.query.courseName, '$options': 'i' }
        query['courseInfo.cost'] = { '$gte': req.query.costLower, '$lte': req.query.costUpper } // cost range
        query['rating.overall'] = { '$gte': req.query.courseRating } // course's rating

        const locs = _.compact(req.query.locations)
        const tags = _.compact(req.query.tags)

        try {
            let out = []
            let result = await Courses.find(query)
                .sort({ 'courseAdvertising.boostBudget': -1 })
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

            let tag_names = []
            let loc_names = []
            let q_sex = req.query.sex

            result.forEach(course => {
                tag_names = course.courseInfo.tags.map(t => t.name)
                loc_names = course.courseInfo.locations.map(l => l.name)
                if (course.courseInfo.courseOwner.tutorInfo.rating >= req.query.tutorRating &&
                    ((_.intersection(q_sex, [course.courseInfo.courseOwner.tutorInfo.sex]).length > 0) ||
                        (_.compact(q_sex).length === 0)) &&
                    ((_.intersection(tag_names, tags).length > 0) || (tags.length === 0)) &&
                    ((_.intersection(loc_names, locs).length > 0) || (locs.length === 0))) {
                        
                        out.push(course)
                    }
            })
            return res.status(200).send(toJSON(out))
        } catch (e) {
            return res.status(500).send(toJSON(e))
        }
    },

    get_courses_by_locs_and_tags: async(req, res) => {
        const loc_query = { 'name': { '$in': req.query.locations } }
        const tags_query = { 'name': { '$in': req.query.tags } }
        const projection = { 'courses': 1 }

        try {
            let out = new Set()
            let result = []
            let loc_result = await Locations.find(loc_query, projection)
            loc_result.forEach(loc => {
                out.add(loc.courses.toString())
            })

            let tag_result = await Tags.find(tags_query, projection)
            tag_result.forEach(tag => {
                out.add(tag.courses.toString())
            })

            out = Array.from(out)
            out.forEach((course_id, i) => {
                    out[i] = ObjectId(course_id)
                })
            let x = await Courses.find({ '_id': { '$in': out } })

            return res.status(200).send(toJSON(x))
        } catch (e) {
            return res.status(500).send(toJSON(e))
        }
    }
}

module.exports = controller