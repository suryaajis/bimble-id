'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Roadmap extends Model {
    static associate(models) {
      Roadmap.belongsTo(models.SkillDomain, { foreignKey: 'SkillDomainId' })
      Roadmap.hasMany(models.RoadmapStep, { foreignKey: 'RoadmapId' })
      Roadmap.belongsToMany(models.User, { through: 'UserRoadmaps', foreignKey: 'RoadmapId' })
    }
  }

  Roadmap.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Roadmap title must be unique' },
      validate: {
        notEmpty: { msg: "Title can't be empty" },
        notNull: { msg: "Title can't be empty" },
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
    thumbnailUrl: { type: DataTypes.STRING },
    difficulty: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      allowNull: false,
      validate: {
        notNull: { msg: "Difficulty can't be empty" },
        isIn: { args: [['beginner', 'intermediate', 'advanced']], msg: 'Difficulty must be beginner, intermediate, or advanced' },
      },
    },
    SkillDomainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Skill domain can't be empty" } },
    },
  }, { sequelize, modelName: 'Roadmap' })

  return Roadmap
}
