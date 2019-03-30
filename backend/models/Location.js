'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const LocationTransform = (doc, ret) => {
    delete ret.__v
}

const LocationSchema = new Schema({
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
    collection: 'locations',
    toObject: {
        transform: LocationTransform
    },
    toJSON: {
        transform: LocationTransform
    }
})

const Location = mongoose.model('Location', LocationSchema)

module.exports = Location