'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class RoadmapStep extends Model {
    static associate(models) {
      RoadmapStep.belongsTo(models.Roadmap, { foreignKey: 'RoadmapId' })
      RoadmapStep.belongsTo(models.Course, { foreignKey: 'CourseId' })
      RoadmapStep.hasMany(models.UserRoadmapStep, { foreignKey: 'RoadmapStepId' })
    }
  }

  RoadmapStep.init({
    RoadmapId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Roadmap can't be empty" } },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Order can't be empty" },
        min: { args: [1], msg: 'Order must be a positive number' },
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title can't be empty" },
        notNull: { msg: "Title can't be empty" },
      },
    },
    description: { type: DataTypes.TEXT },
    CourseId: { type: DataTypes.INTEGER },
    resourceUrl: { type: DataTypes.STRING },
  }, { sequelize, modelName: 'RoadmapStep' })

  return RoadmapStep
}
