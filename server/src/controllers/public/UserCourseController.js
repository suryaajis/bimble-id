const { UserCourse, User, Course, Video, Comment } = require('../../models')
const sendEmail = require('../../helpers/nodemailer')

class UserCourseController {
  static async getAll(req, res, next) {
    try {
      const userCourses = await UserCourse.findAll({
        where: { UserId: req.user.id, isPaid: true },
        include: [
          { model: Course, attributes: { exclude: ['updatedAt', 'createdAt'] } },
        ],
        attributes: { exclude: ['updatedAt', 'createdAt'] },
      })
      res.json(userCourses)
    } catch (err) {
      next(err)
    }
  }

  static async getPending(req, res, next) {
    try {
      const pending = await UserCourse.findAll({
        where: { UserId: req.user.id, isPaid: false },
        include: [
          { model: Course, attributes: { exclude: ['updatedAt', 'createdAt'] } },
        ],
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        order: [['createdAt', 'DESC']],
      })
      res.json(pending)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const userCourse = await UserCourse.findOne({
        where: { UserId: req.user.id, CourseId: req.params.courseId },
      })
      if (!userCourse) throw { name: 'CourseNotFound' }

      const course = await Course.findOne({
        where: { id: req.params.courseId },
        include: [
          {
            model: Video,
            attributes: { exclude: ['updatedAt', 'createdAt'] },
            include: {
              model: Comment,
              attributes: ['id', 'comment', 'createdAt'],
              include: { model: User, attributes: ['name'] },
            },
          },
        ],
        order: [[Video, 'id', 'ASC']],
      })

      res.json({
        ...userCourse.toJSON(),
        Course: course,
      })
    } catch (err) {
      next(err)
    }
  }

  static async enroll(req, res, next) {
    try {
      const { courseId } = req.params
      const userId = req.user.id

      const course = await Course.findByPk(courseId)
      if (!course) throw { name: 'CourseNotFound' }

      const existing = await UserCourse.findOne({ where: { UserId: userId, CourseId: courseId } })
      if (existing) throw { name: 'CourseAlreadyPurchased' }

      // Course gratis (harga 0 atau null) langsung terbuka tanpa pembayaran
      const isFree = !course.price || Number(course.price) <= 0

      const user = await User.findByPk(userId)
      const newEnrollment = await UserCourse.create({ UserId: userId, CourseId: courseId, isPaid: isFree })

      sendEmail({
        email: user.email,
        subject: isFree ? 'Course Enrolled - Bimble' : 'Course Purchase Initiated - Bimble',
        html: isFree
          ? `<h2>Hi ${user.name}!</h2><p>You're enrolled in <strong>${course.name}</strong>. It's free — start learning right away!</p>`
          : `<h2>Hi ${user.name}!</h2><p>You've initiated purchase for <strong>${course.name}</strong>. Complete your payment to unlock the course!</p>`,
      })

      res.status(201).json({ id: newEnrollment.id, UserId: userId, CourseId: courseId, isPaid: isFree })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserCourseController
