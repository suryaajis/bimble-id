'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserVideoProgress extends Model {
    static associate(models) {
      UserVideoProgress.belongsTo(models.User, { foreignKey: 'UserId' })
      UserVideoProgress.belongsTo(models.Video, { foreignKey: 'VideoId' })
    }
  }

  UserVideoProgress.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    VideoId: { type: DataTypes.INTEGER, allowNull: false },
    isCompleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    completedAt: { type: DataTypes.DATE },
  }, { sequelize, modelName: 'UserVideoProgress' })

  return UserVideoProgress
}
