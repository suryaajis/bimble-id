'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, { foreignKey: 'AuthorId', as: 'Author' })
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Title can't be empty" } },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Slug is already used' },
      validate: { notEmpty: { msg: "Slug can't be empty" } },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "Content can't be empty" } },
    },
    excerpt: { type: DataTypes.TEXT, allowNull: true },
    coverImageUrl: { type: DataTypes.STRING, allowNull: true },
    tags: { type: DataTypes.STRING, allowNull: true },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'draft',
    },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    viewCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    AuthorId: { type: DataTypes.INTEGER, allowNull: false },
  }, { sequelize, modelName: 'Article' })
  return Article
}
