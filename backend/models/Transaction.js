'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectID = Schema.ObjectId

const TransactionTransform = (doc, ret) => {
    delete ret.__v
}

const TransactionSchema = new Schema({
    user: {
        type: ObjectID,
        ref: 'User',
        required: true
    },
    course: {
        type: ObjectID,
        ref: 'Course',
    },
    transactionType: {
        type: String,
        enum: ['payCourse30', 'payCourse70', 'payPromote', 'paySubscribe', 'withdraw'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    attendedCourse: {
        type: ObjectID,
        ref: 'AttendedCourse'
    }
}, {
    timestamps: true,
    collection: 'transactions',
    toObject: {
        transform: TransactionTransform
    },
    toJSON: {
        transform: TransactionTransform
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction