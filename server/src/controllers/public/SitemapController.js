const { Course, Article, Roadmap, User } = require('../../models')

const generateSitemap = async (req, res, next) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173'
    const now = new Date().toISOString()

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/courses', priority: '0.9', changefreq: 'daily' },
      { url: '/articles', priority: '0.9', changefreq: 'daily' },
      { url: '/roadmaps', priority: '0.8', changefreq: 'weekly' },
      { url: '/about', priority: '0.5', changefreq: 'monthly' },
    ]

    // Dynamic course pages (hanya yang active)
    const courses = await Course.findAll({
      where: { status: 'active' },
      attributes: ['id', 'updatedAt'],
    })

    // Dynamic article pages (hanya yang published)
    const articles = await Article.findAll({
      where: { status: 'published' },
      attributes: ['slug', 'updatedAt'],
    })

    // Dynamic roadmap pages
    const roadmaps = await Roadmap.findAll({
      attributes: ['id', 'updatedAt'],
    })

    // Build XML
    const urls = [
      ...staticPages.map(p => `
  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
      ...courses.map(c => `
  <url>
    <loc>${baseUrl}/courses/${c.id}</loc>
    <lastmod>${c.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`),
      ...articles.map(a => `
  <url>
    <loc>${baseUrl}/articles/${a.slug}</loc>
    <lastmod>${a.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`),
      ...roadmaps.map(r => `
  <url>
    <loc>${baseUrl}/roadmaps/${r.id}</loc>
    <lastmod>${r.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.send(xml)
  } catch (err) {
    next(err)
  }
}

module.exports = { generateSitemap }
