const express = require('express')
const router = express.Router()
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { ovoCharge, ovoStatus } = require('../helpers/xendit')
const { generateSitemap } = require('../controllers/public/SitemapController')

router.use('/public', publicRouter)
router.use('/admin', adminRouter)

router.get('/sitemap.xml', generateSitemap)

router.post('/ovo/charge', authentication, ovoCharge)
router.post('/ovo/status', ovoStatus)

router.use(errorHandler)

module.exports = router
