'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserCourses', 'paymentMethod', {
      type: Sequelize.ENUM('OVO', 'GOPAY', 'DANA', 'SHOPEEPAY', 'QRIS'),
      allowNull: true,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('UserCourses', 'paymentMethod')
  }
}
