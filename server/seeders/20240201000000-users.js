'use strict'

const { hashPassword } = require('../src/helpers/bcrypt')

/**
 * One account per role for local testing. Runs first so other seeders could
 * reference these users if needed. Passwords are hashed here because bulkInsert
 * bypasses the User model's beforeCreate hook.
 *
 *   admin@bimble.id    / password123  → Admin
 *   teacher@bimble.id  / password123  → Instructor
 *   student@bimble.id  / password123  → User
 */
module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const password = hashPassword('password123')

    await queryInterface.bulkInsert('Users', [
      { name: 'Bimble Admin', email: 'admin@bimble.id', password, role: 'Admin', createdAt: now, updatedAt: now },
      { name: 'Teacher Budi', email: 'teacher@bimble.id', password, role: 'Instructor', createdAt: now, updatedAt: now },
      { name: 'Student Sari', email: 'student@bimble.id', password, role: 'User', createdAt: now, updatedAt: now },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize
    await queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['admin@bimble.id', 'teacher@bimble.id', 'student@bimble.id'] },
    }, {})
  },
}
