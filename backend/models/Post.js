'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const PostTransform = (doc, ret) => {
    delete ret.__v
}

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    postOwner: {
        type: ObjectID,
        ref: 'Student'
    },
    tags: [{
        type: ObjectID,
        ref: 'Tag'
    }],
    locations: [{
        type: ObjectID,
        ref: 'Location'
    }]
}, {
    timestamps: true,
    collection: 'posts',
    toObject: {
        transform: PostTransform
    },
    toJSON: {
        transform: PostTransform
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post