const { Course, UserCourse, User } = require('../../models')
const { fn, col } = require('sequelize')

// Aggregate stats and sales for the authenticated instructor's own courses.
class InstructorDashboardController {
  static async stats(req, res, next) {
    try {
      const instructorId = req.user.id

      const [totalCourses, activeCourses, pendingCourses] = await Promise.all([
        Course.count({ where: { UserId: instructorId } }),
        Course.count({ where: { UserId: instructorId, status: 'active', approvalStatus: 'approved' } }),
        Course.count({ where: { UserId: instructorId, approvalStatus: 'pending' } }),
      ])

      // Paid enrollments across this instructor's courses.
      const paid = await UserCourse.findAll({
        where: { isPaid: true },
        include: [{ model: Course, where: { UserId: instructorId }, attributes: ['price'] }],
        attributes: ['id', 'UserId'],
      })

      const earnings = paid.reduce((sum, uc) => sum + (uc.Course?.price || 0), 0)
      const students = new Set(paid.map(uc => uc.UserId)).size

      res.json({ totalCourses, activeCourses, pendingCourses, students, totalSales: paid.length, earnings })
    } catch (err) {
      next(err)
    }
  }

  static async sales(req, res, next) {
    try {
      const sales = await UserCourse.findAll({
        where: { isPaid: true },
        include: [
          { model: Course, where: { UserId: req.user.id }, attributes: ['id', 'name', 'price', 'thumbnailUrl'] },
          { model: User, attributes: ['id', 'name', 'email'] },
        ],
        attributes: ['id', 'createdAt'],
        order: [['createdAt', 'DESC']],
      })
      res.json(sales)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = InstructorDashboardController
