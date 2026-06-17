const express = require('express')
const router = express.Router()
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { ovoCharge, ovoStatus, ewalletCharge, ewalletStatus, qrisCharge, qrisStatus } = require('../helpers/xendit')

router.use('/public', publicRouter)
router.use('/admin', adminRouter)

router.post('/ovo/charge', authentication, ovoCharge)
router.post('/ovo/status', ovoStatus)

// New unified payment routes
router.post('/payment/ewallet/charge', authentication, ewalletCharge)
router.post('/payment/ewallet/status', ewalletStatus)
router.post('/payment/qris/charge', authentication, qrisCharge)
router.post('/payment/qris/status', qrisStatus)

router.use(errorHandler)

module.exports = router
