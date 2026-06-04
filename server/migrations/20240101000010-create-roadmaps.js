'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roadmaps', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      title: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: false },
      thumbnailUrl: { type: Sequelize.STRING },
      difficulty: { type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'), allowNull: false },
      SkillDomainId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'SkillDomains', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Roadmaps')
  },
}
