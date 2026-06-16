'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roadmaps', [
      {
        title: 'Frontend Developer Roadmap',
        description: 'Roadmap lengkap untuk menjadi Frontend Developer profesional. Mulai dari HTML/CSS dasar, JavaScript, hingga framework modern Vue.js dan React. Selesaikan semua langkah dan dapatkan sertifikat Frontend Developer dari Bimble.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
        difficulty: 'beginner',
        SkillDomainId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Backend Developer dengan Node.js',
        description: 'Kuasai pengembangan backend menggunakan Node.js, Express, PostgreSQL, dan arsitektur REST API. Roadmap ini dirancang untuk developer yang ingin membangun server-side aplikasi yang andal dan scalable.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        difficulty: 'intermediate',
        SkillDomainId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Data Science & Machine Learning',
        description: 'Perjalanan lengkap menjadi Data Scientist — dari Python dasar, statistik, analisis data, visualisasi, hingga implementasi model machine learning dan deep learning untuk industri.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        difficulty: 'intermediate',
        SkillDomainId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Full-Stack Web Developer',
        description: 'Kuasai seluruh stack teknologi web — dari frontend Vue.js hingga backend Node.js, database PostgreSQL, dan deployment. Roadmap komprehensif untuk developer yang ingin menguasai keseluruhan proses pembangunan web.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800',
        difficulty: 'advanced',
        SkillDomainId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'DevOps Engineer Roadmap',
        description: 'Jadilah DevOps Engineer yang dicari perusahaan teknologi. Pelajari Linux, Docker, Kubernetes, CI/CD pipeline, monitoring, dan cloud infrastructure management dari nol.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
        difficulty: 'advanced',
        SkillDomainId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roadmaps', null, {})
  },
}
