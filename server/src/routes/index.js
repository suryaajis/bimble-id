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

router.post('/ovo/charge', authentication, ovoCharge)
router.post('/ovo/status', ovoStatus)

router.use(errorHandler)

module.exports = router
