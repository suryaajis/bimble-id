'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      name: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
      thumbnailUrl: { type: Sequelize.STRING, allowNull: false },
      difficulty: { type: Sequelize.ENUM('easy', 'medium', 'hard'), allowNull: false },
      status: { type: Sequelize.ENUM('active', 'inactive'), allowNull: false, defaultValue: 'active' },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Courses')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Courses_difficulty";')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Courses_status";')
  },
}
