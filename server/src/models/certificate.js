'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.belongsTo(models.User, { foreignKey: 'UserId' })
      Certificate.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  }

  Certificate.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CourseId: { type: DataTypes.INTEGER, allowNull: false },
    certificateNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    issuedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  }, { sequelize, modelName: 'Certificate' })

  return Certificate
}
