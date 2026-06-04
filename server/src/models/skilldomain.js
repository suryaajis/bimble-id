'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class SkillDomain extends Model {
    static associate(models) {
      SkillDomain.hasMany(models.Roadmap, { foreignKey: 'SkillDomainId' })
    }
  }

  SkillDomain.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Skill domain name must be unique' },
      validate: {
        notEmpty: { msg: "Name can't be empty" },
        notNull: { msg: "Name can't be empty" },
      },
    },
    description: { type: DataTypes.TEXT },
    icon: { type: DataTypes.STRING },
  }, { sequelize, modelName: 'SkillDomain' })

  return SkillDomain
}
