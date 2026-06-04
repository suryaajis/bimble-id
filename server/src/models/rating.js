'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'UserId' })
      Rating.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  }

  Rating.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Rating can't be empty" },
        min: { args: [1], msg: 'Minimum rating is 1' },
        max: { args: [10], msg: 'Maximum rating is 10' },
      },
    },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    CourseId: { type: DataTypes.INTEGER, allowNull: false },
  }, { sequelize, modelName: 'Rating' })

  return Rating
}
