'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const RatingTransform = (doc, ret) => {
    delete ret.__v
}

const RatingSchema = new Schema({
    ratingScore: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    ratingGiver: {
        type: ObjectID,
        ref: 'Student',
        required: true
    },
    ratedCourse: {
        type: ObjectID,
        ref: 'Course',
        required: true
    }
}, {
    timestamps: true,
    collection: 'ratings',
    toObject: {
        transform: RatingTransform
    },
    toJSON: {
        transform: RatingTransform
    }
})

const Rating = mongoose.model('Rating', RatingSchema)

module.exports = Rating