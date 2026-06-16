'use strict'

/**
 * Learning roadmaps — structured, role-based paths inspired by roadmap.sh.
 * Each roadmap belongs to a skill domain; the steps (next seeder) link to
 * courses on this platform and to trusted external resources.
 */
const thumb = (seed) => `https://picsum.photos/seed/${seed}/640/360`

const roadmaps = [
  { title: 'Frontend Developer', domain: 'Frontend', difficulty: 'beginner',
    description: 'Step-by-step path to becoming a frontend developer: HTML, CSS, JavaScript, a modern framework, tooling, and deployment.' },
  { title: 'Backend Developer', domain: 'Backend', difficulty: 'intermediate',
    description: 'Go from language fundamentals to building secure, scalable APIs with databases, authentication, caching, and deployment.' },
  { title: 'Full Stack Developer', domain: 'Full Stack', difficulty: 'intermediate',
    description: 'Master both ends of the stack — build a frontend, design an API, connect a database, and ship a complete application.' },
  { title: 'React Developer', domain: 'Frontend', difficulty: 'intermediate',
    description: 'Specialize in the React ecosystem: components, hooks, state management, routing, testing, and performance.' },
  { title: 'Mobile App Developer', domain: 'Mobile', difficulty: 'intermediate',
    description: 'Build and publish mobile apps. Choose cross-platform (Flutter / React Native) or native (Kotlin / Swift) and ship to the stores.' },
  { title: 'Data Analyst', domain: 'Data', difficulty: 'beginner',
    description: 'Learn the tools of the trade — spreadsheets, SQL, Python, and visualization — to answer real business questions with data.' },
  { title: 'Data Scientist', domain: 'Data', difficulty: 'advanced',
    description: 'From statistics and Python to machine learning — build models, evaluate them, and communicate insights.' },
  { title: 'Machine Learning Engineer', domain: 'Machine Learning & AI', difficulty: 'advanced',
    description: 'Take ML from notebook to production: math foundations, classical ML, deep learning, and deploying models as services.' },
  { title: 'AI Engineer (LLM Apps)', domain: 'Machine Learning & AI', difficulty: 'intermediate',
    description: 'Build products on top of large language models — prompting, tool use, RAG, evaluation, and shipping AI features responsibly.' },
  { title: 'DevOps Engineer', domain: 'DevOps & Cloud', difficulty: 'advanced',
    description: 'Automate everything — Linux, Git, containers, Kubernetes, CI/CD, cloud, and observability.' },
  { title: 'Cybersecurity Specialist', domain: 'Cybersecurity', difficulty: 'advanced',
    description: 'Networking and OS fundamentals, web app security, the OWASP Top 10, and hands-on offensive and defensive practice.' },
  { title: 'UX/UI Designer', domain: 'UI/UX Design', difficulty: 'beginner',
    description: 'Design thinking, user research, wireframing, prototyping in Figma, and building a portfolio that gets you hired.' },
  { title: 'Game Developer', domain: 'Game Development', difficulty: 'intermediate',
    description: 'Learn an engine (Unity or Godot), programming, game design principles, and ship a complete playable game.' },
  { title: 'Blockchain Developer', domain: 'Blockchain & Web3', difficulty: 'advanced',
    description: 'Understand blockchains, write and test smart contracts in Solidity, and build full decentralized applications.' },
  { title: 'Computer Science Foundations', domain: 'Computer Science', difficulty: 'beginner',
    description: 'The fundamentals every engineer should know — data structures, algorithms, complexity, and system design.' },
]

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const [domains] = await queryInterface.sequelize.query('SELECT id, name FROM "SkillDomains";')
    const domainId = Object.fromEntries(domains.map((d) => [d.name, d.id]))

    const rows = roadmaps.map((r) => {
      const SkillDomainId = domainId[r.domain]
      if (!SkillDomainId) throw new Error(`Skill domain not found for roadmap "${r.title}": ${r.domain}`)
      return {
        title: r.title,
        description: r.description,
        thumbnailUrl: thumb(r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')),
        difficulty: r.difficulty,
        SkillDomainId,
        createdAt: now,
        updatedAt: now,
      }
    })

    await queryInterface.bulkInsert('Roadmaps', rows, {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roadmaps', null, {})
  },
}
