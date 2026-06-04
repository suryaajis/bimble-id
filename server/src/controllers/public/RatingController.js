const { Rating, Course } = require('../../models')

class RatingController {
  static async getCourseRating(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.courseId)
      if (!course) throw { name: 'CourseNotFound' }

      const ratings = await Rating.findAll({ where: { CourseId: course.id } })
      const avg = ratings.length
        ? Number((ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1))
        : null

      res.json({ rating: avg, count: ratings.length })
    } catch (err) {
      next(err)
    }
  }

  static async getUserRating(req, res, next) {
    try {
      const rating = await Rating.findOne({
        where: { UserId: req.user.id, CourseId: req.params.courseId },
        attributes: ['rating'],
      })
      res.json(rating)
    } catch (err) {
      next(err)
    }
  }

  static async addRating(req, res, next) {
    try {
      const { courseId } = req.params
      const userId = req.user.id
      const { rating } = req.body

      const existing = await Rating.findOne({ where: { UserId: userId, CourseId: courseId } })
      if (existing) throw { name: 'AlreadyRated' }

      const newRating = await Rating.create({ rating, UserId: userId, CourseId: courseId })
      res.status(201).json({ rating: newRating.rating, UserId: userId, CourseId: Number(courseId) })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RatingController
