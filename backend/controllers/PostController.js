'use strict'

const Post = require('../models/Post')
const Student = require('../models/Student')
const Tag = require('../models/Tag')
const Location = require('../models/Location')
const toJson = require('../helpers/toJson')
const asyncFunction = require('../helpers/asyncFunction')

const ObjectId = require('mongoose').Types.ObjectId

const controller = {
    getPostById: async(req, res) => {
        try {
            const postId = req.params.id
            let post = await Post.findById(postId)
                .populate({
                    path: 'postOwner',
                    populate: {
                        path: 'user',
                    }
                })
                .populate({
                    path: 'tags',
                    model : 'Tag'
                })
                .populate({
                    path: 'locations',
                    model : 'Location'
                })
            return res.status(200).json(post)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getAllPosts: async(req, res) => {
        try {
            let allPosts = await Post.find()
                .populate({
                    path: 'postOwner',
                    populate: {
                        path: 'user',
                    }
                })
                .populate({
                    path: 'tags',
                    model : 'Tag'
                })
                .populate({
                    path: 'locations',
                    model : 'Location'
                })
            return res.status(200).json(allPosts)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createPost: async(req, res) => {
        try {
            var tags = []
            var locations = []
            var tags_name = []
            var locs_name = []
            const userId = Object(req.auth.id)

            let student = await Student.findOne({
                'user': userId
            })

            if (!student) {
                return res.status(403).send('You are not Student')
            }

            let newPost = new Post({
                title: req.body.title,
                description: req.body.description,
                postOwner: student._id,
            })
            await newPost.save()

            await asyncFunction.asyncForEach(req.body.tags, (async(element) => {
                let tag = await Tag.findOne({
                    name: element
                })
                if (tag) {
                    let newTagPosts = tag.posts
                    newTagPosts.push(newPost._id)
                    tag.set({
                        posts: newTagPosts
                    })
                    await (tag.save())
                    tags.push(tag._id)
                    tags_name.push(tag.name)
                } else {
                    let newTag = new Tag({
                        name: element,
                        posts: [newPost._id]
                    })
                    await newTag.save()
                    tags.push(newTag._id)
                    tags_name.push(newTag.name)
                }
            }))
            await asyncFunction.asyncForEach(req.body.locations, (async(element) => {
                let location = await Location.findOne({
                    name: element
                })
                if (location) {
                    let newLocationPosts = location.posts
                    newLocationPosts.push(newPost._id)
                    location.set({
                        posts: newLocationPosts
                    })
                    await (location.save())
                    locations.push(location._id)
                    locs_name.push(location.name)
                } else {
                    let newLocation = new Location({
                        name: element,
                        posts: [newPost._id]
                    })
                    await newLocation.save()
                    locations.push(newLocation._id)
                    locs_name.push(newLocation.name)
                }
            }))

            newPost.set({
                tags: tags,
                locations: locations
            })
            await newPost.save()

            let response = {
                post: newPost,
                tags_name : tags_name,
                locs_name : locs_name
            }
            res.status(200).json(response)
        } catch (e) {
            console.log(e)
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller