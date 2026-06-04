const { Category, Course, sequelize } = require('../../models')

class AdminCategoryController {
  static async getAll(req, res, next) {
    try {
      const categories = await Category.findAll({ order: [['name', 'ASC']] })
      res.json(categories)
    } catch (err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    try {
      const category = await Category.create({ name: req.body.name })
      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async destroy(req, res, next) {
    const t = await sequelize.transaction()
    try {
      const category = await Category.findByPk(req.params.categoryId)
      if (!category) throw { name: 'CategoryNotFound' }

      await Course.destroy({ where: { CategoryId: category.id }, transaction: t })
      await category.destroy({ transaction: t })
      await t.commit()

      res.json({ message: `Category "${category.name}" and its courses have been deleted` })
    } catch (err) {
      await t.rollback()
      next(err)
    }
  }
}

module.exports = AdminCategoryController
