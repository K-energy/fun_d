'use strict'

const Transaction = require('../models/Transaction')
const Student = require('../models/Student')
const Tutor = require('../models/Tutor')
const Course = require('../models/Course')
const AttendedCourse = require('../models/AttendedCourse')
const toJson = require('../helpers/toJson')
const ObjectId = require('mongoose').Types.ObjectId
const moment = require('moment')

const controller = {
    getTransactionById: async(req, res) => {
        try {
            const transactionId = req.params.id
            let transaction = await Transaction.findById(transactionId)
                .populate({
                    path: 'user',
                })
            return res.status(200).json(transaction)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    getAllTransactions: async(req, res) => {
        try {
            let allTransactions = await Transaction.find()
                .populate({
                    path: 'user',
                })
            return res.status(200).json(allTransactions)
        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    },
    createTransaction: async(req, res) => {
        try {
            const userId = ObjectId(req.auth.id)

            let course = await Course.findOne({
                'courseInfo.courseName': req.body.course
            })

            if (!course && req.body.transactionType !== "paySubscribe") {
                return res.status(404).send('Course Not Found')
            }

            let newTransaction = new Transaction(req.body)
            if (req.body.transactionType === "paySubscribe") {
                newTransaction.set({
                    'user': userId,
                })
            } else {
                newTransaction.set({
                    'user': userId,
                    'course': course._id
                })
            }

            await newTransaction.save()

            if (newTransaction.transactionType === "payCourse30") {
                let student = await Student.findOne({
                    'user': userId
                })
                if (!student) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    res.status(404).send('Student Not Found')
                }
                let attendedCourse = await AttendedCourse.findOne({
                    student: student._id,
                    course: newTransaction.course,
                    isFinished: false,
                    studyTakenHours: 0,
                })

                if (attendedCourse) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(403).send('Some Attended Course is not finished')
                }

                let newAttendedCourse = new AttendedCourse({
                    'student': student._id,
                    'course': newTransaction.course,
                    'isFinished': false,
                    'studyTakenHours': 0,
                    'payment': {
                        'totalCost': req.body.totalCost,
                        'isFullPaid': false,
                        'withdrawnAmount': 0,
                    },
                    'totalStudyHours': req.body.totalStudyHours,
                    'transactions': [newTransaction._id]
                })
                await newAttendedCourse.save()
                newTransaction.set({
                    attendedCourse: newAttendedCourse._id
                })
                await newTransaction.save()
                student.attendedCourses.addToSet(newAttendedCourse._id)
                await student.save()
                return res.status(200).json(newAttendedCourse)
            }

            if (newTransaction.transactionType === "payCourse70") {
                let student = await Student.findOne({
                    'user': userId
                })
                if (!student) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(404).send('Student Not Found')
                }

                let attendedCourse = await AttendedCourse.findOne({
                    student: student._id,
                    course: course._id,
                    isFinished: false
                })

                if (!attendedCourse) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(404).send('Attended Course Not Found')
                }

                attendedCourse.set({
                    payment: {
                        isFullPaid: true
                    }
                })
                attendedCourse.transactions.addToSet(newTransaction._id)
                await attendedCourse.save()
                newTransaction.set({
                    attendedCourse: attendedCourse._id
                })
                await newTransaction.save()
                return res.status(200).json(attendedCourse)
            }

            if (newTransaction.transactionType === "paySubscribe") {
                let tutor = await Tutor.findOne({
                    'user': userId
                })

                if (!tutor) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(404).send('Tutor not Found')
                }

                let now = new moment()
                let earlySubEndDate = new moment(tutor.subEndDate)

                tutor.set({
                    subStartDate: now.format(),
                    subEndDate: earlySubEndDate.add(1, 'months').format()
                })

                await tutor.save()
                return res.status(200).json(tutor)
            }

            if (newTransaction.transactionType === "payPromote") {
                if (course.courseAdvertising.boostBudget) {
                    course.set({
                        courseAdvertising: {
                            isPinned: true,
                            boostBudget: course.courseAdvertising.boostBudget + newTransaction.amount
                        }
                    })
                } else {
                    course.set({
                        courseAdvertising: {
                            isPinned: true,
                            boostBudget: newTransaction.amount
                        }
                    })
                }
                await course.save()
                return res.status(200).json(course)
            }

            if (newTransaction.transactionType === "withdraw") {
                let attendedCourse = await AttendedCourse.findById(req.body.attendedCourse)
                if (!attendedCourse) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(404).send('Attended Course Not Found')
                }

                if (newTransaction.amount + attendedCourse.payment.withdrawnAmount > attendedCourse.payment.totalCost) {
                    await Transaction.findByIdAndRemove(newTransaction._id)
                    return res.status(403).send('Withdrawn Amount is over than Course\'s cost')
                }
                if (newTransaction.amount + attendedCourse.payment.withdrawnAmount == attendedCourse.payment.totalCost) {
                    attendedCourse.set({
                        isFinished: true,
                        payment: {
                            withdrawnAmount: attendedCourse.payment.totalCost
                        }
                    })
                    attendedCourse.transactions.addToSet(newTransaction._id)
                    await attendedCourse.save()
                    return res.status(200).send(attendedCourse)
                }
                if (newTransaction.amount + attendedCourse.payment.withdrawnAmount < attendedCourse.payment.totalCost) {
                    attendedCourse.set({
                        payment: {
                            withdrawnAmount: newTransaction.amount
                        }
                    })
                    attendedCourse.transactions.addToSet(newTransaction._id)
                    await attendedCourse.save()
                    return res.status(200).send(attendedCourse)
                }
            }
            return res.status(500).send('Cannot Define Transaction Type')

        } catch (e) {
            return res.status(500).send(toJson.toJSON(e))
        }
    }
}

module.exports = controller