'use strict'

/**
 * Course categories. Modeled after the high-level tracks used by online
 * learning platforms such as Udemy, Coursera and freeCodeCamp.
 */
module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const names = [
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Mobile Development',
      'Programming Languages',
      'Data Science',
      'Machine Learning & AI',
      'DevOps & Cloud',
      'Databases',
      'Cybersecurity',
      'UI/UX Design',
      'Game Development',
      'Blockchain & Web3',
      'Computer Science',
      'Career & Soft Skills',
    ]

    await queryInterface.bulkInsert(
      'Categories',
      names.map((name) => ({ name, createdAt: now, updatedAt: now })),
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
