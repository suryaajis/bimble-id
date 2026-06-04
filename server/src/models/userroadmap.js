'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class UserRoadmap extends Model {
    static associate(models) {
      UserRoadmap.belongsTo(models.User, { foreignKey: 'UserId' })
      UserRoadmap.belongsTo(models.Roadmap, { foreignKey: 'RoadmapId' })
    }
  }

  UserRoadmap.init({
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    RoadmapId: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('active', 'completed'),
      allowNull: false,
      defaultValue: 'active',
    },
  }, { sequelize, modelName: 'UserRoadmap' })

  return UserRoadmap
}
