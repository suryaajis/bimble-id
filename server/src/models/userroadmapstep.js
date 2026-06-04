'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserRoadmapStep extends Model {
    static associate(models) {
      UserRoadmapStep.belongsTo(models.User, { foreignKey: 'UserId' })
      UserRoadmapStep.belongsTo(models.RoadmapStep, { foreignKey: 'RoadmapStepId' })
    }
  }

  UserRoadmapStep.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    RoadmapStepId: { type: DataTypes.INTEGER, allowNull: false },
    completedAt: { type: DataTypes.DATE, allowNull: false },
  }, { sequelize, modelName: 'UserRoadmapStep' })

  return UserRoadmapStep
}
