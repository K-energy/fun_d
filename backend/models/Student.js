'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const StudentTransform = (doc, ret) => {
    delete ret.__v
}

const StudentSchema = new Schema({
    user: {
        type: ObjectID,
        ref: 'User',
        required: true
    },
    school: {
        type: String
    },
    level: {
        type: String,
        enum: ['เตรียมอนุบาล', 'อนุบาลปีที่ 1', 'อนุบาลปีที่ 2', 'อนุบาลปีที่ 3',
            'ประถมศึกษาปีที่ 1', 'ประถมศึกษาปีที่ 2', 'ประถมศึกษาปีที่ 3', 'ประถมศึกษาปีที่ 4', 'ประถมศึกษาปีที่ 5', 'ประถมศึกษาปีที่ 6',
            'มัธยมศึกษาปีที่ 1', 'มัธยมศึกษาปีที่ 2', 'มัธยมศึกษาปีที่ 3', 'มัธยมศึกษาปีที่ 4', 'มัธยมศึกษาปีที่ 5', 'มัธยมศึกษาปีที่ 6'
        ]
    },
    attendedCourses: [{
        type: ObjectID,
        ref: 'AttendedCourse'
    }]
}, {
    timestamps: true,
    collection: 'students',
    toObject: {
        transform: StudentTransform
    },
    toJSON: {
        transform: StudentTransform
    }
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student