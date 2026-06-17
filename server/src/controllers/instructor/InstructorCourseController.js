const { Course, Category, Video, sequelize } = require('../../models')
const { Op } = require('sequelize')
const { toEmbedUrl } = require('../../helpers/youtube')

// Course management scoped to the authenticated instructor. Every read/write is
// constrained to courses the instructor owns (UserId === req.user.id); new
// courses start as approvalStatus 'pending' until an admin reviews them.
class InstructorCourseController {
  static async getAll(req, res, next) {
    try {
      const { page, search } = req.query
      const limit = 10

      const where = { UserId: req.user.id }
      if (search) where.name = { [Op.iLike]: `%${search}%` }

      const options = {
        where,
        include: [{ model: Category, attributes: ['id', 'name'] }],
        attributes: { exclude: ['updatedAt'] },
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

  // req.course is attached by the ownsCourseParam guard.
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
        {
          name,
          description,
          price,
          thumbnailUrl,
          difficulty,
          status: 'active',
          approvalStatus: 'pending',
          UserId: req.user.id,
          CategoryId,
        },
        { transaction: t }
      )

      const youtubeVideos = req.body.youtubeVideos ? JSON.parse(req.body.youtubeVideos) : []

      const uploadedVideos = (Videos || []).map(v => ({ name: v.name, videoUrl: v.videoUrl, CourseId: course.id }))
      const ytVideoRecords = youtubeVideos.map(v => ({ name: v.name, youtubeUrl: toEmbedUrl(v.youtubeUrl), CourseId: course.id }))

      const videos = await Video.bulkCreate([...uploadedVideos, ...ytVideoRecords], { transaction: t })

      await t.commit()
      res.status(201).json({ course, videos })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }

  // Editing course content resets it to 'pending' so admins re-review changes.
  static async update(req, res, next) {
    try {
      const { name, description, price, thumbnailUrl, difficulty, CategoryId } = req.body
      const course = req.course
      await course.update({ name, description, price, thumbnailUrl, difficulty, CategoryId, approvalStatus: 'pending' })
      res.json(course)
    } catch (err) {
      next(err)
    }
  }

  // Instructor's own publish/unpublish toggle (active/inactive).
  static async updateStatus(req, res, next) {
    try {
      await req.course.update({ status: req.body.status })
      res.json(req.course)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = InstructorCourseController
