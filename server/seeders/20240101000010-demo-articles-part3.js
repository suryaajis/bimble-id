'use strict'

const now = new Date()
const d = (daysAgo) => new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Cybersecurity untuk Developer: Lindungi Aplikasimu dari Serangan',
        slug: 'cybersecurity-untuk-developer-lindungi-aplikasi-dari-serangan',
        content: `<h2>Mengapa Developer Harus Peduli Keamanan?</h2>
<p>Keamanan aplikasi adalah tanggung jawab setiap developer, bukan hanya tim security khusus. Kebocoran data, SQL injection, dan XSS adalah ancaman nyata yang bisa menghancurkan reputasi perusahaan dan merugikan pengguna. Di Indonesia, kasus kebocoran data semakin sering terjadi dan BSSN (Badan Siber dan Sandi Negara) mencatat peningkatan signifikan insiden siber setiap tahunnya.</p>

<h2>OWASP Top 10: Ancaman Utama Aplikasi Web</h2>

<h3>1. Broken Access Control</h3>
<p>Pengguna bisa mengakses resource yang bukan haknya.</p>
<pre><code>// ❌ Rentan: User bisa ganti ID di URL
GET /api/users/123/profile

// ✅ Aman: Gunakan ID dari token JWT
const profile = await User.findByPk(req.user.id)  // Bukan dari params!
</code></pre>

<h3>2. SQL Injection</h3>
<p>Attacker menyisipkan SQL berbahaya melalui input user.</p>
<pre><code>// ❌ SANGAT BERBAHAYA
const query = \`SELECT * FROM users WHERE email = '\${req.body.email}'\`
// Jika email = "' OR '1'='1" → query bocor semua data!

// ✅ Gunakan parameterized query atau ORM
const user = await User.findOne({ where: { email: req.body.email } })
// Sequelize otomatis escape input
</code></pre>

<h3>3. Cross-Site Scripting (XSS)</h3>
<p>Attacker menyisipkan JavaScript berbahaya yang dieksekusi di browser pengguna lain.</p>
<pre><code>// ❌ Rentan jika data user ditampilkan tanpa sanitasi
innerHTML = userInput  // Bisa berisi &lt;script&gt;alert('XSS')&lt;/script&gt;

// ✅ Gunakan textContent atau library sanitasi
element.textContent = userInput  // HTML entities otomatis di-escape

// Atau gunakan library DOMPurify untuk rich text
import DOMPurify from 'dompurify'
element.innerHTML = DOMPurify.sanitize(userInput)
</code></pre>

<h3>4. Insecure Direct Object Reference (IDOR)</h3>
<pre><code>// ❌ Rentan: user bisa ubah courseId ke milik orang lain
router.get('/courses/:courseId/videos', async (req, res) => {
  const videos = await Video.findAll({ where: { CourseId: req.params.courseId } })
  res.json(videos)
})

// ✅ Aman: verifikasi kepemilikan
router.get('/courses/:courseId/videos', authentication, async (req, res, next) => {
  try {
    const userCourse = await UserCourse.findOne({
      where: { UserId: req.user.id, CourseId: req.params.courseId, isPaid: true }
    })
    if (!userCourse) throw { name: 'Forbidden' }
    const videos = await Video.findAll({ where: { CourseId: req.params.courseId } })
    res.json(videos)
  } catch (err) { next(err) }
})
</code></pre>

<h2>Password Security</h2>
<pre><code>const bcrypt = require('bcryptjs')

// Hashing password
const salt = await bcrypt.genSalt(12)  // Cost factor 12 (lambat tapi aman)
const hashedPassword = await bcrypt.hash(password, salt)

// Verifikasi password
const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
</code></pre>

<h2>JWT Security Best Practices</h2>
<pre><code>// Gunakan secret yang kuat dan panjang
const JWT_SECRET = process.env.JWT_SECRET
// Minimal 32 karakter random, simpan di environment variable!

// Set expiry yang masuk akal
const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })

// Jangan simpan data sensitif di payload JWT
// JWT bisa di-decode tanpa secret! Isi hanya ID.
// ❌ { id: 1, email: '...', role: 'Admin', password: '...' }
// ✅ { id: 1, role: 'Admin' }
</code></pre>

<h2>Rate Limiting: Cegah Brute Force</h2>
<pre><code>const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 menit
  max: 5,  // Maksimal 5 percobaan per IP
  message: { message: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' }
})

router.post('/login', loginLimiter, UserController.login)
</code></pre>

<h2>Environment Variables yang Aman</h2>
<pre><code># .env — JANGAN commit ke Git!
DATABASE_URL=postgresql://...
JWT_SECRET=minimal-32-karakter-random-string
XENDIT_SECRET_KEY=xnd_production_...

# .gitignore — pastikan .env masuk!
.env
.env.local
.env.production
</code></pre>`,
        excerpt: 'Panduan keamanan aplikasi web untuk developer. Pelajari OWASP Top 10, SQL injection, XSS, IDOR, best practices JWT, rate limiting, dan cara melindungi aplikasimu dari serangan.',
        coverImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
        tags: 'Cybersecurity, Keamanan, OWASP, Node.js, Tutorial',
        status: 'published',
        publishedAt: d(35),
        viewCount: 5432,
        AuthorId: 1,
        createdAt: d(35),
        updatedAt: d(35),
      },
      {
        title: 'Cara Membaca Error JavaScript: Debug Lebih Cepat dan Efisien',
        slug: 'cara-membaca-error-javascript-debug-lebih-cepat-efisien',
        content: `<h2>Mengapa Skill Debugging Penting?</h2>
<p>Developer profesional menghabiskan hampir 50% waktunya untuk debugging — menemukan dan memperbaiki bug. Semakin cepat kamu bisa membaca dan memahami error message, semakin produktif kamu sebagai developer. Artikel ini mengajarkan cara membaca berbagai jenis error di JavaScript dan strategi debugging yang efektif.</p>

<h2>Tipe-Tipe Error JavaScript</h2>

<h3>SyntaxError — Kode Tidak Bisa Di-parse</h3>
<pre><code>// Error
SyntaxError: Unexpected token '}'

// Penyebab biasanya:
// - Kurung kurawal tidak seimbang
// - Koma yang hilang di object
// - Keyword yang salah eja
const obj = {
  name: "Budi"
  age: 25,  // ← Koma hilang sebelum baris ini!
}
</code></pre>

<h3>ReferenceError — Variabel Tidak Ditemukan</h3>
<pre><code>// Error
ReferenceError: namaKursus is not defined

// Penyebab:
// - Typo nama variabel
// - Variabel digunakan sebelum dideklarasikan
// - Scope issue (variabel di dalam fungsi dipanggil dari luar)
console.log(namaKursus)  // ← namaKursus belum dideklarasikan
</code></pre>

<h3>TypeError — Tipe Data Salah</h3>
<pre><code>// Error yang paling sering ditemui!
TypeError: Cannot read properties of undefined (reading 'name')

// Penyebab: data.name dipanggil tapi data = undefined
const data = await fetchUser()  // Mungkin return undefined jika error
console.log(data.name)  // ← Crash karena data undefined!

// Fix: optional chaining
console.log(data?.name)  // undefined, tidak crash

// TypeError lain
TypeError: courses.map is not a function
// Penyebab: courses bukan array!
// Cek nilai courses sebelum memanggil .map()
console.log(typeof courses, Array.isArray(courses))
</code></pre>

<h3>Promise Rejection yang Tidak Ditangani</h3>
<pre><code>// Warning di console:
UnhandledPromiseRejectionWarning: Error: Network Error

// Penyebab: await tanpa try/catch atau .catch()
const data = await fetch('/api')  // Jika network error → crash!

// Fix: selalu tangani error async
try {
  const data = await fetch('/api')
} catch (err) {
  console.error('Gagal fetch:', err.message)
}
</code></pre>

<h2>Membaca Stack Trace</h2>
<pre><code>Error: Course not found
    at CourseController.getById (server/src/controllers/CourseController.js:23:13)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:137:13)
    ...

// Cara membaca stack trace:
// 1. Baris pertama: tipe error dan pesannya
// 2. Baris "at": call stack dari atas = yang paling baru
// 3. Fokus pada file KAMU (bukan node_modules)
// 4. File:baris:kolom → langsung ke sana!
// → server/src/controllers/CourseController.js baris 23
</code></pre>

<h2>Tools Debugging yang Wajib Diketahui</h2>

<h3>console yang Lebih dari Sekedar log</h3>
<pre><code>console.log('Data:', data)        // Output biasa
console.error('Error!', err)      // Merah di console
console.warn('Warning:', val)     // Kuning
console.table(arrayOfObjects)     // Tabel yang rapi
console.time('fetchData')
// ... operasi
console.timeEnd('fetchData')      // Tampilkan durasi
console.trace()                   // Print call stack saat ini
console.group('User Data')
  console.log(user)
console.groupEnd()
</code></pre>

<h3>debugger Statement</h3>
<pre><code>async function processOrder(orderId) {
  const order = await getOrder(orderId)
  debugger  // ← Browser/Node akan pause di sini!
  // Sekarang kamu bisa inspect semua variabel di DevTools
  const result = await processPayment(order)
  return result
}
</code></pre>

<h2>Strategi Debugging yang Efektif</h2>
<ol>
  <li><strong>Baca error message dengan teliti</strong> — biasanya memberikan petunjuk jelas</li>
  <li><strong>Isolasi masalah</strong> — sederhanakan kode sampai error bisa direproduksi</li>
  <li><strong>Cek asumsi</strong> — console.log nilai variabel yang kamu anggap "pasti benar"</li>
  <li><strong>Binary search</strong> — tambahkan log di tengah kode, sempit terus lokasi bug</li>
  <li><strong>Cari di Google/Stack Overflow</strong> — copy error message dan cari solusi</li>
  <li><strong>Rubber duck debugging</strong> — jelaskan masalahmu ke orang lain (atau bebek karet)</li>
</ol>`,
        excerpt: 'Panduan lengkap membaca dan memahami error message di JavaScript. Pelajari jenis-jenis error, cara membaca stack trace, tools debugging, dan strategi menemukan bug dengan efisien.',
        coverImageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200',
        tags: 'JavaScript, Debugging, Tutorial, Tips, Developer',
        status: 'published',
        publishedAt: d(40),
        viewCount: 6123,
        AuthorId: 1,
        createdAt: d(40),
        updatedAt: d(40),
      },
      {
        title: 'Belajar HTML & CSS dari Nol: Fondasi Web Development',
        slug: 'belajar-html-css-dari-nol-fondasi-web-development',
        content: `<h2>HTML dan CSS: Fondasi Setiap Website</h2>
<p>Setiap website yang kamu lihat di internet dibangun di atas HTML dan CSS. HTML (HyperText Markup Language) mendefinisikan struktur dan konten, sementara CSS (Cascading Style Sheets) mengatur tampilan dan layout. Menguasai keduanya adalah langkah pertama yang mutlak dalam perjalanan menjadi web developer.</p>

<h2>HTML: Struktur Halaman Web</h2>

<h3>Dokumen HTML Dasar</h3>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="id"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;meta name="description" content="Belajar web development di Bimble ID"&gt;
  &lt;title&gt;Bimble ID - Platform Belajar Coding&lt;/title&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;nav&gt;...&lt;/nav&gt;
  &lt;/header&gt;

  &lt;main&gt;
    &lt;section class="hero"&gt;
      &lt;h1&gt;Belajar Coding Bersama Bimble&lt;/h1&gt;
      &lt;p&gt;Be Smart, Be Humble.&lt;/p&gt;
      &lt;a href="/courses" class="btn-primary"&gt;Mulai Belajar&lt;/a&gt;
    &lt;/section&gt;
  &lt;/main&gt;

  &lt;footer&gt;...&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h3>HTML Semantik</h3>
<p>Gunakan tag yang bermakna (semantik) bukan hanya div:</p>
<ul>
  <li><code>&lt;header&gt;</code> — Bagian atas halaman atau section</li>
  <li><code>&lt;nav&gt;</code> — Navigasi utama</li>
  <li><code>&lt;main&gt;</code> — Konten utama halaman (hanya satu per halaman)</li>
  <li><code>&lt;article&gt;</code> — Konten yang berdiri sendiri (post, berita)</li>
  <li><code>&lt;section&gt;</code> — Bagian tematik konten</li>
  <li><code>&lt;aside&gt;</code> — Konten sampingan (sidebar)</li>
  <li><code>&lt;footer&gt;</code> — Bagian bawah halaman atau section</li>
</ul>

<h2>CSS: Menghias dan Layout Halaman</h2>

<h3>Cara Menulis CSS</h3>
<pre><code>/* Selector berbagai jenis */
h1 { color: #2563eb; }              /* Tag selector */
.btn-primary { background: blue; }  /* Class selector */
#hero { height: 100vh; }            /* ID selector (hindari!) */
a:hover { text-decoration: underline; } /* Pseudo-class */

/* Specificity: ID > Class > Tag */
</code></pre>

<h3>Box Model</h3>
<pre><code>.card {
  /* Dari luar ke dalam: margin → border → padding → content */
  margin: 16px;       /* Jarak dengan elemen lain */
  border: 1px solid #e5e7eb;
  padding: 24px;      /* Jarak konten dengan border */
  width: 300px;

  /* box-sizing: border-box — width menjadi ukuran total (termasuk padding & border) */
  box-sizing: border-box;
}
</code></pre>

<h3>Flexbox: Layout Satu Dimensi</h3>
<pre><code>.navbar {
  display: flex;
  justify-content: space-between;  /* Atur sumbu utama (horizontal) */
  align-items: center;             /* Atur sumbu silang (vertikal) */
  gap: 16px;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex: 1;
  min-width: 280px;
}
</code></pre>

<h3>CSS Grid: Layout Dua Dimensi</h3>
<pre><code>.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 kolom sama lebar */
  gap: 24px;
}

/* Responsive: 1 kolom di mobile, 2 di tablet, 3 di desktop */
@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</code></pre>

<h2>Responsive Design: Mobile First</h2>
<pre><code>/* Mobile first: mulai dari style mobile */
.hero h1 {
  font-size: 1.5rem;
  text-align: center;
}

/* Lebar layar lebih besar → override */
@media (min-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
    text-align: left;
  }
}

@media (min-width: 1024px) {
  .hero h1 {
    font-size: 3.5rem;
  }
}
</code></pre>

<h2>CSS Custom Properties (Variables)</h2>
<pre><code>:root {
  --primary-color: #2563eb;
  --secondary-color: #7c3aed;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --font-sans: 'Inter', sans-serif;
  --border-radius: 8px;
}

.btn-primary {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  font-family: var(--font-sans);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #f9fafb;
    --bg-color: #111827;
  }
}
</code></pre>`,
        excerpt: 'Tutorial HTML dan CSS dari nol untuk web development. Pelajari struktur HTML semantik, CSS box model, Flexbox, CSS Grid, responsive design mobile-first, dan CSS variables.',
        coverImageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200',
        tags: 'HTML, CSS, Web Development, Tutorial, Pemula',
        status: 'published',
        publishedAt: d(45),
        viewCount: 7823,
        AuthorId: 1,
        createdAt: d(45),
        updatedAt: d(45),
      },
      {
        title: '10 Library JavaScript Terbaik yang Harus Diketahui Developer 2024',
        slug: '10-library-javascript-terbaik-developer-2024',
        content: `<h2>Ekosistem JavaScript yang Kaya</h2>
<p>Salah satu kekuatan terbesar JavaScript adalah ekosistem npm yang sangat besar — lebih dari 2 juta package tersedia. Namun memilih library yang tepat bisa membingungkan. Berikut 10 library JavaScript yang paling bermanfaat dan banyak digunakan developer profesional di seluruh dunia.</p>

<h2>1. Axios — HTTP Client Terbaik</h2>
<pre><code>npm install axios

import axios from 'axios'

// Konfigurasi global
const api = axios.create({
  baseURL: 'https://api.bimble.id',
  timeout: 10000,
})

// Request interceptor (tambah token otomatis)
api.interceptors.request.use(config =&gt; {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// Response interceptor (handle 401 otomatis)
api.interceptors.response.use(
  response =&gt; response,
  error =&gt; {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
</code></pre>

<h2>2. Lodash — Utility Functions Terlengkap</h2>
<pre><code>import _ from 'lodash'

// Grouping
const byCategory = _.groupBy(courses, 'category')

// Deep clone (bukan reference copy)
const copy = _.cloneDeep(originalObject)

// Debounce — delay eksekusi fungsi
const debouncedSearch = _.debounce((query) =&gt; {
  searchCourses(query)
}, 300)

// Flatten nested array
const flat = _.flattenDeep([[1, [2]], [[3, 4]]])  // [1, 2, 3, 4]

// Unique objects berdasarkan field
const unique = _.uniqBy(articles, 'slug')
</code></pre>

<h2>3. Day.js — Manipulasi Tanggal yang Ringan</h2>
<pre><code>import dayjs from 'dayjs'
import 'dayjs/locale/id'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('id')
dayjs.extend(relativeTime)

dayjs().format('DD MMMM YYYY')        // "15 Januari 2024"
dayjs('2024-01-15').fromNow()         // "3 bulan yang lalu"
dayjs().add(7, 'day').toISOString()  // 7 hari dari sekarang
</code></pre>

<h2>4. Zod — Validasi Schema yang Type-Safe</h2>
<pre><code>import { z } from 'zod'

const CourseSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().int().min(0),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  categoryId: z.number().int().positive(),
})

// Validasi
const result = CourseSchema.safeParse(req.body)
if (!result.success) {
  return res.status(400).json({ errors: result.error.flatten() })
}
const validData = result.data  // TypeScript-inferred type!
</code></pre>

<h2>5. Tailwind CSS — Utility-First CSS Framework</h2>
<pre><code>&lt;!-- Tidak perlu tulis CSS sama sekali --&gt;
&lt;button class="
  px-6 py-3
  bg-blue-600 hover:bg-blue-700
  text-white font-semibold
  rounded-lg
  transition-colors duration-200
  shadow-md hover:shadow-lg
"&gt;
  Mulai Belajar
&lt;/button&gt;
</code></pre>

<h2>6. React Query / TanStack Query — Server State Management</h2>
<pre><code>import { useQuery, useMutation } from '@tanstack/vue-query'

// Fetch data dengan caching otomatis
const { data: courses, isLoading } = useQuery({
  queryKey: ['courses'],
  queryFn: () =&gt; api.get('/courses').then(r =&gt; r.data),
  staleTime: 5 * 60 * 1000,  // Cache 5 menit
})

// Mutasi dengan optimistic update
const mutation = useMutation({
  mutationFn: (id) =&gt; api.post(\`/enroll/\${id}\`),
  onSuccess: () =&gt; {
    queryClient.invalidateQueries({ queryKey: ['courses'] })
  }
})
</code></pre>

<h2>7. Socket.io — Real-time Communication</h2>
<pre><code>// Server
const io = new Server(httpServer, { cors: { origin: '*' } })

io.on('connection', (socket) =&gt; {
  socket.on('join-room', (roomId) =&gt; {
    socket.join(roomId)
    io.to(roomId).emit('user-joined', { id: socket.id })
  })

  socket.on('send-message', ({ roomId, message }) =&gt; {
    io.to(roomId).emit('new-message', { message, from: socket.id })
  })
})
</code></pre>

<h2>8. Nodemailer — Kirim Email dari Node.js</h2>
<pre><code>const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
})

await transporter.sendMail({
  from: '"Bimble ID" &lt;noreply@bimble.id&gt;',
  to: user.email,
  subject: 'Selamat Datang di Bimble!',
  html: \`&lt;h1&gt;Halo \${user.name}!&lt;/h1&gt;\`,
})
</code></pre>

<h2>9. Multer — File Upload Handling</h2>
<pre><code>const multer = require('multer')
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  fileFilter: (req, file, cb) =&gt; {
    if (file.mimetype !== 'video/mp4') {
      return cb(new Error('Only MP4 files allowed'))
    }
    cb(null, true)
  },
  limits: { fileSize: 25 * 1024 * 1024 }  // 25MB
})

router.post('/videos', authentication, upload.single('video'), VideoController.upload)
</code></pre>

<h2>10. PDFKit — Generate PDF di Node.js</h2>
<pre><code>const PDFDocument = require('pdfkit')

function generateCertificate(user, course) {
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape' })

  doc.fontSize(36).text('SERTIFIKAT PENYELESAIAN', { align: 'center' })
  doc.fontSize(18).text(\`Diberikan kepada: \${user.name}\`)
  doc.text(\`Telah menyelesaikan kursus: \${course.name}\`)
  doc.text(\`Tanggal: \${new Date().toLocaleDateString('id-ID')}\`)

  return doc
}
</code></pre>`,
        excerpt: '10 library JavaScript yang wajib diketahui developer di 2024. Dari Axios, Lodash, Day.js, Zod, Tailwind CSS, React Query, Socket.io, Nodemailer, Multer, hingga PDFKit.',
        coverImageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200',
        tags: 'JavaScript, Library, NPM, Tutorial, Web Development',
        status: 'published',
        publishedAt: d(50),
        viewCount: 9234,
        AuthorId: 1,
        createdAt: d(50),
        updatedAt: d(50),
      },
      {
        title: 'Memahami Database Relasional: Panduan Desain Schema yang Baik',
        slug: 'memahami-database-relasional-panduan-desain-schema',
        content: `<h2>Mengapa Desain Database Penting?</h2>
<p>Database yang dirancang buruk adalah sumber masalah yang paling umum dalam aplikasi — query lambat, data tidak konsisten, susah di-extend, dan rentan terhadap anomali. Desain schema yang baik sejak awal akan menghemat waktu dan biaya yang sangat besar di masa depan.</p>

<h2>Konsep Dasar Database Relasional</h2>

<h3>Tabel, Baris, dan Kolom</h3>
<p>Data disimpan dalam tabel (seperti spreadsheet). Setiap baris adalah satu record, setiap kolom adalah atribut. Setiap tabel memiliki primary key — identifier unik untuk setiap baris.</p>

<h3>Relasi Antar Tabel</h3>

<h4>One-to-Many (Satu ke Banyak)</h4>
<p>Relasi paling umum. Satu Category memiliki banyak Courses.</p>
<pre><code>-- Categories
CREATE TABLE "Categories" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Courses
CREATE TABLE "Courses" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  "CategoryId" INTEGER NOT NULL REFERENCES "Categories"(id)
);

-- Query: kursus dengan nama kategorinya
SELECT c.name, cat.name AS category
FROM "Courses" c
JOIN "Categories" cat ON c."CategoryId" = cat.id;
</code></pre>

<h4>Many-to-Many (Banyak ke Banyak)</h4>
<p>Membutuhkan tabel perantara (junction table).</p>
<pre><code>-- User bisa memiliki banyak Course
-- Course bisa dimiliki banyak User
CREATE TABLE "UserCourses" (
  id SERIAL PRIMARY KEY,
  "UserId" INTEGER NOT NULL REFERENCES "Users"(id),
  "CourseId" INTEGER NOT NULL REFERENCES "Courses"(id),
  "isPaid" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  UNIQUE("UserId", "CourseId")  -- Satu user satu kursus
);
</code></pre>

<h2>Normalisasi Database</h2>
<p>Normalisasi adalah proses mengorganisir data untuk mengurangi redundansi.</p>

<h3>First Normal Form (1NF)</h3>
<ul>
  <li>Setiap kolom berisi nilai atomik (satu nilai, bukan list)</li>
  <li>Tidak ada group kolom yang berulang</li>
</ul>
<pre><code>-- ❌ Tidak 1NF
courses: {tags: "JavaScript, Vue.js, Node.js"}  -- Simpan sebagai string

-- ✅ 1NF — buat tabel tags terpisah
CREATE TABLE "Tags" (id, name);
CREATE TABLE "CourseTags" ("CourseId", "TagId");
</code></pre>

<h3>Second Normal Form (2NF)</h3>
<p>Harus sudah 1NF. Setiap kolom harus bergantung penuh pada primary key.</p>

<h3>Third Normal Form (3NF)</h3>
<p>Harus sudah 2NF. Tidak ada ketergantungan transitif (kolom bergantung pada kolom non-PK).</p>

<h2>Indexing: Kunci Performa Query</h2>
<pre><code>-- Index otomatis dibuat untuk PRIMARY KEY dan UNIQUE constraint
-- Tambahkan index untuk kolom yang sering di-filter/join

-- Index untuk pencarian kursus berdasarkan status
CREATE INDEX idx_courses_status ON "Courses"(status);

-- Composite index untuk query yang filter dua kolom
CREATE INDEX idx_usercourses_user_paid ON "UserCourses"("UserId", "isPaid");

-- Index untuk full-text search
CREATE INDEX idx_courses_name ON "Courses" USING gin(to_tsvector('indonesian', name));

-- Cek apakah query menggunakan index
EXPLAIN ANALYZE SELECT * FROM "Courses" WHERE status = 'active';
</code></pre>

<h2>Soft Delete: Jangan Hapus Data Permanen</h2>
<pre><code>-- Tambahkan kolom deletedAt
ALTER TABLE "Courses" ADD COLUMN "deletedAt" TIMESTAMP;

-- Soft delete
UPDATE "Courses" SET "deletedAt" = NOW() WHERE id = 5;

-- Query hanya data yang tidak dihapus
SELECT * FROM "Courses" WHERE "deletedAt" IS NULL;

-- Di Sequelize, aktifkan paranoid mode
Course.init({...}, { sequelize, modelName: 'Course', paranoid: true })
</code></pre>

<h2>Migrations: Versi Kontrol untuk Database</h2>
<pre><code>-- Jangan pernah langsung edit tabel di production!
-- Selalu gunakan migrations

npx sequelize-cli migration:generate --name add-view-count-to-articles
</code></pre>
<pre><code>// migrations/xxxx-add-view-count-to-articles.js
module.exports = {
  up: async (queryInterface, Sequelize) =&gt; {
    await queryInterface.addColumn('Articles', 'viewCount', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    })
  },
  down: async (queryInterface) =&gt; {
    await queryInterface.removeColumn('Articles', 'viewCount')
  }
}
</code></pre>`,
        excerpt: 'Panduan desain database relasional yang baik. Pelajari relasi antar tabel, normalisasi, indexing untuk performa, soft delete, dan best practices migrations dengan Sequelize.',
        coverImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200',
        tags: 'Database, PostgreSQL, SQL, Tutorial, Backend',
        status: 'published',
        publishedAt: d(55),
        viewCount: 4231,
        AuthorId: 1,
        createdAt: d(55),
        updatedAt: d(55),
      },
      {
        title: 'Karir di Bidang IT Indonesia: Panduan Memilih Jalur yang Tepat',
        slug: 'karir-bidang-it-indonesia-panduan-memilih-jalur',
        content: `<h2>Industri Teknologi Indonesia yang Sedang Booming</h2>
<p>Indonesia adalah salah satu pasar digital terbesar di Asia Tenggara dengan lebih dari 200 juta pengguna internet. Ekosistem startup dan transformasi digital perusahaan konvensional menciptakan demand yang sangat besar untuk talenta IT. Ini adalah waktu terbaik untuk memulai karir di bidang teknologi di Indonesia.</p>

<h2>Jalur Karir Utama di Bidang IT</h2>

<h3>1. Software Developer / Engineer</h3>
<p>Membangun aplikasi web, mobile, atau desktop. Paling banyak lowongan dan gaji kompetitif.</p>
<ul>
  <li>Frontend Developer — membangun antarmuka pengguna (HTML, CSS, JavaScript, Vue/React)</li>
  <li>Backend Developer — membangun server dan database (Node.js, Python, Java, Go)</li>
  <li>Full-Stack Developer — menguasai keduanya</li>
  <li>Mobile Developer — Android (Kotlin), iOS (Swift), atau cross-platform (Flutter, React Native)</li>
</ul>

<h3>2. Data & Analytics</h3>
<ul>
  <li>Data Analyst — menganalisis data untuk business insights</li>
  <li>Data Scientist — membangun model prediktif dengan ML</li>
  <li>Data Engineer — membangun pipeline data (ETL, data warehouse)</li>
  <li>Business Intelligence (BI) Developer — dashboard dan reporting</li>
</ul>

<h3>3. DevOps & Cloud</h3>
<ul>
  <li>DevOps Engineer — CI/CD, automation, infrastructure</li>
  <li>Cloud Engineer — AWS, GCP, Azure architecture</li>
  <li>Site Reliability Engineer (SRE) — uptime dan reliability sistem</li>
</ul>

<h3>4. Cybersecurity</h3>
<ul>
  <li>Security Analyst — monitor dan respons insiden keamanan</li>
  <li>Penetration Tester (Pentester) — ethical hacking</li>
  <li>Security Engineer — membangun sistem keamanan</li>
</ul>

<h3>5. Product & Design</h3>
<ul>
  <li>Product Manager — mendefinisikan dan prioritaskan fitur produk</li>
  <li>UI/UX Designer — merancang pengalaman dan antarmuka pengguna</li>
  <li>Product Designer — kombinasi UI/UX dan product strategy</li>
</ul>

<h2>Jalur Pendidikan yang Tersedia</h2>

<h3>Kuliah Ilmu Komputer / Teknik Informatika</h3>
<p>Memberikan fondasi teori yang kuat. Cocok untuk yang ingin karir jangka panjang dan posisi research/senior engineer. Durasi 4 tahun, biaya bervariasi.</p>

<h3>Bootcamp Coding</h3>
<p>Program intensif 3-6 bulan yang fokus pada skill praktis. Banyak alumni bootcamp berhasil mendapatkan kerja pertama sebagai developer. Contoh: Hacktiv8, Purwadhika, RevoU, Dibimbing.id.</p>

<h3>Otodidak / Self-Taught</h3>
<p>Belajar mandiri melalui kursus online (Bimble, Dicoding, Udemy, freeCodeCamp), YouTube, dan buku. Banyak developer sukses Indonesia yang self-taught. Butuh disiplin tinggi tapi lebih fleksibel dan murah.</p>

<h2>Skill Non-Teknis yang Sering Diabaikan</h2>
<ul>
  <li><strong>Komunikasi</strong> — Bisa menjelaskan konsep teknis ke non-teknis adalah skill berharga</li>
  <li><strong>Problem Solving</strong> — Kemampuan memecah masalah kompleks menjadi langkah kecil</li>
  <li><strong>Teamwork</strong> — Software development adalah pekerjaan tim</li>
  <li><strong>Bahasa Inggris</strong> — Dokumen teknis, library, dan konferensi internasional dalam bahasa Inggris</li>
  <li><strong>Adaptabilitas</strong> — Teknologi berubah cepat, kamu harus terus belajar</li>
</ul>

<h2>Sertifikasi yang Diakui Industri Indonesia</h2>
<ul>
  <li>AWS Certified Solutions Architect — sangat dicari untuk cloud role</li>
  <li>Google Professional Data Engineer — untuk data engineering</li>
  <li>Certified Kubernetes Administrator (CKA) — untuk DevOps</li>
  <li>OSCP (Offensive Security) — untuk cybersecurity</li>
  <li>Meta Front-End/Back-End Developer Certificate (Coursera)</li>
</ul>

<h2>Platform Lowongan Kerja IT di Indonesia</h2>
<ul>
  <li>LinkedIn — terbaik untuk networking dan job search</li>
  <li>Glints — fokus tech dan startup Asia Tenggara</li>
  <li>Kalibrr — banyak pilihan untuk fresh graduate</li>
  <li>Jobstreet — terbesar secara umum</li>
  <li>Tech in Asia Job Board — untuk startup tech</li>
</ul>`,
        excerpt: 'Panduan memilih jalur karir IT di Indonesia. Dari software developer, data science, DevOps, cybersecurity, hingga product design. Termasuk jalur pendidikan, sertifikasi, dan tips mendapatkan pekerjaan pertama.',
        coverImageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
        tags: 'Karir IT, Software Developer, Indonesia, Panduan, Tips',
        status: 'published',
        publishedAt: d(60),
        viewCount: 11243,
        AuthorId: 1,
        createdAt: d(60),
        updatedAt: d(60),
      },
      {
        title: 'Tailwind CSS vs Bootstrap: Framework CSS Mana yang Lebih Baik?',
        slug: 'tailwind-css-vs-bootstrap-framework-mana-lebih-baik',
        content: `<h2>Dua Raksasa CSS Framework</h2>
<p>Bootstrap dan Tailwind CSS adalah dua CSS framework paling populer di dunia. Bootstrap telah mendominasi sejak 2011 dan membantu jutaan developer membuat website yang responsif. Tailwind CSS, muncul di 2017, membawa pendekatan yang sangat berbeda dan langsung mendapat penggemar setia.</p>

<h2>Bootstrap: Component-Based Framework</h2>
<p>Bootstrap menyediakan komponen UI yang sudah jadi — tombol, navbar, modal, card, dll. Kamu tinggal menambahkan class dan komponen langsung tampil.</p>
<pre><code>&lt;!-- Bootstrap: tambahkan class, komponen langsung ada --&gt;
&lt;button class="btn btn-primary btn-lg"&gt;Daftar Sekarang&lt;/button&gt;

&lt;div class="card shadow"&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;JavaScript Dasar&lt;/h5&gt;
    &lt;p class="card-text"&gt;Belajar JavaScript dari nol&lt;/p&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Daftar&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

<h2>Tailwind CSS: Utility-First Framework</h2>
<p>Tailwind tidak menyediakan komponen jadi. Ia menyediakan class utility kecil-kecil yang kamu kombinasikan sesuai kebutuhan.</p>
<pre><code>&lt;!-- Tailwind: kombinasikan utility class --&gt;
&lt;button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"&gt;
  Daftar Sekarang
&lt;/button&gt;

&lt;div class="bg-white rounded-xl shadow-md overflow-hidden"&gt;
  &lt;div class="p-6"&gt;
    &lt;h5 class="text-xl font-bold text-gray-900"&gt;JavaScript Dasar&lt;/h5&gt;
    &lt;p class="mt-2 text-gray-600"&gt;Belajar JavaScript dari nol&lt;/p&gt;
    &lt;a href="#" class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"&gt;Daftar&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>

<h2>Perbandingan Detail</h2>

<h3>Kustomisasi</h3>
<p><strong>Tailwind</strong> ✅ Sangat fleksibel — desain sepenuhnya bebas, tidak ada "Bootstrap look"</p>
<p><strong>Bootstrap</strong> ⚠️ Butuh override CSS untuk kustomisasi mendalam, sering terlihat "seperti Bootstrap"</p>

<h3>Bundle Size</h3>
<p><strong>Tailwind</strong> ✅ Dengan PurgeCSS/tree-shaking, CSS production bisa di bawah 10KB</p>
<p><strong>Bootstrap</strong> ⚠️ Minimal ~25KB (minified + gzip), lebih besar karena include komponen yang tidak dipakai</p>

<h3>Kecepatan Development</h3>
<p><strong>Bootstrap</strong> ✅ Lebih cepat untuk prototype — komponen sudah jadi</p>
<p><strong>Tailwind</strong> ⚠️ Lebih lambat di awal, tapi lebih cepat setelah terbiasa dan saat maintenance</p>

<h3>Kurva Pembelajaran</h3>
<p><strong>Bootstrap</strong> ✅ Lebih mudah dipelajari — tinggal hafal nama komponen</p>
<p><strong>Tailwind</strong> ⚠️ Butuh waktu menghafal nama utility class, tapi ada VS Code extension yang membantu</p>

<h3>Konsistensi Desain</h3>
<p><strong>Tailwind</strong> ✅ Design token (warna, spacing, font) terpusat di config — konsisten secara alami</p>

<h2>Kapan Menggunakan Masing-masing?</h2>
<p><strong>Pilih Bootstrap jika:</strong></p>
<ul>
  <li>Proyek internal/admin panel yang tidak perlu desain custom</li>
  <li>Tim tidak punya designer dan butuh UI yang presentable cepat</li>
  <li>Maintenance oleh developer yang tidak familiar CSS mendalam</li>
</ul>
<p><strong>Pilih Tailwind jika:</strong></p>
<ul>
  <li>Produk consumer yang butuh desain unik dan branded</li>
  <li>Tim memiliki designer dan dokumen desain (Figma)</li>
  <li>Proyek jangka panjang yang akan banyak dikustomisasi</li>
  <li>Vue.js atau React — Tailwind bekerja sangat baik dengan component-based framework</li>
</ul>

<h2>Tren 2024</h2>
<p>Tailwind CSS semakin mendominasi. State of CSS 2023 menunjukkan kepuasan pengguna Tailwind mencapai 84%, sementara Bootstrap 63%. Untuk proyek baru dengan Vue.js atau React, Tailwind adalah pilihan yang disarankan mayoritas developer modern.</p>`,
        excerpt: 'Perbandingan lengkap Tailwind CSS vs Bootstrap. Pelajari perbedaan approach, kelebihan, kekurangan, dan panduan kapan harus menggunakan masing-masing framework CSS.',
        coverImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
        tags: 'Tailwind CSS, Bootstrap, CSS, Framework, Frontend',
        status: 'published',
        publishedAt: d(65),
        viewCount: 6721,
        AuthorId: 1,
        createdAt: d(65),
        updatedAt: d(65),
      },
      {
        title: 'Cara Kerja Internet: DNS, HTTP, dan TCP/IP untuk Developer',
        slug: 'cara-kerja-internet-dns-http-tcpip-untuk-developer',
        content: `<h2>Apa yang Terjadi Ketika Kamu Membuka Website?</h2>
<p>Ketika kamu mengetik "bimble.id" di browser dan menekan Enter, serangkaian proses yang sangat cepat terjadi sebelum halaman muncul. Memahami bagaimana internet bekerja membuatmu menjadi developer yang lebih baik — kamu bisa mendiagnosis masalah jaringan, mengoptimalkan performa, dan memahami protokol keamanan.</p>

<h2>Step by Step: Dari URL ke Halaman Web</h2>

<h3>1. DNS Resolution (0-100ms)</h3>
<p>Browser perlu tahu IP address dari "bimble.id". Proses ini disebut DNS resolution:</p>
<ol>
  <li>Cek cache browser (apakah pernah dikunjungi sebelumnya?)</li>
  <li>Cek cache OS</li>
  <li>Tanya DNS resolver (biasanya milik ISP atau 8.8.8.8 Google)</li>
  <li>Resolver tanya Root DNS → TLD DNS (.id) → Authoritative DNS untuk bimble.id</li>
  <li>Dapat IP: 103.xxx.xxx.xxx</li>
</ol>

<h3>2. TCP Handshake (50-200ms)</h3>
<p>Browser membangun koneksi dengan server melalui three-way handshake:</p>
<pre><code>Browser → Server: SYN (Halo, mau konek!)
Server → Browser: SYN-ACK (Oke, siap!)
Browser → Server: ACK (Koneksi terbentuk!)
</code></pre>

<h3>3. TLS Handshake (50-200ms tambahan)</h3>
<p>Untuk HTTPS, ada negosiasi enkripsi tambahan. Browser dan server sepakat menggunakan cipher suite tertentu dan bertukar sertifikat SSL.</p>

<h3>4. HTTP Request</h3>
<pre><code>GET / HTTP/1.1
Host: bimble.id
User-Agent: Mozilla/5.0 (...)
Accept: text/html,application/xhtml+xml
Accept-Language: id-ID,id;q=0.9
</code></pre>

<h3>5. HTTP Response</h3>
<pre><code>HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 25834
Cache-Control: max-age=3600

&lt;!DOCTYPE html&gt;...
</code></pre>

<h3>6. Browser Rendering</h3>
<p>Browser mem-parse HTML, memuat CSS dan JavaScript, menjalankan JS, dan merender halaman menggunakan Critical Rendering Path.</p>

<h2>HTTP Versions: Evolusi Performa</h2>

<h3>HTTP/1.1 (1997)</h3>
<ul>
  <li>Satu request per koneksi TCP (atau 6-8 koneksi paralel)</li>
  <li>Head-of-line blocking — request antri menunggu yang sebelumnya</li>
</ul>

<h3>HTTP/2 (2015)</h3>
<ul>
  <li>Multiplexing — banyak request dalam satu koneksi TCP</li>
  <li>Header compression</li>
  <li>Server push</li>
  <li>Sebagian besar website modern sudah HTTP/2</li>
</ul>

<h3>HTTP/3 (2022)</h3>
<ul>
  <li>Berbasis QUIC (UDP), bukan TCP</li>
  <li>Lebih cepat di jaringan tidak stabil (mobile)</li>
  <li>0-RTT connection resume</li>
</ul>

<h2>Cache: Meningkatkan Performa</h2>
<pre><code># HTTP Response headers untuk caching
Cache-Control: max-age=86400      # Cache 1 hari
Cache-Control: no-cache           # Selalu verifikasi ke server
Cache-Control: no-store           # Jangan cache sama sekali (data sensitif)
ETag: "abc123"                    # Token untuk validasi cache

# Di Express.js
res.set('Cache-Control', 'public, max-age=3600')
</code></pre>

<h2>CORS: Cross-Origin Resource Sharing</h2>
<pre><code>// Error yang sering ditemui developer frontend:
// "Access to fetch has been blocked by CORS policy"

// Di Express.js — konfigurasi CORS
const cors = require('cors')

app.use(cors({
  origin: ['https://bimble.id', 'https://www.bimble.id'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Atau untuk development (semua origin diizinkan)
app.use(cors())
</code></pre>

<h2>Perbedaan HTTP dan HTTPS</h2>
<p>HTTP mengirim data dalam plain text — siapa saja yang "mendengarkan" jaringan bisa membaca data. HTTPS mengenkripsi data dengan TLS, sehingga hanya browser dan server yang bisa membacanya.</p>
<p>Di tahun 2024, tidak ada alasan untuk tidak menggunakan HTTPS. Semua cloud platform (Railway, Vercel, Netlify) menyediakan SSL certificate gratis secara otomatis.</p>`,
        excerpt: 'Penjelasan cara kerja internet untuk developer: DNS resolution, TCP handshake, HTTP/HTTPS, perbedaan HTTP 1.1/2/3, browser rendering, caching, dan CORS. Semua yang perlu diketahui web developer.',
        coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
        tags: 'Internet, HTTP, DNS, Tutorial, Web Development',
        status: 'published',
        publishedAt: d(70),
        viewCount: 5432,
        AuthorId: 1,
        createdAt: d(70),
        updatedAt: d(70),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    const slugs = [
      'cybersecurity-untuk-developer-lindungi-aplikasi-dari-serangan',
      'cara-membaca-error-javascript-debug-lebih-cepat-efisien',
      'belajar-html-css-dari-nol-fondasi-web-development',
      '10-library-javascript-terbaik-developer-2024',
      'memahami-database-relasional-panduan-desain-schema',
      'karir-bidang-it-indonesia-panduan-memilih-jalur',
      'tailwind-css-vs-bootstrap-framework-mana-lebih-baik',
      'cara-kerja-internet-dns-http-tcpip-untuk-developer',
    ]
    await queryInterface.bulkDelete('Articles', { slug: slugs }, {})
  },
}
