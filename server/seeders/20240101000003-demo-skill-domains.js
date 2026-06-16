'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SkillDomains', [
      {
        name: 'Web Development',
        description: 'Kuasai teknologi web modern mulai dari HTML/CSS, JavaScript, hingga framework populer seperti Vue.js dan React. Jadilah web developer profesional yang siap kerja.',
        icon: 'code',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Data Science & Analytics',
        description: 'Pelajari cara menganalisis data besar, membuat visualisasi, dan mengambil keputusan berbasis data menggunakan Python, Pandas, dan tools analitik modern.',
        icon: 'chart-bar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Machine Learning & AI',
        description: 'Selami dunia kecerdasan buatan dan machine learning. Pelajari algoritma ML, deep learning, NLP, dan cara membangun model AI production-ready.',
        icon: 'cpu-chip',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mobile Development',
        description: 'Bangun aplikasi mobile native dan cross-platform untuk Android dan iOS menggunakan React Native, Flutter, atau Swift/Kotlin.',
        icon: 'device-phone-mobile',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'DevOps & Cloud Engineering',
        description: 'Otomasi deployment, kelola infrastruktur cloud, dan implementasikan CI/CD pipeline menggunakan Docker, Kubernetes, AWS, dan alat DevOps modern.',
        icon: 'cloud',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cybersecurity',
        description: 'Pelajari keamanan siber dari dasar hingga mahir. Kuasai penetration testing, ethical hacking, dan cara melindungi sistem dari ancaman siber.',
        icon: 'shield-check',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UI/UX Design',
        description: 'Rancang pengalaman pengguna yang intuitif dan antarmuka yang menarik. Pelajari design thinking, prototyping, dan tools seperti Figma dari nol.',
        icon: 'paint-brush',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Backend Engineering',
        description: 'Bangun sistem backend yang scalable dan andal menggunakan Node.js, Python, atau Go. Pelajari API design, database, caching, dan arsitektur microservices.',
        icon: 'server',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SkillDomains', null, {})
  },
}
