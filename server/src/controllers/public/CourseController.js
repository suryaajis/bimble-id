const { Course, Category, Video, Comment, User, Rating } = require('../../models')
const { Op, fn, col, literal } = require('sequelize')

class CourseController {
  static async getAll(req, res, next) {
    try {
      const { page = 1, search, categoryId, difficulty, price } = req.query
      const limit = 12
      const offset = (Number(page) - 1) * limit

      // Only published (active) AND admin-approved courses are publicly listed.
      const where = { status: 'active', approvalStatus: 'approved' }
      if (search) where.name = { [Op.iLike]: `%${search}%` }
      if (categoryId) where.CategoryId = categoryId
      if (difficulty) where.difficulty = difficulty

      const order = price ? [['price', price.toUpperCase()]] : [['createdAt', 'DESC']]

      const { count, rows } = await Course.findAndCountAll({
        where,
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: User, as: 'Instructor', attributes: ['id', 'name'] },
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order,
        limit,
        offset,
      })

      res.json({
        courses: rows,
        totalCourses: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
      })
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.courseId, {
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: User, as: 'Instructor', attributes: ['id', 'name'] },
          {
            model: Video,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
              model: Comment,
              attributes: ['id', 'comment', 'createdAt'],
              include: { model: User, attributes: ['name'] },
            },
          },
          {
            model: Rating,
            attributes: ['rating'],
          },
        ],
        order: [[Video, 'id', 'ASC']],
      })

      // Hide courses that are not publicly sellable (unpublished or not yet approved).
      if (!course || course.status !== 'active' || course.approvalStatus !== 'approved') throw { name: 'CourseNotFound' }

      const courseData = course.toJSON()
      const avgRating = courseData.Ratings?.length
        ? Number((courseData.Ratings.reduce((sum, r) => sum + r.rating, 0) / courseData.Ratings.length).toFixed(1))
        : null

      for (let i = 1; i < courseData.Videos.length; i++) {
        courseData.Videos[i].videoUrl = ''
      }

      res.json({ ...courseData, avgRating })
    } catch (err) {
      next(err)
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ attributes: ['id', 'name'], order: [['name', 'ASC']] })
      res.json(categories)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CourseController
