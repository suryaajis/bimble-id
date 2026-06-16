'use strict'

const now = new Date()
const d = (daysAgo) => new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Cara Kerja Async/Await di JavaScript: Panduan Mendalam',
        slug: 'cara-kerja-async-await-javascript-panduan-mendalam',
        content: `<h2>Memahami Asynchronous JavaScript</h2>
<p>JavaScript adalah bahasa single-threaded — artinya hanya bisa mengeksekusi satu operasi pada satu waktu. Namun, banyak operasi di web yang membutuhkan waktu: fetch data dari server, baca file, query database. Jika JavaScript menunggu operasi ini selesai sebelum melanjutkan, aplikasi akan "freeze" dan tidak responsif.</p>
<p>Itulah mengapa JavaScript menggunakan model asinkron: operasi yang membutuhkan waktu dijalankan di "background", sementara kode lain tetap berjalan. Saat operasi selesai, hasilnya dikembalikan melalui mekanisme khusus.</p>

<h2>Evolusi Asynchronous JavaScript</h2>

<h3>Era 1: Callback Hell</h3>
<pre><code>// Cara lama — callback nested yang susah dibaca
getData('/api/user', function(user) {
  getCourses('/api/courses/' + user.id, function(courses) {
    getProgress('/api/progress/' + courses[0].id, function(progress) {
      // Semakin dalam, semakin sulit dibaca dan maintain
      console.log(progress)
    }, handleError)
  }, handleError)
}, handleError)
</code></pre>

<h3>Era 2: Promise</h3>
<pre><code>// Lebih baik — bisa di-chain
fetch('/api/user')
  .then(res =&gt; res.json())
  .then(user =&gt; fetch('/api/courses/' + user.id))
  .then(res =&gt; res.json())
  .then(courses =&gt; {
    console.log(courses)
  })
  .catch(err =&gt; console.error(err))
</code></pre>

<h3>Era 3: Async/Await (Modern)</h3>
<pre><code>// Cara modern — seperti kode sinkron biasa
async function loadUserCourses() {
  try {
    const userRes = await fetch('/api/user')
    const user = await userRes.json()

    const coursesRes = await fetch('/api/courses/' + user.id)
    const courses = await coursesRes.json()

    console.log(courses)
  } catch (err) {
    console.error('Error:', err)
  }
}
</code></pre>

<h2>Aturan-Aturan Async/Await</h2>

<h3>1. async Function Selalu Mengembalikan Promise</h3>
<pre><code>async function ambilData() {
  return 42  // Sebenarnya mengembalikan Promise.resolve(42)
}

ambilData().then(console.log)  // 42
</code></pre>

<h3>2. await Hanya Bisa Digunakan di Dalam async Function</h3>
<pre><code>// ❌ Error: await di luar async function
const data = await fetch('/api')

// ✅ Benar
async function ambilData() {
  const data = await fetch('/api')
  return data.json()
}

// ✅ Top-level await (ES2022, hanya di module)
const data = await fetch('/api')
</code></pre>

<h3>3. Error Handling dengan try/catch</h3>
<pre><code>async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`)

    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`)
    }

    return await response.json()
  } catch (err) {
    console.error('Gagal mengambil data user:', err)
    throw err  // Re-throw agar caller bisa handle
  }
}
</code></pre>

<h2>Pattern Lanjutan</h2>

<h3>Paralel Requests dengan Promise.all</h3>
<pre><code>// ❌ Sequential — total 3 detik (jika masing-masing 1 detik)
const user = await getUser(id)
const courses = await getCourses(id)
const notifications = await getNotifications(id)

// ✅ Paralel — total ~1 detik
const [user, courses, notifications] = await Promise.all([
  getUser(id),
  getCourses(id),
  getNotifications(id)
])
</code></pre>

<h3>Race Condition</h3>
<pre><code>// Promise.race — ambil yang selesai pertama
const result = await Promise.race([
  fetchFromPrimaryServer(),
  fetchFromBackupServer()
])
</code></pre>

<h3>Promise.allSettled — Tangani Error Sebagian</h3>
<pre><code>const results = await Promise.allSettled([
  fetch('/api/user'),
  fetch('/api/courses'),
  fetch('/api/invalid-endpoint')  // Ini akan gagal
])

results.forEach(result =&gt; {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value)
  } else {
    console.log('Failed:', result.reason)
  }
})
</code></pre>

<h2>Gotcha yang Sering Terjadi</h2>

<h3>Loop Async yang Salah</h3>
<pre><code>const ids = [1, 2, 3, 4, 5]

// ❌ forEach tidak menunggu async callback
ids.forEach(async (id) =&gt; {
  const user = await getUser(id)  // Tidak dijamin berurutan!
})

// ✅ for...of menunggu setiap iterasi
for (const id of ids) {
  const user = await getUser(id)
  console.log(user)
}

// ✅ Atau paralel dengan Promise.all + map
const users = await Promise.all(ids.map(id =&gt; getUser(id)))
</code></pre>`,
        excerpt: 'Penjelasan mendalam tentang async/await di JavaScript. Pelajari evolusi dari callback hingga Promise dan async/await, pattern lanjutan, dan gotcha yang sering terjadi.',
        coverImageUrl: 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=1200',
        tags: 'JavaScript, Async Await, Promise, Tutorial, Web Development',
        status: 'published',
        publishedAt: d(7),
        viewCount: 3742,
        AuthorId: 1,
        createdAt: d(7),
        updatedAt: d(7),
      },
      {
        title: 'SQL untuk Developer: Query yang Wajib Dikuasai',
        slug: 'sql-untuk-developer-query-yang-wajib-dikuasai',
        content: `<h2>Mengapa SQL Masih Relevan di Era NoSQL?</h2>
<p>Di era microservices dan NoSQL database, SQL tetap menjadi skill yang sangat berharga. Mayoritas aplikasi bisnis di Indonesia masih menggunakan database relasional (PostgreSQL, MySQL, MariaDB) untuk menyimpan data transaksional yang membutuhkan konsistensi dan integritas tinggi.</p>
<p>Menguasai SQL dengan baik membedakan developer biasa dari developer yang bisa bekerja dengan data secara efisien dan membuat query yang optimal.</p>

<h2>Query Dasar yang Wajib Hafal</h2>

<h3>SELECT — Mengambil Data</h3>
<pre><code>-- Ambil semua kolom
SELECT * FROM courses;

-- Ambil kolom tertentu
SELECT id, name, price FROM courses;

-- Dengan alias
SELECT name AS nama_kursus, price AS harga FROM courses;

-- Hapus duplikat
SELECT DISTINCT status FROM courses;
</code></pre>

<h3>WHERE — Filter Data</h3>
<pre><code>-- Filter sederhana
SELECT * FROM courses WHERE price &lt; 300000;

-- Kombinasi kondisi
SELECT * FROM courses
WHERE difficulty = 'easy' AND status = 'active';

-- IN — filter multiple nilai
SELECT * FROM courses
WHERE difficulty IN ('easy', 'medium');

-- LIKE — pencarian teks
SELECT * FROM courses
WHERE name LIKE '%JavaScript%';

-- BETWEEN — range nilai
SELECT * FROM courses
WHERE price BETWEEN 200000 AND 500000;

-- NULL check
SELECT * FROM videos WHERE videoUrl IS NULL;
</code></pre>

<h3>ORDER BY dan LIMIT</h3>
<pre><code>-- Urutkan ascending (default)
SELECT * FROM courses ORDER BY price ASC;

-- Urutkan descending, ambil 5 teratas
SELECT * FROM courses
ORDER BY price DESC
LIMIT 5;

-- Pagination
SELECT * FROM courses
ORDER BY createdAt DESC
LIMIT 10 OFFSET 20;  -- Halaman 3 (halaman 1: 0, halaman 2: 10, halaman 3: 20)
</code></pre>

<h2>JOIN — Menggabungkan Tabel</h2>

<h3>INNER JOIN</h3>
<pre><code>-- Kursus beserta nama kategorinya
SELECT c.name AS course, cat.name AS category
FROM "Courses" c
INNER JOIN "Categories" cat ON c."CategoryId" = cat.id;
</code></pre>

<h3>LEFT JOIN</h3>
<pre><code>-- Semua kursus, termasuk yang belum punya video
SELECT c.name, COUNT(v.id) AS total_video
FROM "Courses" c
LEFT JOIN "Videos" v ON v."CourseId" = c.id
GROUP BY c.id, c.name;
</code></pre>

<h3>Multiple JOIN</h3>
<pre><code>-- User beserta kursus yang dibeli
SELECT u.name, c.name AS course, uc."isPaid"
FROM "Users" u
INNER JOIN "UserCourses" uc ON uc."UserId" = u.id
INNER JOIN "Courses" c ON c.id = uc."CourseId"
WHERE u.id = 1;
</code></pre>

<h2>Agregasi — GROUP BY dan Fungsi Agregat</h2>
<pre><code>-- COUNT, SUM, AVG, MIN, MAX
SELECT
  COUNT(*) AS total_courses,
  AVG(price) AS harga_rata_rata,
  MIN(price) AS harga_termurah,
  MAX(price) AS harga_termahal
FROM "Courses"
WHERE status = 'active';

-- GROUP BY — kelompokkan per kategori
SELECT
  cat.name AS kategori,
  COUNT(c.id) AS jumlah_kursus,
  AVG(c.price) AS harga_rata_rata
FROM "Courses" c
INNER JOIN "Categories" cat ON c."CategoryId" = cat.id
GROUP BY cat.id, cat.name
ORDER BY jumlah_kursus DESC;

-- HAVING — filter setelah GROUP BY
SELECT
  "CategoryId",
  COUNT(*) AS total
FROM "Courses"
GROUP BY "CategoryId"
HAVING COUNT(*) > 2;
</code></pre>

<h2>Subquery</h2>
<pre><code>-- Kursus dengan harga di atas rata-rata
SELECT name, price
FROM "Courses"
WHERE price &gt; (SELECT AVG(price) FROM "Courses");

-- Kursus yang belum pernah dibeli
SELECT name FROM "Courses"
WHERE id NOT IN (SELECT DISTINCT "CourseId" FROM "UserCourses");
</code></pre>

<h2>Window Functions (Advanced)</h2>
<pre><code>-- Ranking kursus per kategori berdasarkan harga
SELECT
  name,
  price,
  "CategoryId",
  RANK() OVER (PARTITION BY "CategoryId" ORDER BY price DESC) AS rank_in_category
FROM "Courses";

-- Running total
SELECT
  name,
  price,
  SUM(price) OVER (ORDER BY createdAt) AS running_total
FROM "Courses";
</code></pre>

<h2>Tips Optimasi Query</h2>
<ol>
  <li>Gunakan <code>EXPLAIN ANALYZE</code> untuk melihat query plan</li>
  <li>Buat INDEX pada kolom yang sering difilter</li>
  <li>Hindari <code>SELECT *</code> di production — pilih kolom yang dibutuhkan</li>
  <li>Gunakan <code>LIMIT</code> untuk membatasi jumlah data</li>
  <li>Gunakan prepared statements untuk mencegah SQL injection</li>
</ol>`,
        excerpt: 'Query SQL yang wajib dikuasai developer. Dari SELECT dan WHERE dasar, JOIN, GROUP BY, agregasi, subquery, hingga window functions untuk query data yang efisien.',
        coverImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200',
        tags: 'SQL, PostgreSQL, Database, Tutorial, Backend',
        status: 'published',
        publishedAt: d(6),
        viewCount: 4521,
        AuthorId: 1,
        createdAt: d(6),
        updatedAt: d(6),
      },
      {
        title: 'Vue.js 3 Composition API: Tutorial Lengkap dengan Contoh Nyata',
        slug: 'vuejs-3-composition-api-tutorial-lengkap-contoh-nyata',
        content: `<h2>Mengapa Composition API?</h2>
<p>Vue.js 3 memperkenalkan Composition API sebagai cara baru (dan lebih powerful) untuk mengorganisir logika komponen. Dibandingkan Options API (Vue 2), Composition API memungkinkan kamu mengorganisir kode berdasarkan fitur/logika, bukan berdasarkan opsi (data, methods, computed, dsb).</p>
<p>Hasilnya: kode lebih mudah di-reuse, di-test, dan dipahami — terutama untuk komponen yang kompleks.</p>

<h2>script setup: Sintaks yang Lebih Ringkas</h2>
<pre><code>&lt;!-- Cara lama (Vue 3 + Composition API biasa) --&gt;
&lt;script&gt;
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() =&gt; count.value * 2)
    function increment() { count.value++ }
    return { count, doubled, increment }  // Harus di-return!
  }
}
&lt;/script&gt;

&lt;!-- Cara modern (script setup) — JAUH lebih ringkas --&gt;
&lt;script setup&gt;
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() =&gt; count.value * 2)
function increment() { count.value++ }
// Tidak perlu return! Semua otomatis tersedia di template
&lt;/script&gt;
</code></pre>

<h2>ref vs reactive: Kapan Menggunakan Masing-masing</h2>
<pre><code>&lt;script setup&gt;
import { ref, reactive } from 'vue'

// ref — untuk nilai primitif (string, number, boolean)
const nama = ref('Budi')
const umur = ref(25)
const isLoading = ref(false)

// Akses dan ubah value dengan .value
nama.value = 'Siti'
console.log(nama.value)  // 'Siti'

// reactive — untuk object yang memiliki banyak properti
const form = reactive({
  nama: '',
  email: '',
  password: '',
})

// Tidak perlu .value untuk object
form.nama = 'Budi'
console.log(form.email)
&lt;/script&gt;
</code></pre>

<h2>computed: Nilai Turunan yang Reaktif</h2>
<pre><code>&lt;script setup&gt;
import { ref, computed } from 'vue'

const harga = ref(299000)
const diskon = ref(0.2)  // 20%

const hargaSetelahDiskon = computed(() =&gt; {
  return harga.value * (1 - diskon.value)
})

const formatRupiah = computed(() =&gt; {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(hargaSetelahDiskon.value)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;p&gt;Harga: {{ formatRupiah }}&lt;/p&gt;
&lt;/template&gt;
</code></pre>

<h2>watch dan watchEffect</h2>
<pre><code>&lt;script setup&gt;
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseId = ref(route.params.id)
const course = ref(null)

// watch — pantau perubahan spesifik
watch(courseId, async (newId, oldId) =&gt; {
  console.log(\`ID berubah dari \${oldId} ke \${newId}\`)
  course.value = await fetchCourse(newId)
}, { immediate: true })

// watchEffect — jalankan langsung dan pantau semua dependencies
watchEffect(async () =&gt; {
  // Otomatis tracking: courseId
  course.value = await fetchCourse(courseId.value)
})
&lt;/script&gt;
</code></pre>

<h2>Lifecycle Hooks</h2>
<pre><code>&lt;script setup&gt;
import { onMounted, onUnmounted, onUpdated } from 'vue'

onMounted(() =&gt; {
  console.log('Komponen terpasang ke DOM')
  // Ideal untuk: fetch data awal, setup event listener, init library
})

onUpdated(() =&gt; {
  console.log('Komponen di-render ulang')
})

onUnmounted(() =&gt; {
  console.log('Komponen dihapus dari DOM')
  // Ideal untuk: cleanup event listener, clear interval
})
&lt;/script&gt;
</code></pre>

<h2>Composables: Reuse Logic Antar Komponen</h2>
<pre><code>// composables/useFetch.js
import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(url)
      data.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { data, loading, error, refetch: fetchData }
}

// Penggunaan di komponen
&lt;script setup&gt;
import { useFetch } from '@/composables/useFetch'

const { data: courses, loading, error } = useFetch('/api/courses')
&lt;/script&gt;
</code></pre>

<h2>Props dan Emit</h2>
<pre><code>&lt;script setup&gt;
// defineProps dan defineEmits adalah compiler macros
// Tidak perlu import!
const props = defineProps({
  courseId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: 'Untitled',
  },
})

const emit = defineEmits(['enroll', 'close'])

function handleEnroll() {
  emit('enroll', props.courseId)
}
&lt;/script&gt;
</code></pre>`,
        excerpt: 'Tutorial lengkap Vue.js 3 Composition API dengan script setup. Pelajari ref, reactive, computed, watch, lifecycle hooks, composables, dan cara membangun komponen yang reusable.',
        coverImageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200',
        tags: 'Vue.js, Composition API, Tutorial, JavaScript, Frontend',
        status: 'published',
        publishedAt: d(5),
        viewCount: 4891,
        AuthorId: 1,
        createdAt: d(5),
        updatedAt: d(5),
      },
      {
        title: 'Node.js dan Express: Membangun REST API dari Nol',
        slug: 'nodejs-express-membangun-rest-api-dari-nol',
        content: `<h2>Mengapa Node.js untuk Backend?</h2>
<p>Node.js memungkinkan kamu menggunakan JavaScript untuk backend — satu bahasa untuk frontend dan backend. Dengan model event-driven non-blocking I/O, Node.js sangat efisien untuk aplikasi yang banyak melakukan operasi I/O seperti API yang sering query database atau memanggil external service.</p>
<p>Perusahaan besar seperti Netflix, LinkedIn, dan Shopee menggunakan Node.js di infrastruktur backend mereka.</p>

<h2>Setup Project</h2>
<pre><code>mkdir bimble-api
cd bimble-api
npm init -y

# Install dependencies
npm install express sequelize pg pg-hstore bcryptjs jsonwebtoken cors dotenv

# Install dev dependencies
npm install -D nodemon
</code></pre>

<h2>Struktur Folder yang Terorganisir</h2>
<pre><code>bimble-api/
├── src/
│   ├── config/
│   │   └── config.json        # Database config
│   ├── controllers/
│   │   ├── public/
│   │   │   └── CourseController.js
│   │   └── admin/
│   │       └── CourseController.js
│   ├── middlewares/
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── index.js
│   │   └── course.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── publicRouter.js
│   │   └── adminRouter.js
│   ├── app.js
│   └── server.js
├── migrations/
├── seeders/
├── .env
└── package.json
</code></pre>

<h2>app.js: Setup Express</h2>
<pre><code>const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

module.exports = app
</code></pre>

<h2>Membuat Controller</h2>
<pre><code>// controllers/public/CourseController.js
const { Course, Category } = require('../../models')

class CourseController {
  static async getAll(req, res, next) {
    try {
      const { search, category, difficulty, page = 1, limit = 12 } = req.query
      const where = { status: 'active' }

      if (search) where.name = { [Op.iLike]: \`%\${search}%\` }
      if (difficulty) where.difficulty = difficulty

      const offset = (page - 1) * limit

      const { count, rows } = await Course.findAndCountAll({
        where,
        include: [{ model: Category }],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']],
      })

      res.json({
        courses: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        totalItems: count,
      })
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const course = await Course.findByPk(req.params.id, {
        include: [{ model: Category }, { model: Video }],
      })
      if (!course) throw { name: 'CourseNotFound' }
      res.json(course)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CourseController
</code></pre>

<h2>Authentication Middleware dengan JWT</h2>
<pre><code>// middlewares/authentication.js
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) throw { name: 'Unauthorized' }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id)
    if (!user) throw { name: 'Unauthorized' }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication
</code></pre>

<h2>Error Handler Middleware</h2>
<pre><code>// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err)

  const errors = {
    SequelizeValidationError: [400, err.errors?.[0]?.message],
    SequelizeUniqueConstraintError: [400, err.errors?.[0]?.message],
    InvalidCredentials: [401, 'Email atau password salah'],
    Unauthorized: [401, 'Silakan login terlebih dahulu'],
    JsonWebTokenError: [401, 'Token tidak valid'],
    TokenExpiredError: [401, 'Token kedaluwarsa, silakan login ulang'],
    Forbidden: [403, 'Anda tidak memiliki izin'],
    CourseNotFound: [404, 'Kursus tidak ditemukan'],
  }

  const [status, message] = errors[err.name] ?? [500, 'Internal server error']
  res.status(status).json({ message })
}

module.exports = errorHandler
</code></pre>

<h2>Validasi Input yang Aman</h2>
<pre><code>// Selalu validasi di level model/controller, bukan hanya di frontend
const { body, validationResult } = require('express-validator')

const validateCourse = [
  body('name').trim().notEmpty().withMessage('Nama kursus wajib diisi'),
  body('price').isInt({ min: 0 }).withMessage('Harga harus angka positif'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Difficulty tidak valid'),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]
</code></pre>`,
        excerpt: 'Tutorial membangun REST API dengan Node.js dan Express dari nol. Mencakup struktur proyek, controller, middleware authentication JWT, error handling, dan validasi input yang aman.',
        coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
        tags: 'Node.js, Express, REST API, Backend, Tutorial',
        status: 'published',
        publishedAt: d(4),
        viewCount: 5123,
        AuthorId: 1,
        createdAt: d(4),
        updatedAt: d(4),
      },
      {
        title: 'Roadmap Belajar Data Science untuk Pemula Indonesia 2024',
        slug: 'roadmap-belajar-data-science-pemula-indonesia-2024',
        content: `<h2>Data Science: Karir Masa Depan yang Menjanjikan</h2>
<p>Data Science adalah salah satu karir paling dicari dan bergaji tertinggi di industri teknologi global — dan Indonesia sedang mengalami boom transformasi digital yang membutuhkan banyak data scientist.</p>
<p>Menurut LinkedIn Jobs Report 2024, Data Scientist masuk dalam 10 besar pekerjaan dengan pertumbuhan tercepat, dengan median gaji Rp 15-30 juta per bulan untuk level mid di Indonesia.</p>

<h2>Roadmap Belajar Data Science (12-18 Bulan)</h2>

<h3>Bulan 1-3: Fondasi</h3>
<ul>
  <li><strong>Python</strong> — Bahasa utama data science. Kuasai sintaks dasar, OOP, dan ekosistem library.</li>
  <li><strong>Matematika & Statistik</strong> — Statistik deskriptif, distribusi probabilitas, uji hipotesis, aljabar linear dasar.</li>
  <li><strong>SQL</strong> — Hampir semua data scientist bekerja dengan database. Kuasai query, join, dan agregasi.</li>
</ul>

<h3>Bulan 4-6: Tools Data Science</h3>
<ul>
  <li><strong>NumPy</strong> — Komputasi numerik dan array multidimensi.</li>
  <li><strong>Pandas</strong> — Manipulasi dan analisis data tabular.</li>
  <li><strong>Matplotlib & Seaborn</strong> — Visualisasi data untuk eksplorasi dan presentasi.</li>
  <li><strong>Jupyter Notebook</strong> — Environment interaktif untuk analisis data.</li>
</ul>

<h3>Bulan 7-10: Machine Learning</h3>
<ul>
  <li><strong>Scikit-learn</strong> — Library ML utama Python. Regresi, klasifikasi, clustering.</li>
  <li><strong>Supervised Learning</strong> — Linear regression, logistic regression, decision tree, random forest, SVM.</li>
  <li><strong>Unsupervised Learning</strong> — K-means clustering, PCA.</li>
  <li><strong>Model Evaluation</strong> — Cross-validation, confusion matrix, ROC-AUC.</li>
  <li><strong>Feature Engineering</strong> — Teknik membuat fitur yang lebih informatif.</li>
</ul>

<h3>Bulan 11-14: Deep Learning</h3>
<ul>
  <li><strong>Neural Network</strong> — Perceptron, backpropagation, activation functions.</li>
  <li><strong>TensorFlow atau PyTorch</strong> — Framework deep learning. PyTorch lebih populer di research.</li>
  <li><strong>CNN</strong> — Convolutional Neural Network untuk computer vision.</li>
  <li><strong>RNN/LSTM</strong> — Untuk data sekuensial dan time series.</li>
  <li><strong>Transfer Learning</strong> — Fine-tuning model pre-trained (BERT, ResNet, dll).</li>
</ul>

<h3>Bulan 15-18: MLOps & Production</h3>
<ul>
  <li><strong>FastAPI</strong> — Serve model ML sebagai REST API.</li>
  <li><strong>Docker</strong> — Containerisasi model untuk deployment.</li>
  <li><strong>MLflow</strong> — Tracking eksperimen dan versioning model.</li>
  <li><strong>Cloud ML</strong> — AWS SageMaker, Google Vertex AI, atau Azure ML.</li>
</ul>

<h2>Dataset untuk Latihan</h2>
<ul>
  <li><strong>Kaggle</strong> — Kompetisi dan dataset terlengkap untuk semua level</li>
  <li><strong>UCI ML Repository</strong> — Dataset klasik untuk latihan algoritma</li>
  <li><strong>data.go.id</strong> — Data terbuka dari pemerintah Indonesia</li>
  <li><strong>BPS (Badan Pusat Statistik)</strong> — Data statistik Indonesia</li>
</ul>

<h2>Proyek Portfolio Data Science</h2>
<ol>
  <li><strong>Analisis Data E-Commerce Indonesia</strong> — Analisis tren penjualan, segmentasi pelanggan</li>
  <li><strong>Prediksi Harga Properti Jakarta</strong> — Regression dengan data Rumah123</li>
  <li><strong>Klasifikasi Sentimen Ulasan Produk</strong> — NLP dengan data Tokopedia/Shopee</li>
  <li><strong>Prediksi Churn Pelanggan</strong> — Bisnis kasus yang relevan untuk perusahaan Indonesia</li>
  <li><strong>Analisis COVID-19 di Indonesia</strong> — Visualisasi dan modeling dengan data publik</li>
</ol>

<h2>Komunitas Data Science Indonesia</h2>
<ul>
  <li>Data Science Indonesia (DSI) — komunitas terbesar</li>
  <li>Indonesia AI — grup Facebook aktif</li>
  <li>IYKRA — bootcamp dan komunitas data science</li>
  <li>Kaggle Days Indonesia — event kompetisi ML</li>
</ul>`,
        excerpt: 'Roadmap lengkap belajar data science untuk pemula di Indonesia. Dari Python dan statistik dasar hingga machine learning, deep learning, dan MLOps dalam 12-18 bulan.',
        coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
        tags: 'Data Science, Machine Learning, Python, Roadmap, Karir',
        status: 'published',
        publishedAt: d(3),
        viewCount: 6789,
        AuthorId: 1,
        createdAt: d(3),
        updatedAt: d(3),
      },
      {
        title: 'Pinia vs Vuex: State Management Terbaik untuk Vue.js 3',
        slug: 'pinia-vs-vuex-state-management-terbaik-vuejs-3',
        content: `<h2>Apa itu State Management?</h2>
<p>Dalam aplikasi Vue.js yang besar, data sering perlu dibagikan antar komponen yang tidak memiliki relasi parent-child langsung. State management library menyediakan "toko" terpusat untuk semua data aplikasi, sehingga setiap komponen bisa mengaksesnya tanpa prop drilling yang membingungkan.</p>

<h2>Sejarah Singkat</h2>
<p>Vuex adalah library state management resmi Vue.js selama bertahun-tahun. Namun, dengan Vue.js 3 dan Composition API, muncul Pinia — library yang lebih ringan, intuitif, dan didukung penuh sebagai solusi resmi baru oleh tim Vue.</p>

<h2>Perbandingan Sintaks</h2>

<h3>Mendefinisikan Store</h3>
<pre><code>// Vuex (cara lama)
import { createStore } from 'vuex'

export default createStore({
  state: {
    courses: [],
    user: null,
    isLoading: false,
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses
    },
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    async fetchCourses({ commit }) {
      const response = await api.get('/courses')
      commit('SET_COURSES', response.data)
    },
  },
  getters: {
    paidCourses: (state) =&gt; state.courses.filter(c =&gt; c.isPaid),
  },
})

// Pinia (cara modern)
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useCourseStore = defineStore('courses', {
  state: () =&gt; ({
    courses: [],
    isLoading: false,
  }),
  getters: {
    paidCourses: (state) =&gt; state.courses.filter(c =&gt; c.isPaid),
  },
  actions: {
    async fetchCourses() {
      this.isLoading = true
      try {
        const { data } = await api.get('/courses')
        this.courses = data
      } finally {
        this.isLoading = false
      }
    },
  },
})
</code></pre>

<h3>Penggunaan di Komponen</h3>
<pre><code>// Dengan Vuex
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()
const courses = computed(() =&gt; store.state.courses)
const isLoading = computed(() =&gt; store.state.isLoading)
onMounted(() =&gt; store.dispatch('fetchCourses'))

// Dengan Pinia — JAUH lebih simpel
import { useCourseStore } from '@/stores/courses'

const courseStore = useCourseStore()
onMounted(() =&gt; courseStore.fetchCourses())
// Akses langsung: courseStore.courses, courseStore.isLoading
</code></pre>

<h2>Pinia dengan setup() Syntax (lebih fleksibel)</h2>
<pre><code>// stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/lib/axios'

export const useAuthStore = defineStore('auth', () =&gt; {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  // Getters
  const isLoggedIn = computed(() =&gt; !!token.value)
  const isAdmin = computed(() =&gt; user.value?.role === 'Admin')

  // Actions
  async function login(credentials) {
    const { data } = await api.post('/public/login', credentials)
    token.value = data.access_token
    user.value = data.user
    localStorage.setItem('token', data.access_token)
    api.defaults.headers.common['Authorization'] = \`Bearer \${data.access_token}\`
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  return { user, token, isLoggedIn, isAdmin, login, logout }
})
</code></pre>

<h2>Kesimpulan: Gunakan Pinia</h2>
<p>Pinia adalah pilihan yang jelas untuk proyek Vue.js 3 baru:</p>
<ul>
  <li>Sintaks lebih sederhana dan intuitif</li>
  <li>TypeScript support yang excellent</li>
  <li>DevTools yang lebih baik</li>
  <li>Tidak ada mutations — cukup actions</li>
  <li>Dukungan resmi dari tim Vue</li>
  <li>Bundle size lebih kecil (1kb gzip)</li>
</ul>`,
        excerpt: 'Perbandingan Pinia vs Vuex untuk state management di Vue.js 3. Pelajari perbedaan sintaks, kapan menggunakan masing-masing, dan mengapa Pinia adalah pilihan terbaik untuk proyek baru.',
        coverImageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200',
        tags: 'Vue.js, Pinia, Vuex, State Management, Tutorial',
        status: 'published',
        publishedAt: d(2),
        viewCount: 2987,
        AuthorId: 1,
        createdAt: d(2),
        updatedAt: d(2),
      },
      {
        title: 'Cara Deploy Aplikasi Node.js ke Railway: Panduan Lengkap',
        slug: 'cara-deploy-aplikasi-nodejs-ke-railway-panduan-lengkap',
        content: `<h2>Mengapa Railway?</h2>
<p>Railway adalah platform cloud modern yang memudahkan deployment aplikasi web tanpa perlu konfigurasi server yang rumit. Cocok untuk developer yang ingin fokus pada kode, bukan infrastruktur. Railway menawarkan free tier yang cukup untuk proyek personal dan portfolio.</p>

<h2>Persiapan Aplikasi Node.js</h2>
<pre><code>// Pastikan package.json memiliki script start
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
</code></pre>

<pre><code>// server.js — gunakan PORT dari environment
const PORT = process.env.PORT || 3000

app.listen(PORT, () =&gt; {
  console.log(\`Server berjalan di port \${PORT}\`)
})
</code></pre>

<h2>Langkah Deploy ke Railway</h2>

<h3>1. Push Kode ke GitHub</h3>
<pre><code>git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/nama-repo.git
git push -u origin main
</code></pre>

<h3>2. Buat Project di Railway</h3>
<ol>
  <li>Kunjungi railway.app dan login dengan GitHub</li>
  <li>Klik "New Project" → "Deploy from GitHub repo"</li>
  <li>Pilih repository yang ingin di-deploy</li>
  <li>Railway akan otomatis mendeteksi Node.js dan mulai build</li>
</ol>

<h3>3. Tambahkan Database PostgreSQL</h3>
<ol>
  <li>Di dashboard project, klik "New" → "Database" → "Add PostgreSQL"</li>
  <li>Railway akan membuat database dan menyediakan CONNECTION_URL otomatis</li>
  <li>Klik "Variables" di service PostgreSQL untuk melihat credentials</li>
</ol>

<h3>4. Konfigurasi Environment Variables</h3>
<pre><code># Di Railway dashboard → Service → Variables
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-key-yang-panjang-dan-aman
NODE_ENV=production
</code></pre>

<h3>5. Jalankan Migrasi</h3>
<pre><code># Di Railway, buka terminal service dan jalankan:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
</code></pre>

<h2>Konfigurasi Database untuk Production</h2>
<pre><code>// src/config/config.json atau config.js
"production": {
  "use_env_variable": "DATABASE_URL",
  "dialect": "postgres",
  "dialectOptions": {
    "ssl": {
      "require": true,
      "rejectUnauthorized": false
    }
  }
}
</code></pre>

<h2>Custom Domain</h2>
<ol>
  <li>Di Railway, pergi ke Settings → Networking → Custom Domain</li>
  <li>Masukkan domain kamu (contoh: api.bimble.id)</li>
  <li>Tambahkan CNAME record di DNS provider yang mengarah ke URL Railway</li>
  <li>Railway akan otomatis menyediakan SSL certificate</li>
</ol>

<h2>Tips Production</h2>
<ul>
  <li>Selalu set NODE_ENV=production untuk mengaktifkan optimasi</li>
  <li>Jangan hardcode credentials — selalu gunakan environment variables</li>
  <li>Setup health check endpoint (<code>GET /health</code>) untuk monitoring</li>
  <li>Aktifkan logging yang proper (winston atau pino)</li>
  <li>Monitor usage di Railway dashboard agar tidak melebihi free tier</li>
</ul>`,
        excerpt: 'Tutorial lengkap cara deploy aplikasi Node.js ke Railway dengan PostgreSQL. Dari persiapan kode, setup database, konfigurasi environment variables, hingga custom domain dengan SSL.',
        coverImageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200',
        tags: 'Node.js, Deploy, Railway, PostgreSQL, DevOps',
        status: 'published',
        publishedAt: d(1),
        viewCount: 3214,
        AuthorId: 1,
        createdAt: d(1),
        updatedAt: d(1),
      },
      {
        title: 'Pengenalan Machine Learning: Konsep Dasar yang Wajib Dipahami',
        slug: 'pengenalan-machine-learning-konsep-dasar-wajib-dipahami',
        content: `<h2>Apa itu Machine Learning?</h2>
<p>Machine Learning (ML) adalah cabang kecerdasan buatan di mana komputer belajar dari data tanpa diprogram secara eksplisit. Alih-alih membuat aturan manual, kita memberikan data kepada algoritma dan membiarkannya menemukan pola sendiri.</p>
<p>Contoh nyata: filter spam email tidak memiliki aturan "jika email berisi kata 'menang' dan 'hadiah' maka itu spam". Sebaliknya, ia belajar dari ribuan email yang sudah dilabeli spam/bukan-spam dan menemukan polanya sendiri.</p>

<h2>Tiga Jenis Machine Learning</h2>

<h3>1. Supervised Learning</h3>
<p>Model belajar dari data yang sudah berlabel (ada jawaban yang benar). Seperti murid yang belajar dari buku jawaban.</p>
<ul>
  <li><strong>Regresi</strong> — Prediksi nilai kontinu. Contoh: prediksi harga rumah, prediksi suhu.</li>
  <li><strong>Klasifikasi</strong> — Prediksi kategori. Contoh: spam/bukan-spam, deteksi fraud, klasifikasi gambar.</li>
</ul>

<h3>2. Unsupervised Learning</h3>
<p>Model menemukan pola dari data yang tidak berlabel. Seperti murid yang mencari pola sendiri tanpa panduan.</p>
<ul>
  <li><strong>Clustering</strong> — Mengelompokkan data serupa. Contoh: segmentasi pelanggan, pengelompokan artikel.</li>
  <li><strong>Dimensionality Reduction</strong> — Menyederhanakan data. Contoh: PCA untuk visualisasi data berdimensi tinggi.</li>
</ul>

<h3>3. Reinforcement Learning</h3>
<p>Agent belajar melalui trial and error dengan reward dan punishment. Contoh: game AI, robot, self-driving car.</p>

<h2>Istilah Penting Machine Learning</h2>
<ul>
  <li><strong>Features (X)</strong> — Input variabel yang digunakan untuk prediksi</li>
  <li><strong>Label/Target (y)</strong> — Output yang ingin diprediksi</li>
  <li><strong>Training set</strong> — Data untuk melatih model (biasanya 80%)</li>
  <li><strong>Test set</strong> — Data untuk evaluasi model (biasanya 20%)</li>
  <li><strong>Overfitting</strong> — Model terlalu "hafal" data training, buruk di data baru</li>
  <li><strong>Underfitting</strong> — Model terlalu sederhana, tidak bisa menangkap pola</li>
  <li><strong>Hyperparameter</strong> — Parameter yang di-set sebelum training (bukan dipelajari dari data)</li>
</ul>

<h2>Contoh Implementasi dengan Scikit-learn</h2>
<pre><code>import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 1. Load data
df = pd.read_csv('data_pelanggan.csv')

# 2. Pisahkan features dan target
X = df[['umur', 'pendapatan', 'lama_berlangganan', 'jumlah_transaksi']]
y = df['churn']  # 0 = tidak churn, 1 = churn

# 3. Split training dan test set
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Normalisasi fitur
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# 5. Buat dan latih model
model = LogisticRegression()
model.fit(X_train, y_train)

# 6. Evaluasi model
y_pred = model.predict(X_test)
print(f"Akurasi: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred))
</code></pre>

<h2>Algoritma ML yang Paling Umum</h2>
<ul>
  <li><strong>Linear/Logistic Regression</strong> — Sederhana, interpreable, baik untuk baseline</li>
  <li><strong>Decision Tree</strong> — Mudah dipahami, rentan overfitting</li>
  <li><strong>Random Forest</strong> — Ensemble decision trees, sangat andal</li>
  <li><strong>Gradient Boosting (XGBoost, LightGBM)</strong> — State-of-the-art untuk tabular data</li>
  <li><strong>Support Vector Machine</strong> — Efektif untuk high-dimensional data</li>
  <li><strong>K-Nearest Neighbors</strong> — Sederhana, bagus untuk klasifikasi</li>
  <li><strong>Neural Network</strong> — Powerful untuk data kompleks (gambar, teks, suara)</li>
</ul>`,
        excerpt: 'Pengenalan machine learning untuk pemula. Pelajari konsep dasar supervised, unsupervised, dan reinforcement learning, istilah penting, dan implementasi pertama dengan Scikit-learn Python.',
        coverImageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200',
        tags: 'Machine Learning, AI, Python, Data Science, Tutorial',
        status: 'published',
        publishedAt: d(0),
        viewCount: 4567,
        AuthorId: 1,
        createdAt: d(0),
        updatedAt: d(0),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    // Only delete articles created by this seeder (based on slug)
    const slugs = [
      'cara-kerja-async-await-javascript-panduan-mendalam',
      'sql-untuk-developer-query-yang-wajib-dikuasai',
      'vuejs-3-composition-api-tutorial-lengkap-contoh-nyata',
      'nodejs-express-membangun-rest-api-dari-nol',
      'roadmap-belajar-data-science-pemula-indonesia-2024',
      'pinia-vs-vuex-state-management-terbaik-vuejs-3',
      'cara-deploy-aplikasi-nodejs-ke-railway-panduan-lengkap',
      'pengenalan-machine-learning-konsep-dasar-wajib-dipahami',
    ]
    await queryInterface.bulkDelete('Articles', { slug: slugs }, {})
  },
}
