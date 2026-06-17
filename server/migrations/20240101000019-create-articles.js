'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      content: { type: Sequelize.TEXT, allowNull: false },
      excerpt: { type: Sequelize.TEXT, allowNull: true },
      coverImageUrl: { type: Sequelize.STRING, allowNull: true },
      tags: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.ENUM('draft', 'published'), allowNull: false, defaultValue: 'draft' },
      publishedAt: { type: Sequelize.DATE, allowNull: true },
      viewCount: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      AuthorId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Articles')
  }
}
