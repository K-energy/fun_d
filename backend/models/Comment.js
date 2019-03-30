'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const CommentTransform = (doc, ret) => {
    delete ret.__v
}

const CommentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    commentGiver: {
        type: ObjectID,
        ref: 'Student',
        required: true
    },
    commentedCourse: {
        type: ObjectID,
        ref: 'Course',
        required: true
    }
}, {
    timestamps: true,
    collection: 'comments',
    toObject: {
        transform: CommentTransform
    },
    toJSON: {
        transform: CommentTransform
    }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment