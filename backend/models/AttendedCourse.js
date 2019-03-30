'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const AttendedCourseTransform = (doc, ret) => {
    delete ret.__v
}

const AttendedCourseSchema = new Schema({
    student: {
        type: ObjectID,
        ref: 'Student',
        required: true
    },
    course: {
        type: ObjectID,
        ref: 'Course',
        required: true
    },
    isFinished: {
        type: Boolean,
        required: true
    },
    studyTakenHours: {
        type: Number,
    },
    totalStudyHours : {
        type : Number,
        required: true
    },
    payment: {
        totalCost: {
            type: Number,
            required: true
        },
        isFullPaid: {
            type: Boolean,
            required: true
        },
        withdrawnAmount: {
            type: Number
        }
    },
    transactions: [{
        type: ObjectID,
        ref: 'Transaction'
    }]
}, {
    timestamps: true,
    collection: 'attendedcourses',
    toObject: {
        transform: AttendedCourseTransform
    },
    toJSON: {
        transform: AttendedCourseTransform
    }
})

const AttendedCourse = mongoose.model('AttendedCourse', AttendedCourseSchema)

module.exports = AttendedCourse