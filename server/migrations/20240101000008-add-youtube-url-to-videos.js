'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Allow videoUrl to be null so videos can use YouTube instead of an upload
    await queryInterface.changeColumn('Videos', 'videoUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn('Videos', 'youtubeUrl', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'videoUrl',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Videos', 'youtubeUrl')

    await queryInterface.changeColumn('Videos', 'videoUrl', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}
