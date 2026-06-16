'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'telegramChatId', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('Users', 'telegramConnectedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    await queryInterface.addColumn('Users', 'reminderEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'telegramChatId')
    await queryInterface.removeColumn('Users', 'telegramConnectedAt')
    await queryInterface.removeColumn('Users', 'reminderEnabled')
  }
}
