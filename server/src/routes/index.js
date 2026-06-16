const express = require('express')
const router = express.Router()
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { ovoCharge, ovoStatus } = require('../helpers/xendit')
const { telegramWebhook } = require('../controllers/public/TelegramController')

router.use('/public', publicRouter)
router.use('/admin', adminRouter)

router.post('/ovo/charge', authentication, ovoCharge)
router.post('/ovo/status', ovoStatus)

router.post('/telegram/webhook', telegramWebhook)

router.use(errorHandler)

module.exports = router
