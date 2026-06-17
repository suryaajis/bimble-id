'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Owning instructor. Nullable so existing/admin-created courses stay unowned.
    await queryInterface.addColumn('Courses', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })

    // Moderation state, separate from the instructor's own active/inactive toggle.
    // Defaults to 'approved' so every existing course remains publicly visible.
    await queryInterface.addColumn('Courses', 'approvalStatus', {
      type: Sequelize.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'approved',
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Courses', 'approvalStatus')
    await queryInterface.removeColumn('Courses', 'UserId')
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Courses_approvalStatus";')
  },
}
