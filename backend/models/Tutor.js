'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const TutorTransform = (doc, ret) => {
    ret.tutorInfo.idPhoto = ret.tutorInfo.hasOwnProperty('idPhoto') ? process.env.REMOTE_PATH_TUTOR_ID + ret.tutorInfo.idPhoto : null
    delete ret.__v
}

const TutorSchema = new Schema({
    user: {
        type: ObjectID,
        ref: 'User',
        required: true
    },
    subStartDate: {
        type: Date,
        required: true
    },
    subEndDate: {
        type: Date,
        required: true
    },
    tutorInfo: {
        alias : {
            type : String,
            required : true
        },
        sex: {
            type: String,
            enum: ['Male', 'Female', 'Non-binary'],
            required: true
        },
        eduBackground: {
            type: String,
            required: true
        },
        teachingExp: { type: String },
        achievements: { type: String },
        idPhoto: {
            type: String,
        },
        rating: {
            type: Number
        },
        allRating: [{
            type: ObjectID,
            ref: 'Rating'
        }],
        courses: [{
            type: ObjectID,
            ref: 'Course'
        }],
        bankingAccount: {
            type: String
        }
    }
}, {
    timestamps: true,
    collection: 'tutors',
    toObject: {
        transform: TutorTransform
    },
    toJSON: {
        transform: TutorTransform
    }
})

const Tutor = mongoose.model('Tutor', TutorSchema)

module.exports = Tutor