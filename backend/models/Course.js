'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const CourseTransform = (doc, ret) => {
    delete ret.__v
}

const CourseSchema = new Schema({
    courseInfo: {
        courseName: {
            type: String,
            required: true
        },
        courseOwner: {
            type: ObjectID,
            ref: 'Tutor',
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        tags: [{
            type: ObjectID,
            ref : 'Tag'
        }],
        locations: [{
            type: ObjectID,
            ref : 'Location'
        }]
    },
    courseMoreInfo: {
        courseDescription: {
            type: String
        },
        lowestLevel: {
            type: String,
            enum: ['เตรียมอนุบาล', 'อนุบาลปีที่ 1', 'อนุบาลปีที่ 2', 'อนุบาลปีที่ 3',
                'ประถมศึกษาปีที่ 1', 'ประถมศึกษาปีที่ 2', 'ประถมศึกษาปีที่ 3', 'ประถมศึกษาปีที่ 4', 'ประถมศึกษาปีที่ 5', 'ประถมศึกษาปีที่ 6',
                'มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4', 'มัธยมศึกษาปีที่ 5', 'มัธยมศึกษาปีที่ 6'
            ]
        },
        highestLevel: {
            type: String,
            enum: ['เตรียมอนุบาล', 'อนุบาลปีที่ 1', 'อนุบาลปีที่ 2', 'อนุบาลปีที่ 3',
                'ประถมศึกษาปีที่ 1', 'ประถมศึกษาปีที่ 2', 'ประถมศึกษาปีที่ 3', 'ประถมศึกษาปีที่ 4', 'ประถมศึกษาปีที่ 5', 'ประถมศึกษาปีที่ 6',
                'มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4', 'มัธยมศึกษาปีที่ 5', 'มัธยมศึกษาปีที่ 6'
            ]
        }
    },
    courseAdvertising: {
        isPinned: {
            type: Boolean
        },
        boostBudget: {
            type: Number
        }
    },
    rating: {
        allRating: [{
            type: ObjectID,
            ref: 'Rating'
        }],
        overall: {
            type: Number
        }
    },
    comments: [{
        type: ObjectID,
        ref: 'Comment'
    }]
}, {
    timestamps: true,
    collection: 'courses',
    toObject: {
        transform: CourseTransform
    },
    toJSON: {
        transform: CourseTransform
    }
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course