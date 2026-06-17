const express = require('express')
const router = express.Router()
const publicRouter = require('./publicRouter')
const adminRouter = require('./adminRouter')
const instructorRouter = require('./instructorRouter')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { generateSitemap } = require('../controllers/public/SitemapController')
const { createPayment, checkStatus, paymentWebhook } = require('../helpers/xendit')

router.use('/public', publicRouter)
router.use('/admin', adminRouter)
router.use('/instructor', instructorRouter)

router.get('/sitemap.xml', generateSitemap)

router.get('/robots.txt', (req, res) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
  res.setHeader('Content-Type', 'text/plain')
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /my-courses
Disallow: /my-roadmaps
Disallow: /profile
Disallow: /buy

Sitemap: ${clientUrl}/sitemap.xml`)
})

// Xendit Unified Payment API v3 — satu endpoint untuk semua metode
router.post('/payment/charge', authentication, createPayment)
router.get('/payment/status/:userCourseId', authentication, checkStatus)
router.post('/payment/webhook', paymentWebhook)

router.use(errorHandler)

module.exports = router
