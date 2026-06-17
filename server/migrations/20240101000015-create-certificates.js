'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Certificates', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      UserId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      CourseId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Courses', key: 'id' }, onDelete: 'CASCADE' },
      certificateNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
      issuedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })
    await queryInterface.addConstraint('Certificates', {
      fields: ['UserId', 'CourseId'],
      type: 'unique',
      name: 'unique_user_course_certificate'
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Certificates')
  }
}
