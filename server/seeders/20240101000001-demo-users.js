'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10)
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin Bimble',
        email: 'admin@bimble.id',
        password: bcrypt.hashSync('Admin1234!', salt),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Budi Santoso',
        email: 'budi@example.com',
        password: bcrypt.hashSync('User1234!', salt),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Siti Rahayu',
        email: 'siti@example.com',
        password: bcrypt.hashSync('User1234!', salt),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agus Pratama',
        email: 'agus@example.com',
        password: bcrypt.hashSync('User1234!', salt),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dewi Kusuma',
        email: 'dewi@example.com',
        password: bcrypt.hashSync('User1234!', salt),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eko Wahyudi',
        email: 'eko@example.com',
        password: bcrypt.hashSync('User1234!', salt),
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
