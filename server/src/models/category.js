'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Course, { foreignKey: 'CategoryId' })
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Category name must be unique' },
      validate: {
        notEmpty: { msg: "Category name can't be empty" },
        notNull: { msg: "Category name can't be empty" },
      },
    },
  }, { sequelize, modelName: 'Category' })

  return Category
}
