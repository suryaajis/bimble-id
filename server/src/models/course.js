'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsToMany(models.User, { through: 'UserCourses', foreignKey: 'CourseId' })
      Course.belongsTo(models.Category, { foreignKey: 'CategoryId' })
      Course.hasMany(models.Video, { foreignKey: 'CourseId' })
      Course.hasMany(models.Rating, { foreignKey: 'CourseId' })
      Course.hasMany(models.RoadmapStep, { foreignKey: 'CourseId' })
    }
  }

  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Course name must be unique' },
      validate: {
        notEmpty: { msg: "Name can't be empty" },
        notNull: { msg: "Name can't be empty" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Description can't be empty" },
        notNull: { msg: "Description can't be empty" },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Price can't be empty" },
        min: { args: [0], msg: 'Price must be a positive number' },
      },
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Thumbnail URL can't be empty" },
        notNull: { msg: "Thumbnail URL can't be empty" },
      },
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false,
      validate: {
        notNull: { msg: "Difficulty can't be empty" },
        isIn: { args: [['easy', 'medium', 'hard']], msg: 'Difficulty must be easy, medium, or hard' },
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Category can't be empty" },
      },
    },
  }, { sequelize, modelName: 'Course' })

  return Course
}
