'use strict'

/**
 * Skill domains group roadmaps into broad career tracks, mirroring the
 * role-based and skill-based paths popularized by roadmap.sh.
 */
module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const domains = [
      { name: 'Frontend', description: 'Everything you need to build modern, accessible user interfaces for the web.', icon: '🎨' },
      { name: 'Backend', description: 'Server-side development: APIs, databases, authentication, and scalable services.', icon: '⚙️' },
      { name: 'Full Stack', description: 'Combine frontend and backend skills to ship complete web applications end to end.', icon: '🧩' },
      { name: 'Mobile', description: 'Build native and cross-platform apps for Android and iOS.', icon: '📱' },
      { name: 'Data', description: 'Analyze data, build pipelines, and turn raw numbers into decisions.', icon: '📊' },
      { name: 'Machine Learning & AI', description: 'From classical ML to deep learning and building AI-powered products.', icon: '🤖' },
      { name: 'DevOps & Cloud', description: 'Automate, deploy, and operate reliable infrastructure at scale.', icon: '☁️' },
      { name: 'Cybersecurity', description: 'Protect systems and data — offensive and defensive security skills.', icon: '🔒' },
      { name: 'UI/UX Design', description: 'Research, design, and prototype products people love to use.', icon: '✏️' },
      { name: 'Game Development', description: 'Design and build interactive games with modern engines.', icon: '🎮' },
      { name: 'Blockchain & Web3', description: 'Smart contracts, decentralized apps, and the Web3 stack.', icon: '⛓️' },
      { name: 'Computer Science', description: 'Timeless fundamentals — algorithms, data structures, and system design.', icon: '💡' },
    ]

    await queryInterface.bulkInsert(
      'SkillDomains',
      domains.map((d) => ({ ...d, createdAt: now, updatedAt: now })),
      {},
    )
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('SkillDomains', null, {})
  },
}
