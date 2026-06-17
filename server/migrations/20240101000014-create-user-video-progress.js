'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserVideoProgresses', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      VideoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Videos', key: 'id' },
        onDelete: 'CASCADE',
      },
      isCompleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      completedAt: { type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    })

    await queryInterface.addConstraint('UserVideoProgresses', {
      fields: ['UserId', 'VideoId'],
      type: 'unique',
      name: 'unique_user_video_progress',
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UserVideoProgresses')
  },
}
