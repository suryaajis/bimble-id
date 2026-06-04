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
}

module.exports = AdminUserController
