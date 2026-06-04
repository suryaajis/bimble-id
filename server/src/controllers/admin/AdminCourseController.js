const { Course, Category, Video, sequelize } = require('../../models')
const { Op } = require('sequelize')
const { toEmbedUrl } = require('../../helpers/youtube')

class AdminCourseController {
  static async getAll(req, res, next) {
    try {
      const { page, search } = req.query
      const limit = 10

      const where = {}
      if (search) where.name = { [Op.iLike]: `%${search}%` }

      const options = {
        where,
        include: [{ model: Category, attributes: ['id', 'name'] }],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: [['createdAt', 'DESC']],
      }

      if (page) {
        options.limit = limit
        options.offset = (Number(page) - 1) * limit
        const { count, rows } = await Course.findAndCountAll(options)
        return res.json({ courses: rows, totalCourses: count, totalPages: Math.ceil(count / limit), currentPage: Number(page) })
      }

      const courses = await Course.findAll(options)
      res.json(courses)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.courseId, {
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Video, attributes: { exclude: ['createdAt', 'updatedAt'] } },
        ],
      })
      if (!course) throw { name: 'CourseNotFound' }
      res.json(course)
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const { name, description, price, thumbnailUrl, difficulty, CategoryId, Videos } = req.body

      const course = await Course.create(
        { name, description, price, thumbnailUrl, difficulty, status: 'active', CategoryId },
        { transaction: t }
      )

      // youtubeVideos is a JSON string sent alongside FormData for YouTube-only slots
      const youtubeVideos = req.body.youtubeVideos
        ? JSON.parse(req.body.youtubeVideos)
        : []

      const uploadedVideos = (Videos || []).map(v => ({
        name: v.name,
        videoUrl: v.videoUrl,
        CourseId: course.id,
      }))

      const ytVideoRecords = youtubeVideos.map(v => ({
        name: v.name,
        youtubeUrl: toEmbedUrl(v.youtubeUrl),
        CourseId: course.id,
      }))

      const videoRecords = [...uploadedVideos, ...ytVideoRecords]
      const videos = await Video.bulkCreate(videoRecords, { transaction: t })

      await t.commit()
      res.status(201).json({ course, videos })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const { courseId } = req.params
      const { name, description, price, thumbnailUrl, difficulty, status, CategoryId } = req.body

      const course = await Course.findByPk(courseId)
      if (!course) throw { name: 'CourseNotFound' }

      await course.update({ name, description, price, thumbnailUrl, difficulty, status, CategoryId })
      res.json(course)
    } catch (err) {
      next(err)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.courseId)
      if (!course) throw { name: 'CourseNotFound' }
      await course.update({ status: req.body.status })
      res.json(course)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminCourseController
