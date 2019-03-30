'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const TagTransform = (doc, ret) => {
    delete ret.__v
}

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: ObjectID,
        ref: 'Course'
    }],
    posts: [{
        type: ObjectID,
        ref: 'Post'
    }]
}, {
    collection: 'tags',
    toObject: {
        transform: TagTransform
    },
    toJSON: {
        transform: TagTransform
    }
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag