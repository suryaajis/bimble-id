const express = require('express')
const router = express.Router()
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const instructorRouter = require('./instructorRouter')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { createPayment, checkStatus, paymentWebhook } = require('../helpers/xendit')

router.use('/public', publicRouter)
router.use('/admin', adminRouter)
router.use('/instructor', instructorRouter)

// Xendit Unified Payment API v3 — satu endpoint untuk semua metode
router.post('/payment/charge', authentication, createPayment)
router.get('/payment/status/:userCourseId', authentication, checkStatus)
router.post('/payment/webhook', paymentWebhook)

router.use(errorHandler)

module.exports = router
