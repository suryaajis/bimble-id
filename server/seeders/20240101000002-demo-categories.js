'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { name: 'JavaScript', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Python', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TypeScript', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vue.js', createdAt: new Date(), updatedAt: new Date() },
      { name: 'React', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Node.js', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Database & SQL', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Data Science', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Machine Learning', createdAt: new Date(), updatedAt: new Date() },
      { name: 'DevOps & Cloud', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mobile Development', createdAt: new Date(), updatedAt: new Date() },
      { name: 'UI/UX Design', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cybersecurity', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Algoritma & Struktur Data', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Git & Version Control', createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
