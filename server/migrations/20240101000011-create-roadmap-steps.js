'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoadmapSteps', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      RoadmapId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Roadmaps', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      order: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      CourseId: {
        type: Sequelize.INTEGER,
        references: { model: 'Courses', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      resourceUrl: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('RoadmapSteps')
  },
}
