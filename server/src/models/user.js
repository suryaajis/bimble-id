'use strict'
const { hashPassword } = require('../helpers/bcrypt')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Course, { through: 'UserCourses', foreignKey: 'UserId' })
      User.hasMany(models.Comment, { foreignKey: 'UserId' })
      User.hasMany(models.Rating, { foreignKey: 'UserId' })
      User.belongsToMany(models.Roadmap, { through: 'UserRoadmaps', foreignKey: 'UserId' })
      User.hasMany(models.UserRoadmap, { foreignKey: 'UserId' })
      User.hasMany(models.UserRoadmapStep, { foreignKey: 'UserId' })
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name can't be empty" },
        notNull: { msg: "Name can't be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email is already registered' },
      validate: {
        notEmpty: { msg: "Email can't be empty" },
        notNull: { msg: "Email can't be empty" },
        isEmail: { msg: 'Invalid email format' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password can't be empty" },
        notEmpty: { msg: "Password can't be empty" },
        len: { args: [8, undefined], msg: 'Password must be at least 8 characters' },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'User',
    },
    telegramChatId: { type: DataTypes.STRING, allowNull: true },
    telegramConnectedAt: { type: DataTypes.DATE, allowNull: true },
    reminderEnabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      },
    },
    sequelize,
    modelName: 'User',
  })

  return User
}
