'use strict '

const express = require('express')
const TransactionController = require('../controllers/TransactionController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/:id')
    .get(AuthMiddleware.authenticate, TransactionController.getTransactionById)

router.route('/')
    .get(AuthMiddleware.authenticate, TransactionController.getAllTransactions)
    .post(AuthMiddleware.authenticate, TransactionController.createTransaction)

module.exports = router