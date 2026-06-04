'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      UserCourse.belongsTo(models.User, { foreignKey: 'UserId' })
      UserCourse.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  }

  UserCourse.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CourseId: { type: DataTypes.INTEGER, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    chargeId: { type: DataTypes.STRING },
    referenceId: { type: DataTypes.STRING },
  }, { sequelize, modelName: 'UserCourse' })

  return UserCourse
}
