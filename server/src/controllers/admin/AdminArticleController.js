const { Article, User } = require('../../models')
const { Op } = require('sequelize')

const getAll = async (req, res, next) => {
  try {
    const { page = 1, search, status } = req.query
    const limit = 10
    const offset = (page - 1) * limit
    const where = {}
    if (search) where.title = { [Op.iLike]: `%${search}%` }
    if (status) where.status = status

    const { rows: articles, count } = await Article.findAndCountAll({
      where,
      include: [{ model: User, as: 'Author', attributes: ['name'] }],
      attributes: { exclude: ['content'] },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    })

    res.json({ articles, totalArticles: count, totalPages: Math.ceil(count / limit), currentPage: Number(page) })
  } catch (err) {
    next(err)
  }
}

const getById = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.articleId, {
      include: [{ model: User, as: 'Author', attributes: ['name'] }],
    })
    if (!article) throw { name: 'ArticleNotFound' }
    res.json(article)
  } catch (err) {
    next(err)
  }
}

// Helper untuk generate slug dari title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const create = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImageUrl, tags, status = 'draft' } = req.body
    const slug = req.body.slug || generateSlug(title)
    const publishedAt = status === 'published' ? new Date() : null

    const article = await Article.create({
      title, slug, content, excerpt, coverImageUrl, tags, status, publishedAt,
      AuthorId: req.user.id,
    })

    res.status(201).json(article)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.articleId)
    if (!article) throw { name: 'ArticleNotFound' }

    const { title, content, excerpt, coverImageUrl, tags } = req.body
    const updatedSlug = req.body.slug || (title ? generateSlug(title) : article.slug)

    await article.update({ title, content, excerpt, coverImageUrl, tags, slug: updatedSlug })
    res.json(article)
  } catch (err) {
    next(err)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.articleId)
    if (!article) throw { name: 'ArticleNotFound' }

    const newStatus = article.status === 'published' ? 'draft' : 'published'
    const publishedAt = newStatus === 'published' ? new Date() : article.publishedAt

    await article.update({ status: newStatus, publishedAt })
    res.json({ status: newStatus, publishedAt })
  } catch (err) {
    next(err)
  }
}

const destroy = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.articleId)
    if (!article) throw { name: 'ArticleNotFound' }
    await article.destroy()
    res.json({ message: 'Article deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getById, create, update, updateStatus, destroy }
