const { User } = require('../../models')

class AdminUserController {
  static async getAll(req, res, next) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] })
      res.json(users)
    } catch (err) {
      next(err)
    }
  }

  // Promote/demote a user between learner and instructor (Admin is not assignable here).
  static async updateRole(req, res, next) {
    try {
      const { role } = req.body
      if (!['User', 'Instructor'].includes(role)) throw { name: 'InvalidRole' }

      const user = await User.findByPk(req.params.userId)
      if (!user) throw { name: 'UserNotFound' }
      if (user.role === 'Admin') throw { name: 'Forbidden' }

      await user.update({ role })
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AdminUserController
