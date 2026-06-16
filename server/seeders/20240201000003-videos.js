'use strict'

/**
 * Lesson videos for each course. Sources are real, well-known educational
 * YouTube full-courses (freeCodeCamp, Programming with Mosh, Traversy Media,
 * etc.). Where a course has no curated match we fall back to a rotating pool
 * so every course still gets a few valid lessons.
 */
const yt = (id) => `https://www.youtube.com/watch?v=${id}`

// Curated real YouTube full-course IDs per course name.
const curated = {
  'Responsive Web Design with HTML & CSS': ['G3e-cpL7ofc', 'mU6anWqZJcc', 'OXGznpKZ_sA'],
  'JavaScript Algorithms and Data Structures': ['PkZNo7MFNFg', 'jS4aFq5-91M', '8aGhZQkoFbQ'],
  'Modern JavaScript from Zero to Hero': ['hdI2bqOjy3c', 'W6NZfCO5SIk', 'NCwa_xi0Uuc'],
  'Vue.js 3 — The Complete Guide': ['FXpIoQ_rT_c', 'YrxBCBibVo0', 'qZXt1Aom3Cs'],
  'React — From Beginner to Advanced': ['bMknfKXIFA8', 'w7ejDZ8SWv8', 'SqcY0GlETPk'],
  'TypeScript Fundamentals': ['30LWjhZzg50', 'd56mG7DezGs', 'BwuLxPH8IDs'],
  'Node.js & Express REST API Development': ['Oe421EPjeBE', 'pKd0Rpw7O48', 'fgTGADljAeg'],
  'Building APIs with Python & FastAPI': ['0sOvCWFmrtA', '7t2alSnE2-I', 'tLKKmouUams'],
  'Django for Web Developers': ['rHux0gMZ3Eg', 'F5mRW0jo-U4', 'JT80XhYJdBw'],
  'SQL & Relational Databases': ['HXV3zeQKqGY', '7S_tz1z_5bA', 'p3qvj9hO_Bo'],
  'PostgreSQL for Developers': ['qw--VYLpxG4', 'SpfIwlAYaKk', 'kn4lkP3jp2I'],
  'MongoDB & NoSQL Essentials': ['c2M-rlkkT5o', 'Www6cTUymCY', 'ofme2o29ngU'],
  'Python for Everybody': ['rfscVS0vtbw', '8DvywoWv6fI', 'eWRfhZUzrAc'],
  'Java Programming Masterclass': ['grEKMHGYyns', 'A74TOX803D0', 'xk4_1vDrzzo'],
  'C++ Fundamentals': ['vLnPwxZdW4Y', '8jLOx1hD3_o', 'ZzaPdXTrSb8'],
  'Go (Golang) for Backend Engineers': ['un6ZyFkqFKo', 'yyUHQIec83I', 'jFfo23yIWac'],
  'Rust Programming Crash Course': ['MsocPEZBd-M', 'BpPEoZW5IiY', 'ygL_xcavzQ4'],
  'Flutter & Dart — Build iOS and Android Apps': ['VPvVD8t02U8', 'x0uinJvhNxI', '1xipg02Wu8s'],
  'React Native for Beginners': ['0-S5a0eXPoc', 'ur6I5m2nTvk', 'obH0Po_RdWc'],
  'Android Development with Kotlin': ['EExSSotojVk', 'F9UC9DY-vIU', 'BCSlZIUj18Y'],
  'Data Analysis with Python (Pandas & NumPy)': ['r-uOLxNrNk8', 'vmEHCJofslg', 'GPVsHOlRBBI'],
  'Introduction to Machine Learning': ['NWONeJKn6kc', 'i_LwzRVP7bg', '7eh4d6sabA0'],
  'Deep Learning with TensorFlow & Keras': ['tPYj3fFJGjk', 'qFJeN9V1ZsI', 'VwVg9jCtqaU'],
  'Git & GitHub for Teams': ['RGOj5yH7evk', 'apGV9Kg7ics', 'tRZGeaHPoaw'],
  'Docker & Containers from Scratch': ['fqMOX6JJhGo', '3c-iBn73dDE', 'pg19Z8LL06w'],
  'Kubernetes for Developers': ['X48VuDVv0do', 's_o8dwzRlu4', 'd6WC5n9G_sM'],
  'Data Structures & Algorithms': ['8hly31xKli0', 'RBSGKlAvoiM', '09_LlHjoEiY'],
  'Game Development with Unity': ['gB1F9G0JXOo', 'XtQMytORBmM', 'on9nwbZngyw'],
}

// Fallback pool of valid educational video IDs (reused round-robin).
const pool = [
  'PkZNo7MFNFg', 'rfscVS0vtbw', 'bMknfKXIFA8', 'Oe421EPjeBE',
  'HXV3zeQKqGY', 'RGOj5yH7evk', 'fqMOX6JJhGo', 'NWONeJKn6kc',
]

const lessonTitles = ['Introduction & Setup', 'Core Concepts', 'Hands-on Project']

module.exports = {
  async up(queryInterface) {
    const now = new Date()

    const [coursesRows] = await queryInterface.sequelize.query('SELECT id, name FROM "Courses" ORDER BY id;')

    const videos = []
    coursesRows.forEach((course, idx) => {
      const ids = curated[course.name] || [
        pool[idx % pool.length],
        pool[(idx + 3) % pool.length],
        pool[(idx + 5) % pool.length],
      ]
      ids.forEach((videoId, i) => {
        videos.push({
          name: `${course.name} — ${lessonTitles[i] || `Lesson ${i + 1}`}`,
          videoUrl: null,
          youtubeUrl: yt(videoId),
          CourseId: course.id,
          createdAt: now,
          updatedAt: now,
        })
      })
    })

    await queryInterface.bulkInsert('Videos', videos, {})
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Videos', null, {})
  },
}
