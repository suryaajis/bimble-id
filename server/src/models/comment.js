'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'UserId' })
      Comment.belongsTo(models.Video, { foreignKey: 'VideoId' })
    }
  }

  Comment.init({
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Comment can't be empty" },
        notNull: { msg: "Comment can't be empty" },
      },
    },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
    VideoId: { type: DataTypes.INTEGER, allowNull: false },
  }, { sequelize, modelName: 'Comment' })

  return Comment
}
