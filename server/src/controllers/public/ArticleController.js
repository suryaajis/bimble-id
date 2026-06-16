const { Article, User } = require('../../models')
const { Op } = require('sequelize')

const getAll = async (req, res, next) => {
  try {
    const { page = 1, tag, search } = req.query
    const limit = 9
    const offset = (page - 1) * limit

    const where = { status: 'published' }
    if (search) where.title = { [Op.iLike]: `%${search}%` }
    if (tag) where.tags = { [Op.iLike]: `%${tag}%` }

    const { rows: articles, count } = await Article.findAndCountAll({
      where,
      include: [{ model: User, as: 'Author', attributes: ['name'] }],
      attributes: { exclude: ['content', 'updatedAt'] },
      order: [['publishedAt', 'DESC']],
      limit,
      offset,
    })

    res.json({
      articles,
      totalArticles: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    })
  } catch (err) {
    next(err)
  }
}

const getBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { slug: req.params.slug, status: 'published' },
      include: [{ model: User, as: 'Author', attributes: ['name'] }],
    })
    if (!article) throw { name: 'ArticleNotFound' }

    // Increment view count
    await article.increment('viewCount')

    res.json(article)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getBySlug }
