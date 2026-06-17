'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Videos', [
      // Course 1 — JavaScript untuk Pemula
      { name: 'Pengenalan JavaScript & Instalasi', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Variabel, Tipe Data, dan Operator', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kondisional dan Perulangan', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fungsi dan Scope', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Array dan Object', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'DOM Manipulation', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Event Handling', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'ES6+: Arrow Function, Destructuring, Spread', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Promise dan Async/Await', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fetch API dan AJAX', youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk', videoUrl: null, CourseId: 1, createdAt: new Date(), updatedAt: new Date() },

      // Course 2 — Python
      { name: 'Instalasi Python & Setup VS Code', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Variabel dan Tipe Data Python', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'List, Tuple, Dictionary, dan Set', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fungsi dan Lambda', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'OOP: Class dan Object', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'File I/O dan Exception Handling', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Modul dan Package pip', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Proyek Akhir: Aplikasi CLI Manajemen Tugas', youtubeUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoUrl: null, CourseId: 2, createdAt: new Date(), updatedAt: new Date() },

      // Course 4 — Vue.js 3
      { name: 'Pengenalan Vue.js 3 dan Vite', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Composition API & script setup', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Reactive dan Ref', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computed Properties dan Watch', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Component, Props, dan Emit', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vue Router 4: SPA Navigation', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pinia: State Management Modern', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Integrasi REST API dengan Axios', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Proyek Final: E-Learning SPA', youtubeUrl: 'https://www.youtube.com/watch?v=VeNfHj6MhgA', videoUrl: null, CourseId: 4, createdAt: new Date(), updatedAt: new Date() },

      // Course 6 — Node.js & Express
      { name: 'Pengenalan Node.js dan NPM', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Membuat Server dengan Express.js', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Middleware dan Router', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sequelize ORM dengan PostgreSQL', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Authentication JWT', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'File Upload dengan Multer', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Email dengan Nodemailer', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deploy ke Railway & Render', youtubeUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE', videoUrl: null, CourseId: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Videos', null, {})
  },
}
