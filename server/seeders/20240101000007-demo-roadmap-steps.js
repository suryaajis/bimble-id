'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RoadmapSteps', [
      // Roadmap 1 — Frontend Developer
      { RoadmapId: 1, order: 1, title: 'Dasar HTML & CSS', description: 'Pelajari struktur HTML semantik, CSS box model, flexbox, grid, dan responsive design.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 2, title: 'JavaScript Fundamentals', description: 'Kuasai dasar JavaScript: variabel, fungsi, DOM, async/await, dan ES6+ modern syntax.', CourseId: 1, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 3, title: 'Version Control dengan Git', description: 'Pelajari Git dan GitHub untuk mengelola kode dan berkolaborasi dalam tim.', CourseId: 12, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 4, title: 'Framework: Vue.js 3', description: 'Pelajari Vue.js 3 dengan Composition API, Pinia, dan Vue Router untuk membangun SPA.', CourseId: 4, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 5, title: 'TypeScript untuk Frontend', description: 'Tingkatkan kode JavaScript dengan type safety menggunakan TypeScript.', CourseId: 3, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 6, title: 'Testing & Performance', description: 'Pelajari unit testing dengan Vitest, E2E testing dengan Playwright, dan optimasi performa.', CourseId: null, resourceUrl: 'https://vitest.dev', createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 1, order: 7, title: 'Deploy Frontend ke Production', description: 'Deploy aplikasi Vue.js ke Vercel, Netlify, atau GitHub Pages.', CourseId: null, resourceUrl: 'https://vercel.com', createdAt: new Date(), updatedAt: new Date() },

      // Roadmap 2 — Backend Node.js
      { RoadmapId: 2, order: 1, title: 'JavaScript & Node.js Dasar', description: 'Pastikan kamu menguasai JavaScript dasar dan memahami cara kerja runtime Node.js.', CourseId: 1, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 2, title: 'REST API dengan Express.js', description: 'Bangun REST API yang clean dan terstruktur menggunakan Express.js dan best practices.', CourseId: 6, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 3, title: 'Database: SQL & PostgreSQL', description: 'Kuasai SQL, schema design, relasi antar tabel, dan optimasi query di PostgreSQL.', CourseId: 7, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 4, title: 'Autentikasi & Otorisasi', description: 'Implementasikan JWT authentication, OAuth2 (Google), dan role-based access control.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 5, title: 'Caching & Performance', description: 'Optimalkan API dengan Redis caching, connection pooling, dan query optimization.', CourseId: null, resourceUrl: 'https://redis.io', createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 6, title: 'Testing API', description: 'Tulis unit test dan integration test menggunakan Jest dan Supertest.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 2, order: 7, title: 'Deploy & DevOps Dasar', description: 'Deploy Node.js app ke cloud (Railway, Render, VPS) dengan environment variables dan CI/CD.', CourseId: 10, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },

      // Roadmap 3 — Data Science & ML
      { RoadmapId: 3, order: 1, title: 'Python untuk Data Science', description: 'Kuasai Python dan ekosistemnya: NumPy, Pandas, Matplotlib, Seaborn.', CourseId: 2, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 3, order: 2, title: 'Matematika & Statistik untuk ML', description: 'Pelajari aljabar linear, kalkulus, probabilitas, dan statistik yang dibutuhkan ML.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 3, order: 3, title: 'Exploratory Data Analysis (EDA)', description: 'Teknik analisis dan visualisasi data untuk menemukan pola dan insight.', CourseId: 8, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 3, order: 4, title: 'Machine Learning dengan Scikit-learn', description: 'Implementasikan algoritma ML klasik: regresi, klasifikasi, clustering.', CourseId: 9, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 3, order: 5, title: 'Deep Learning & Neural Network', description: 'Pelajari deep learning dengan TensorFlow dan PyTorch untuk masalah kompleks.', CourseId: null, resourceUrl: 'https://tensorflow.org', createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 3, order: 6, title: 'Deploy ML Model ke Production', description: 'Serve model ML sebagai REST API menggunakan FastAPI dan Docker.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },

      // Roadmap 4 — Full-Stack
      { RoadmapId: 4, order: 1, title: 'JavaScript Fundamental', description: 'Pondasi JavaScript yang wajib dikuasai sebelum masuk framework.', CourseId: 1, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 4, order: 2, title: 'SQL & Database Design', description: 'Schema design, normalisasi, dan query SQL untuk aplikasi web.', CourseId: 7, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 4, order: 3, title: 'Backend API dengan Node.js', description: 'REST API lengkap dengan Express, Sequelize, JWT, dan file upload.', CourseId: 6, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 4, order: 4, title: 'Frontend dengan Vue.js 3', description: 'SPA modern dengan Vue.js 3, Pinia, dan Vue Router.', CourseId: 4, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 4, order: 5, title: 'TypeScript', description: 'Tingkatkan maintainability codebase dengan TypeScript.', CourseId: 3, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 4, order: 6, title: 'DevOps & Deployment', description: 'Docker, CI/CD, dan deployment aplikasi full-stack ke cloud.', CourseId: 10, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },

      // Roadmap 5 — DevOps
      { RoadmapId: 5, order: 1, title: 'Linux & Command Line', description: 'Kuasai sistem operasi Linux dan shell scripting untuk administrasi server.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 2, title: 'Git & Version Control', description: 'Git branching strategy, CI/CD hooks, dan GitOps workflow.', CourseId: 12, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 3, title: 'Docker & Containerization', description: 'Containerisasi aplikasi dengan Docker, Docker Compose, dan image management.', CourseId: 10, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 4, title: 'Kubernetes', description: 'Orkestrasi container dengan Kubernetes, deployment strategies, dan service mesh.', CourseId: null, resourceUrl: 'https://kubernetes.io', createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 5, title: 'CI/CD Pipeline', description: 'Implementasikan pipeline otomatis dengan GitHub Actions, Jenkins, atau GitLab CI.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 6, title: 'Cloud: AWS atau GCP', description: 'Kelola infrastruktur cloud — EC2, S3, RDS, Load Balancer, dan auto-scaling.', CourseId: null, resourceUrl: 'https://aws.amazon.com', createdAt: new Date(), updatedAt: new Date() },
      { RoadmapId: 5, order: 7, title: 'Monitoring & Observability', description: 'Setup monitoring dengan Prometheus, Grafana, ELK Stack, dan alerting.', CourseId: null, resourceUrl: null, createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RoadmapSteps', null, {})
  },
}
