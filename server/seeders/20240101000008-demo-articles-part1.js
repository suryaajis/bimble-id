'use strict'

const now = new Date()
const d = (daysAgo) => new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Cara Belajar JavaScript untuk Pemula: Panduan Lengkap 2024',
        slug: 'cara-belajar-javascript-untuk-pemula-panduan-lengkap-2024',
        content: `<h2>Mengapa JavaScript Wajib Dipelajari?</h2>
<p>JavaScript adalah bahasa pemrograman paling populer di dunia selama lebih dari 10 tahun berturut-turut berdasarkan survei Stack Overflow Developer Survey. Hampir setiap website yang kamu kunjungi setiap hari menggunakan JavaScript — dari Google, YouTube, Facebook, hingga Tokopedia dan Gojek.</p>
<p>Jika kamu ingin berkarir sebagai web developer, mobile developer (React Native), atau bahkan backend developer (Node.js), maka JavaScript adalah batu fondasi yang wajib kamu kuasai terlebih dahulu.</p>

<h2>Apa yang Perlu Dipelajari Pertama Kali?</h2>
<p>Banyak pemula bingung harus mulai dari mana. Berikut adalah urutan belajar JavaScript yang terstruktur dan terbukti efektif:</p>

<h3>1. Variabel dan Tipe Data</h3>
<p>Mulailah dengan memahami cara menyimpan data menggunakan <code>var</code>, <code>let</code>, dan <code>const</code>. Pelajari tipe data dasar: string, number, boolean, null, undefined, dan object.</p>
<pre><code>// Contoh penggunaan variabel
const nama = "Budi";
let umur = 25;
var isStudent = true;

console.log(\`Halo, nama saya \${nama}, umur \${umur} tahun\`);
</code></pre>

<h3>2. Kondisional dan Perulangan</h3>
<p>Kontrol alur program dengan <code>if/else</code>, <code>switch</code>, dan loop <code>for</code>, <code>while</code>, serta <code>forEach</code>.</p>

<h3>3. Fungsi</h3>
<p>Fungsi adalah blok kode yang bisa digunakan berulang. Pelajari function declaration, function expression, dan arrow function yang merupakan ciri khas JavaScript modern (ES6+).</p>

<h3>4. Array dan Object</h3>
<p>Array dan object adalah struktur data utama di JavaScript. Kamu harus mahir menggunakan metode array seperti <code>map()</code>, <code>filter()</code>, <code>reduce()</code>, dan <code>find()</code>.</p>

<h3>5. DOM Manipulation</h3>
<p>DOM (Document Object Model) adalah representasi HTML di memori browser. JavaScript bisa memanipulasi DOM untuk mengubah konten halaman secara dinamis tanpa me-refresh halaman.</p>

<h3>6. Asynchronous JavaScript</h3>
<p>Ini adalah salah satu konsep terpenting yang sering membingungkan pemula. Pelajari callback, Promise, dan <code>async/await</code> untuk menangani operasi asinkron seperti fetch data dari API.</p>

<h2>Tools yang Dibutuhkan untuk Belajar JavaScript</h2>
<ul>
  <li><strong>VS Code</strong> — editor kode terbaik untuk JavaScript, gratis dan kaya ekstensi</li>
  <li><strong>Node.js</strong> — untuk menjalankan JavaScript di luar browser</li>
  <li><strong>Browser DevTools</strong> — konsol browser adalah playground terbaik untuk bereksperimen</li>
  <li><strong>Git</strong> — untuk version control dan menyimpan progres belajar</li>
</ul>

<h2>Berapa Lama Waktu yang Dibutuhkan?</h2>
<p>Dengan belajar 1-2 jam per hari secara konsisten, kamu bisa menguasai dasar JavaScript dalam <strong>2-3 bulan</strong>. Yang penting adalah praktik membuat proyek nyata, bukan hanya menonton tutorial.</p>

<h2>Proyek Latihan untuk Pemula</h2>
<p>Cara terbaik belajar adalah dengan membuat proyek. Berikut ide proyek sederhana untuk pemula:</p>
<ol>
  <li>Kalkulator sederhana</li>
  <li>To-Do List (CRUD)</li>
  <li>Aplikasi cuaca menggunakan API publik</li>
  <li>Quiz game dengan skor</li>
  <li>Landing page interaktif</li>
</ol>

<h2>Kesimpulan</h2>
<p>Belajar JavaScript membutuhkan konsistensi dan latihan. Jangan hanya menonton tutorial — langsung praktikkan setiap konsep yang kamu pelajari. Bergabunglah dengan komunitas developer Indonesia, buat proyek nyata, dan jangan takut untuk bertanya.</p>
<p>Di Bimble ID, kami menyediakan kursus JavaScript yang terstruktur, mulai dari level pemula hingga mahir, dengan proyek praktis yang relevan dengan industri. Mulai belajar sekarang!</p>`,
        excerpt: 'Panduan lengkap belajar JavaScript untuk pemula. Temukan urutan belajar yang terstruktur, tools yang dibutuhkan, dan proyek latihan untuk memulai karir sebagai web developer.',
        coverImageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200',
        tags: 'JavaScript, Pemula, Belajar Coding, Web Development, Tutorial',
        status: 'published',
        publishedAt: d(30),
        viewCount: 4821,
        AuthorId: 1,
        createdAt: d(30),
        updatedAt: d(30),
      },
      {
        title: 'Perbedaan Vue.js vs React: Mana yang Lebih Baik untuk Dipelajari?',
        slug: 'perbedaan-vuejs-vs-react-mana-yang-lebih-baik',
        content: `<h2>Vue.js vs React: Pertanyaan yang Sering Ditanyakan Developer Indonesia</h2>
<p>Salah satu dilema terbesar bagi pemula web development adalah memilih antara Vue.js dan React. Keduanya adalah framework/library JavaScript yang sangat populer dan digunakan oleh perusahaan-perusahaan besar di seluruh dunia. Artikel ini akan membantu kamu membuat keputusan yang tepat berdasarkan kebutuhan dan tujuanmu.</p>

<h2>Apa itu Vue.js?</h2>
<p>Vue.js adalah framework JavaScript progresif yang dibuat oleh Evan You, mantan engineer Google. Vue.js dirancang untuk mudah dipelajari oleh pemula namun tetap powerful untuk membangun aplikasi enterprise yang kompleks.</p>
<p>Perusahaan yang menggunakan Vue.js: Alibaba, GitLab, Xiaomi, dan banyak startup teknologi di Asia Tenggara.</p>

<h2>Apa itu React?</h2>
<p>React adalah library JavaScript untuk membangun antarmuka pengguna yang dikembangkan oleh Facebook (Meta). React bukan framework penuh — ia hanya menangani lapisan view — sehingga kamu perlu menambahkan library lain untuk routing, state management, dll.</p>
<p>Perusahaan yang menggunakan React: Facebook, Instagram, Netflix, Airbnb, Shopee, Tokopedia.</p>

<h2>Perbandingan Detail</h2>

<h3>1. Kurva Pembelajaran</h3>
<p><strong>Vue.js</strong> ✅ Lebih mudah dipelajari. Sintaksnya intuitif dan mirip HTML biasa. Dokumentasinya tersedia dalam bahasa Indonesia dan dianggap salah satu dokumentasi terbaik di ekosistem JavaScript.</p>
<p><strong>React</strong> ⚠️ Kurva pembelajaran lebih curam karena kamu harus memahami JSX, hooks, dan cara berpikir "React way". Butuh lebih banyak boilerplate di awal.</p>

<h3>2. Performa</h3>
<p>Keduanya memiliki performa yang sangat baik. Vue.js 3 menggunakan Proxy-based reactivity yang sangat efisien. React menggunakan Virtual DOM dengan konsep reconciliation. Dalam benchmark umum, perbedaannya tidak signifikan untuk aplikasi web normal.</p>

<h3>3. Ekosistem dan Komunitas</h3>
<p><strong>React</strong> memiliki ekosistem yang jauh lebih besar — lebih banyak library pihak ketiga, lebih banyak tutorial, lebih banyak lowongan kerja (terutama di perusahaan internasional).</p>
<p><strong>Vue.js</strong> sangat populer di Asia, terutama China dan Asia Tenggara. Untuk developer Indonesia yang ingin bekerja di perusahaan lokal, Vue.js adalah pilihan yang sangat relevan.</p>

<h3>4. Lowongan Kerja di Indonesia</h3>
<p>Berdasarkan data Jobstreet dan LinkedIn Indonesia (2024):</p>
<ul>
  <li>React: ~3.200 lowongan</li>
  <li>Vue.js: ~1.800 lowongan</li>
  <li>Angular: ~900 lowongan</li>
</ul>
<p>React memimpin, tetapi Vue.js juga sangat diminati, terutama di startup dan perusahaan teknologi lokal.</p>

<h3>5. Sintaks dan DX (Developer Experience)</h3>
<p>Vue.js menggunakan Single File Components (SFC) dengan pemisahan template, script, dan style yang jelas. Ini sangat intuitif bagi developer yang familiar dengan HTML.</p>
<pre><code>&lt;template&gt;
  &lt;h1&gt;{{ pesan }}&lt;/h1&gt;
&lt;/template&gt;

&lt;script setup&gt;
const pesan = 'Halo Dunia!'
&lt;/script&gt;

&lt;style scoped&gt;
h1 { color: blue; }
&lt;/style&gt;
</code></pre>

<h2>Mana yang Harus Dipilih?</h2>
<p><strong>Pilih Vue.js jika:</strong></p>
<ul>
  <li>Kamu pemula dan ingin belajar framework lebih mudah</li>
  <li>Kamu fokus pada pasar kerja Indonesia/Asia Tenggara</li>
  <li>Kamu lebih suka sintaks yang ekspresif dan terstruktur</li>
</ul>
<p><strong>Pilih React jika:</strong></p>
<ul>
  <li>Kamu mengincar pekerjaan di perusahaan multinasional</li>
  <li>Kamu berencana masuk ke ekosistem mobile (React Native)</li>
  <li>Kamu ingin pilihan library pihak ketiga yang lebih luas</li>
</ul>

<h2>Kesimpulan</h2>
<p>Tidak ada pilihan yang "lebih baik" secara absolut. Keduanya adalah tool yang excellent. Yang terpenting adalah konsistensi belajar. Pilih satu, pelajari dengan mendalam, dan buat proyek nyata.</p>`,
        excerpt: 'Bingung memilih antara Vue.js dan React? Artikel ini membandingkan kedua framework secara detail dari sisi kemudahan belajar, performa, ekosistem, dan peluang kerja di Indonesia.',
        coverImageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200',
        tags: 'Vue.js, React, JavaScript, Framework, Perbandingan',
        status: 'published',
        publishedAt: d(28),
        viewCount: 6234,
        AuthorId: 1,
        createdAt: d(28),
        updatedAt: d(28),
      },
      {
        title: 'Gaji Software Developer di Indonesia 2024: Data Lengkap per Level',
        slug: 'gaji-software-developer-indonesia-2024-data-lengkap',
        content: `<h2>Berapa Gaji Software Developer di Indonesia?</h2>
<p>Pertanyaan ini selalu menjadi topik hangat di komunitas developer Indonesia. Apakah karir di bidang teknologi benar-benar sebanding dengan waktu belajarnya? Artikel ini menyajikan data gaji terkini berdasarkan survei komunitas, Glassdoor, dan data LinkedIn Salary Insights untuk membantu kamu membuat keputusan karir yang tepat.</p>

<h2>Gaji Berdasarkan Level Pengalaman</h2>

<h3>Junior Developer (0-2 tahun pengalaman)</h3>
<p>Kisaran gaji: <strong>Rp 4.000.000 – Rp 8.000.000/bulan</strong></p>
<p>Pada level ini, kamu baru memulai karir dan masih dalam proses belajar. Fokus pada perusahaan yang memberikan mentoring dan kesempatan belajar yang baik, bukan hanya gaji tertinggi.</p>

<h3>Mid-Level Developer (2-5 tahun pengalaman)</h3>
<p>Kisaran gaji: <strong>Rp 8.000.000 – Rp 18.000.000/bulan</strong></p>
<p>Di sini kamu sudah mandiri, bisa mengerjakan fitur dari awal hingga akhir, dan mulai memiliki spesialisasi (frontend, backend, atau full-stack).</p>

<h3>Senior Developer (5+ tahun pengalaman)</h3>
<p>Kisaran gaji: <strong>Rp 18.000.000 – Rp 40.000.000/bulan</strong></p>
<p>Senior developer memimpin tim teknis, membuat keputusan arsitektur, dan menjadi mentor bagi junior. Banyak senior developer juga mendapatkan benefit tambahan seperti saham/opsi perusahaan.</p>

<h3>Tech Lead / Staff Engineer</h3>
<p>Kisaran gaji: <strong>Rp 30.000.000 – Rp 70.000.000/bulan</strong></p>
<p>Posisi ini membutuhkan kombinasi skill teknis tinggi dan kemampuan kepemimpinan. Di startup unicorn (Gojek, Tokopedia, Traveloka), posisi ini bisa mendapatkan kompensasi yang sangat kompetitif.</p>

<h2>Gaji Berdasarkan Spesialisasi</h2>

<table>
  <thead>
    <tr><th>Spesialisasi</th><th>Junior</th><th>Mid</th><th>Senior</th></tr>
  </thead>
  <tbody>
    <tr><td>Frontend Developer</td><td>4-7 jt</td><td>8-15 jt</td><td>18-35 jt</td></tr>
    <tr><td>Backend Developer</td><td>5-8 jt</td><td>9-18 jt</td><td>20-40 jt</td></tr>
    <tr><td>Full-Stack Developer</td><td>5-8 jt</td><td>10-20 jt</td><td>22-45 jt</td></tr>
    <tr><td>Mobile Developer (iOS/Android)</td><td>5-9 jt</td><td>10-20 jt</td><td>22-45 jt</td></tr>
    <tr><td>Data Engineer</td><td>6-10 jt</td><td>12-25 jt</td><td>25-55 jt</td></tr>
    <tr><td>ML Engineer / AI Engineer</td><td>7-12 jt</td><td>15-30 jt</td><td>30-70 jt</td></tr>
    <tr><td>DevOps / SRE</td><td>6-10 jt</td><td>12-22 jt</td><td>25-50 jt</td></tr>
    <tr><td>Cybersecurity</td><td>5-9 jt</td><td>10-20 jt</td><td>22-45 jt</td></tr>
  </tbody>
</table>

<h2>Faktor yang Mempengaruhi Gaji</h2>

<h3>1. Lokasi</h3>
<p>Jakarta dan sekitarnya (Bodetabek) secara umum menawarkan gaji 20-40% lebih tinggi dibanding kota lain. Namun dengan maraknya remote work pasca pandemi, lokasi menjadi semakin tidak relevan.</p>

<h3>2. Tipe Perusahaan</h3>
<ul>
  <li><strong>Startup Unicorn/Decacorn</strong> (Gojek, Tokopedia, Traveloka, Bukalapak): Gaji dan benefit tertinggi + equity</li>
  <li><strong>MNC Tech</strong> (Google, Microsoft, AWS Indonesia): Gaji sangat kompetitif, benefit premium</li>
  <li><strong>Startup Series A-C</strong>: Gaji di atas rata-rata + opsi saham yang bisa berharga besar</li>
  <li><strong>BUMN/Pemerintah</strong>: Gaji lebih rendah tapi job security tinggi dan benefit lain</li>
  <li><strong>Agency/Outsourcing</strong>: Gaji variatif, bagus untuk membangun portofolio awal</li>
</ul>

<h3>3. Skill yang Dicari</h3>
<p>Beberapa skill yang memberikan premium gaji di atas rata-rata:</p>
<ul>
  <li>Machine Learning / AI Engineering (+20-40%)</li>
  <li>Cloud Architecture (AWS/GCP/Azure) (+15-30%)</li>
  <li>Blockchain/Web3 (+20-50%, tapi demand fluktuatif)</li>
  <li>Cybersecurity / Penetration Testing (+15-25%)</li>
</ul>

<h2>Remote Work: Kesempatan Gaji Global</h2>
<p>Semakin banyak developer Indonesia yang bekerja remote untuk perusahaan luar negeri dan mendapatkan gaji dalam USD atau EUR. Ini bisa meningkatkan penghasilan hingga 3-5x lipat. Platform seperti Toptal, Turing, Remote.com, dan X-Team adalah jalur untuk mendapatkan remote job internasional.</p>

<h2>Tips Meningkatkan Gaji</h2>
<ol>
  <li>Bangun portofolio proyek nyata yang bisa dilihat oleh recruiter</li>
  <li>Spesialisasi pada area yang demand tinggi (ML, Cloud, Mobile)</li>
  <li>Dapatkan sertifikasi: AWS Certified, Google Cloud, dsb</li>
  <li>Aktif di komunitas: open source, meetup, conference</li>
  <li>Jangan takut untuk bernegosiasi — mayoritas developer Indonesia under-negotiate</li>
</ol>`,
        excerpt: 'Data lengkap gaji software developer di Indonesia 2024, mulai dari junior hingga senior. Berapa gaji frontend, backend, dan ML engineer? Temukan jawabannya di sini.',
        coverImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200',
        tags: 'Gaji Developer, Karir IT, Software Engineer, Indonesia, 2024',
        status: 'published',
        publishedAt: d(25),
        viewCount: 9847,
        AuthorId: 1,
        createdAt: d(25),
        updatedAt: d(25),
      },
      {
        title: 'Belajar Python dari Nol: Langkah Demi Langkah untuk Pemula',
        slug: 'belajar-python-dari-nol-langkah-demi-langkah-pemula',
        content: `<h2>Kenapa Python?</h2>
<p>Python adalah bahasa pemrograman yang paling disarankan untuk pemula. Sintaksnya yang bersih dan mudah dibaca seperti bahasa Inggris biasa membuatnya sangat ramah untuk dipelajari. Ditambah lagi, Python adalah bahasa nomor satu untuk data science, machine learning, dan automation — bidang-bidang yang sedang booming saat ini.</p>
<p>Menurut TIOBE Index 2024, Python menempati posisi pertama sebagai bahasa pemrograman paling populer di dunia, menggeser Java dan C.</p>

<h2>Instalasi dan Setup Lingkungan</h2>

<h3>Langkah 1: Download Python</h3>
<p>Kunjungi python.org dan download versi terbaru (Python 3.12 atau lebih baru). Pastikan centang "Add Python to PATH" saat proses instalasi di Windows.</p>

<h3>Langkah 2: Install VS Code</h3>
<p>Visual Studio Code adalah editor terbaik untuk Python. Install ekstensi Python dari Microsoft untuk mendapatkan IntelliSense, linting, dan debugging.</p>

<h3>Langkah 3: Verifikasi Instalasi</h3>
<pre><code># Di terminal, ketik:
python --version
# Output: Python 3.12.0

# Coba jalankan script pertama:
print("Halo, Dunia!")
</code></pre>

<h2>Konsep Dasar Python yang Harus Dikuasai</h2>

<h3>1. Variabel dan Tipe Data</h3>
<pre><code># Python menggunakan dynamic typing
nama = "Budi"           # str
umur = 25               # int
tinggi = 175.5          # float
is_student = True       # bool
nilai = None            # NoneType

print(type(nama))       # &lt;class 'str'&gt;
</code></pre>

<h3>2. String dan Manipulasi Teks</h3>
<pre><code>kalimat = "Belajar Python di Bimble ID"

# String methods
print(kalimat.upper())           # BELAJAR PYTHON DI BIMBLE ID
print(kalimat.split())           # ['Belajar', 'Python', 'di', 'Bimble', 'ID']
print(kalimat.replace("Bimble", "Kita"))

# f-string (cara modern format string)
nama = "Siti"
umur = 22
print(f"Nama: {nama}, Umur: {umur}")
</code></pre>

<h3>3. List, Tuple, Dictionary, Set</h3>
<pre><code># List — bisa diubah (mutable)
buah = ["apel", "mangga", "jeruk"]
buah.append("pisang")
buah.remove("apel")

# Tuple — tidak bisa diubah (immutable)
koordinat = (6.2088, 106.8456)

# Dictionary — pasangan key-value
mahasiswa = {
    "nama": "Budi",
    "nim": "12345678",
    "ipk": 3.75
}
print(mahasiswa["nama"])  # Budi

# Set — koleksi unik, tidak berurutan
hobi = {"coding", "membaca", "coding"}  # Duplikat otomatis dihapus
print(hobi)  # {'coding', 'membaca'}
</code></pre>

<h3>4. Kontrol Alur Program</h3>
<pre><code># if/elif/else
nilai = 85
if nilai >= 90:
    print("A")
elif nilai >= 80:
    print("B")
elif nilai >= 70:
    print("C")
else:
    print("D")

# for loop
for i in range(1, 6):
    print(f"Iterasi ke-{i}")

# while loop
hitung = 0
while hitung < 5:
    print(hitung)
    hitung += 1

# List comprehension (cara Pythonic)
pangkat_dua = [x**2 for x in range(10)]
print(pangkat_dua)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
</code></pre>

<h3>5. Fungsi</h3>
<pre><code>def hitung_luas_lingkaran(radius):
    """Menghitung luas lingkaran."""
    import math
    return math.pi * radius ** 2

luas = hitung_luas_lingkaran(7)
print(f"Luas: {luas:.2f}")  # Luas: 153.94

# Lambda function
kuadrat = lambda x: x ** 2
print(kuadrat(5))  # 25
</code></pre>

<h2>Proyek Pemula: To-Do List CLI</h2>
<pre><code>todos = []

def tampilkan_todos():
    if not todos:
        print("Tidak ada tugas.")
        return
    for i, todo in enumerate(todos, 1):
        print(f"{i}. {todo}")

def tambah_todo(tugas):
    todos.append(tugas)
    print(f"Tugas '{tugas}' ditambahkan!")

def hapus_todo(nomor):
    if 1 <= nomor <= len(todos):
        dihapus = todos.pop(nomor - 1)
        print(f"Tugas '{dihapus}' dihapus!")
    else:
        print("Nomor tidak valid.")

while True:
    print("\\n=== To-Do App ===")
    print("1. Lihat tugas")
    print("2. Tambah tugas")
    print("3. Hapus tugas")
    print("4. Keluar")

    pilihan = input("Pilih: ")

    if pilihan == "1":
        tampilkan_todos()
    elif pilihan == "2":
        tugas = input("Nama tugas: ")
        tambah_todo(tugas)
    elif pilihan == "3":
        no = int(input("Nomor tugas: "))
        hapus_todo(no)
    elif pilihan == "4":
        break
</code></pre>

<h2>Langkah Selanjutnya Setelah Menguasai Dasar</h2>
<ul>
  <li>Pelajari OOP (Object-Oriented Programming) dengan class dan inheritance</li>
  <li>Kuasai file I/O dan exception handling</li>
  <li>Pelajari library populer: NumPy, Pandas untuk data science</li>
  <li>Atau pelajari Django/FastAPI untuk web development</li>
  <li>Ikuti proyek open-source di GitHub untuk belajar dari kode orang lain</li>
</ul>`,
        excerpt: 'Tutorial lengkap belajar Python dari nol untuk pemula. Mulai dari instalasi, variabel, tipe data, kontrol alur, fungsi, hingga proyek pertamamu. Panduan step-by-step yang mudah dipahami.',
        coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
        tags: 'Python, Pemula, Tutorial Python, Belajar Coding, Programm',
        status: 'published',
        publishedAt: d(22),
        viewCount: 5632,
        AuthorId: 1,
        createdAt: d(22),
        updatedAt: d(22),
      },
      {
        title: 'Apa itu REST API? Panduan Lengkap untuk Developer Pemula',
        slug: 'apa-itu-rest-api-panduan-lengkap-developer-pemula',
        content: `<h2>Pengertian REST API</h2>
<p>REST API (Representational State Transfer Application Programming Interface) adalah standar arsitektur komunikasi antara client (browser/aplikasi mobile) dan server. Hampir semua aplikasi modern menggunakan REST API untuk bertukar data — dari aplikasi cuaca hingga e-commerce seperti Tokopedia dan Shopee.</p>
<p>Dengan REST API, frontend (website/aplikasi) bisa mengambil, mengirim, mengubah, dan menghapus data di server tanpa harus tahu detail implementasinya. Inilah yang membuat pengembangan aplikasi bisa dilakukan secara terpisah antara tim frontend dan backend.</p>

<h2>HTTP Methods: Bahasa Komunikasi REST API</h2>
<p>REST API menggunakan metode HTTP standar untuk berbagai operasi:</p>

<table>
  <thead>
    <tr><th>HTTP Method</th><th>Operasi</th><th>Contoh</th></tr>
  </thead>
  <tbody>
    <tr><td>GET</td><td>Membaca data</td><td>GET /api/products — ambil daftar produk</td></tr>
    <tr><td>POST</td><td>Membuat data baru</td><td>POST /api/products — tambah produk baru</td></tr>
    <tr><td>PUT</td><td>Update data (seluruhnya)</td><td>PUT /api/products/1 — update produk ID 1</td></tr>
    <tr><td>PATCH</td><td>Update data (sebagian)</td><td>PATCH /api/products/1 — update harga saja</td></tr>
    <tr><td>DELETE</td><td>Menghapus data</td><td>DELETE /api/products/1 — hapus produk ID 1</td></tr>
  </tbody>
</table>

<h2>Anatomi Request dan Response</h2>

<h3>Request</h3>
<pre><code>POST /api/users HTTP/1.1
Host: api.bimble.id
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "password": "rahasia123"
}
</code></pre>

<h3>Response</h3>
<pre><code>HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 42,
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "createdAt": "2024-01-15T08:30:00Z"
}
</code></pre>

<h2>HTTP Status Codes yang Harus Diketahui</h2>
<ul>
  <li><strong>200 OK</strong> — Request berhasil</li>
  <li><strong>201 Created</strong> — Data berhasil dibuat</li>
  <li><strong>204 No Content</strong> — Berhasil, tidak ada data untuk dikembalikan (biasanya DELETE)</li>
  <li><strong>400 Bad Request</strong> — Request tidak valid (data kurang atau salah format)</li>
  <li><strong>401 Unauthorized</strong> — Tidak terautentikasi (belum login)</li>
  <li><strong>403 Forbidden</strong> — Terautentikasi tapi tidak punya izin</li>
  <li><strong>404 Not Found</strong> — Resource tidak ditemukan</li>
  <li><strong>422 Unprocessable Entity</strong> — Validasi data gagal</li>
  <li><strong>500 Internal Server Error</strong> — Error di sisi server</li>
</ul>

<h2>Memanggil REST API dari JavaScript</h2>

<h3>Menggunakan Fetch API (Built-in Browser)</h3>
<pre><code>// GET request
const response = await fetch('https://api.bimble.id/public/courses')
const data = await response.json()
console.log(data)

// POST request dengan autentikasi
const response = await fetch('https://api.bimble.id/public/enroll/1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${token}\`
  },
  body: JSON.stringify({ courseId: 1 })
})

if (!response.ok) {
  throw new Error(\`HTTP error! status: \${response.status}\`)
}

const result = await response.json()
</code></pre>

<h3>Menggunakan Axios (Library Populer)</h3>
<pre><code>import axios from 'axios'

// Konfigurasi base URL
const api = axios.create({
  baseURL: 'https://api.bimble.id',
  headers: {
    'Authorization': \`Bearer \${localStorage.getItem('token')}\`
  }
})

// GET request
const { data } = await api.get('/public/courses')

// POST request
const { data: newCourse } = await api.post('/admin/courses', {
  name: 'JavaScript Dasar',
  price: 299000
})
</code></pre>

<h2>Prinsip-Prinsip REST yang Baik</h2>
<ol>
  <li><strong>Stateless</strong> — Setiap request harus self-contained, server tidak menyimpan state client</li>
  <li><strong>Resource-Based URL</strong> — URL merepresentasikan resource, bukan aksi (/users bukan /getUsers)</li>
  <li><strong>Konsistensi</strong> — Gunakan naming convention yang konsisten (plural noun: /courses, /videos)</li>
  <li><strong>Versioning</strong> — /api/v1/courses untuk memungkinkan perubahan tanpa breaking change</li>
  <li><strong>Proper Status Codes</strong> — Gunakan HTTP status code yang tepat</li>
</ol>

<h2>Tools untuk Testing API</h2>
<ul>
  <li><strong>Postman</strong> — GUI tool paling populer untuk testing API</li>
  <li><strong>Thunder Client</strong> — Ekstensi VS Code ringan untuk testing API</li>
  <li><strong>curl</strong> — Command-line tool untuk testing dari terminal</li>
  <li><strong>Insomnia</strong> — Alternatif Postman yang lebih ringan</li>
</ul>`,
        excerpt: 'Penjelasan lengkap tentang REST API untuk pemula. Pelajari HTTP methods, status codes, cara memanggil API dari JavaScript, dan prinsip-prinsip REST yang baik.',
        coverImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
        tags: 'REST API, Backend, JavaScript, HTTP, Tutorial',
        status: 'published',
        publishedAt: d(20),
        viewCount: 4125,
        AuthorId: 1,
        createdAt: d(20),
        updatedAt: d(20),
      },
      {
        title: 'TypeScript untuk Pemula: Mengapa Developer JavaScript Harus Berpindah?',
        slug: 'typescript-untuk-pemula-mengapa-developer-javascript-harus-berpindah',
        content: `<h2>Apa itu TypeScript?</h2>
<p>TypeScript adalah superset dari JavaScript yang dikembangkan oleh Microsoft. Artinya, semua kode JavaScript yang valid juga merupakan kode TypeScript yang valid. TypeScript menambahkan sistem tipe statis (static type system) ke JavaScript yang membantu mendeteksi bug lebih awal — sebelum kode dijalankan.</p>
<p>Bayangkan kamu memiliki asisten yang memeriksa pekerjaanmu sebelum diserahkan. TypeScript adalah asisten tersebut untuk kode JavaScript.</p>

<h2>Masalah yang Dipecahkan TypeScript</h2>
<p>JavaScript bersifat dynamically typed — variabel bisa berubah tipe kapan saja:</p>
<pre><code>// JavaScript — tidak ada error, tapi hasil salah
function tambah(a, b) {
  return a + b
}

tambah(5, 3)       // 8 — benar ✅
tambah("5", 3)     // "53" — string concatenation! ❌
tambah(null, 3)    // 3 — null dikonversi ke 0 ❌
</code></pre>

<p>Dengan TypeScript, bug seperti ini terdeteksi saat compile:</p>
<pre><code>// TypeScript — error langsung terdeteksi
function tambah(a: number, b: number): number {
  return a + b
}

tambah(5, 3)       // 8 ✅
tambah("5", 3)     // Error: Argument of type 'string' is not assignable to parameter of type 'number' ❌
</code></pre>

<h2>Fitur-Fitur Utama TypeScript</h2>

<h3>1. Type Annotations</h3>
<pre><code>// Basic types
let nama: string = "Budi"
let umur: number = 25
let isActive: boolean = true
let data: null = null
let belumDiinisialisasi: undefined = undefined

// Array
let angka: number[] = [1, 2, 3, 4, 5]
let kata: Array&lt;string&gt; = ["halo", "dunia"]

// Tuple
let koordinat: [number, number] = [6.2088, 106.8456]
</code></pre>

<h3>2. Interface</h3>
<pre><code>interface User {
  id: number
  name: string
  email: string
  role: "Admin" | "User"  // Union type
  phone?: string           // Optional property
}

function printUser(user: User): void {
  console.log(\`\${user.name} (\${user.email})\`)
}

const budi: User = {
  id: 1,
  name: "Budi",
  email: "budi@example.com",
  role: "User"
}
</code></pre>

<h3>3. Type Alias</h3>
<pre><code>type Status = "active" | "inactive" | "pending"
type ID = string | number

type Course = {
  id: ID
  name: string
  price: number
  status: Status
}
</code></pre>

<h3>4. Generics</h3>
<pre><code>// Function yang bekerja dengan berbagai tipe
function firstItem&lt;T&gt;(arr: T[]): T | undefined {
  return arr[0]
}

firstItem([1, 2, 3])        // number
firstItem(["a", "b", "c"]) // string
firstItem([true, false])   // boolean

// Generic dengan constraint
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {
  return obj[key]
}
</code></pre>

<h3>5. Enums</h3>
<pre><code>enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}

function getCourse(difficulty: Difficulty) {
  // ...
}

getCourse(Difficulty.Easy)  // ✅
getCourse("mudah")          // ❌ Error
</code></pre>

<h2>TypeScript di Proyek Nyata</h2>

<h3>Setup TypeScript di Node.js</h3>
<pre><code>npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init

# tsconfig.json akan dibuat otomatis
# Edit target dan module sesuai kebutuhan
</code></pre>

<h3>TypeScript dengan Vue.js 3</h3>
<pre><code>&lt;script setup lang="ts"&gt;
import { ref, computed } from 'vue'

interface Course {
  id: number
  name: string
  price: number
}

const courses = ref&lt;Course[]&gt;([])
const totalHarga = computed(() =&gt;
  courses.value.reduce((sum, c) =&gt; sum + c.price, 0)
)
&lt;/script&gt;
</code></pre>

<h2>Apakah TypeScript Wajib?</h2>
<p>TypeScript menjadi semakin populer dan banyak perusahaan menggunakannya sebagai standar. Survei State of JS 2023 menunjukkan 95% developer yang menggunakan TypeScript melaporkan kepuasan yang tinggi dan tidak ingin kembali ke JavaScript biasa.</p>
<p>Untuk proyek besar dengan tim banyak, TypeScript sangat disarankan karena membuat kode lebih mudah dipelihara dan bug lebih mudah ditemukan.</p>`,
        excerpt: 'Panduan TypeScript untuk developer JavaScript. Pelajari mengapa TypeScript penting, fitur-fitur utamanya seperti type annotations, interface, generics, dan cara menggunakannya di proyek nyata.',
        coverImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
        tags: 'TypeScript, JavaScript, Tutorial, Web Development, Pemula',
        status: 'published',
        publishedAt: d(18),
        viewCount: 3891,
        AuthorId: 1,
        createdAt: d(18),
        updatedAt: d(18),
      },
      {
        title: 'Panduan Git untuk Pemula: Perintah-Perintah yang Wajib Dikuasai',
        slug: 'panduan-git-untuk-pemula-perintah-wajib-dikuasai',
        content: `<h2>Mengapa Git Wajib Dipelajari?</h2>
<p>Git adalah sistem version control yang digunakan oleh hampir semua developer profesional di seluruh dunia. Tanpa Git, kamu harus menyimpan salinan proyek secara manual ("proyek_final", "proyek_final_v2", "proyek_final_beneran") — sesuatu yang tidak efisien dan rawan kesalahan.</p>
<p>Dengan Git, kamu bisa: menyimpan riwayat perubahan kode, kembali ke versi sebelumnya jika ada bug, berkolaborasi dengan tim tanpa saling menimpa pekerjaan, dan berkontribusi ke proyek open-source di GitHub.</p>

<h2>Pemasangan dan Konfigurasi Awal</h2>
<pre><code># Install Git dari git-scm.com
# Verifikasi instalasi
git --version

# Konfigurasi identitas (wajib!)
git config --global user.name "Nama Kamu"
git config --global user.email "email@example.com"

# Lihat konfigurasi
git config --list
</code></pre>

<h2>Alur Kerja Git Dasar</h2>

<h3>Membuat Repository Baru</h3>
<pre><code># Inisialisasi repo baru di folder yang ada
mkdir proyek-baru
cd proyek-baru
git init

# Atau clone repo yang sudah ada dari GitHub
git clone https://github.com/username/nama-repo.git
</code></pre>

<h3>Siklus Kerja Harian</h3>
<pre><code># 1. Lihat status perubahan
git status

# 2. Tambahkan file ke staging area
git add nama-file.js        # file spesifik
git add .                   # semua perubahan

# 3. Commit perubahan
git commit -m "Tambah fitur login"

# 4. Push ke remote (GitHub/GitLab)
git push origin main

# 5. Pull perubahan terbaru dari tim
git pull origin main
</code></pre>

<h2>Branching: Fitur Terpenting Git</h2>
<p>Branch memungkinkan kamu bekerja pada fitur baru tanpa mengganggu kode utama (main branch). Ini adalah cara kerja profesional di semua tim software.</p>

<pre><code># Lihat semua branch
git branch -a

# Buat branch baru dan langsung pindah
git checkout -b fitur/halaman-login

# Cara modern (Git 2.23+)
git switch -c fitur/halaman-login

# Pindah ke branch lain
git checkout main
git switch main

# Merge branch ke main
git checkout main
git merge fitur/halaman-login

# Hapus branch setelah di-merge
git branch -d fitur/halaman-login
</code></pre>

<h2>Mengatasi Konflik Merge</h2>
<p>Konflik terjadi ketika dua branch mengubah baris yang sama. Git akan menandai konflik:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD (perubahan kamu)
function hitung(a, b) { return a + b }
=======
function hitung(a, b) { return a * b }
&gt;&gt;&gt;&gt;&gt;&gt;&gt; fitur/kalkulator (perubahan branch lain)
</code></pre>
<p>Pilih kode yang benar, hapus marker konflik, lalu commit.</p>

<h2>Perintah Git yang Sering Digunakan</h2>

<h3>Melihat Riwayat</h3>
<pre><code>git log                    # Riwayat lengkap
git log --oneline          # Ringkas satu baris
git log --graph --oneline  # Visualisasi branch
</code></pre>

<h3>Membatalkan Perubahan</h3>
<pre><code># Batalkan perubahan yang belum di-stage
git restore nama-file.js

# Batalkan staging (unstage)
git restore --staged nama-file.js

# Kembali ke commit tertentu (HATI-HATI!)
git reset --hard abc1234
</code></pre>

<h3>Stash: Simpan Perubahan Sementara</h3>
<pre><code># Simpan perubahan yang belum selesai
git stash

# Kembalikan stash terakhir
git stash pop

# Lihat semua stash
git stash list
</code></pre>

<h2>Git Flow: Workflow Profesional</h2>
<p>Git Flow adalah strategi branching yang populer di tim profesional:</p>
<ul>
  <li><strong>main</strong> — kode production yang stable</li>
  <li><strong>develop</strong> — integrasi fitur-fitur terbaru</li>
  <li><strong>feature/*</strong> — pengembangan fitur baru</li>
  <li><strong>hotfix/*</strong> — perbaikan bug mendesak di production</li>
  <li><strong>release/*</strong> — persiapan rilis versi baru</li>
</ul>

<h2>Tips Git untuk Developer Indonesia</h2>
<ol>
  <li>Commit sering dengan pesan yang deskriptif</li>
  <li>Gunakan .gitignore untuk mengecualikan file sensitif (.env, node_modules)</li>
  <li>Jangan commit password atau API key ke repo publik</li>
  <li>Review perubahan sebelum push: <code>git diff</code></li>
  <li>Gunakan SSH key untuk koneksi aman ke GitHub</li>
</ol>`,
        excerpt: 'Panduan Git lengkap untuk pemula. Pelajari perintah-perintah dasar Git, cara branching, mengatasi konflik, dan workflow profesional yang digunakan tim software di seluruh dunia.',
        coverImageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200',
        tags: 'Git, GitHub, Version Control, Tutorial, Developer',
        status: 'published',
        publishedAt: d(15),
        viewCount: 5217,
        AuthorId: 1,
        createdAt: d(15),
        updatedAt: d(15),
      },
      {
        title: 'Docker untuk Developer: Mulai Containerisasi Aplikasimu',
        slug: 'docker-untuk-developer-mulai-containerisasi-aplikasi',
        content: `<h2>Apa itu Docker?</h2>
<p>Docker adalah platform containerisasi yang memungkinkan kamu mengemas aplikasi beserta semua dependensinya ke dalam sebuah "container" yang portabel. Container ini bisa berjalan di mana saja — laptop, server, cloud — tanpa masalah kompatibilitas.</p>
<p>Kamu pernah mengalami situasi "di komputer saya jalan, tapi di server tidak"? Docker menyelesaikan masalah ini selamanya.</p>

<h2>Perbedaan Container vs Virtual Machine</h2>
<p>Virtual Machine (VM) membutuhkan seluruh sistem operasi baru untuk setiap instance — memakan banyak memori dan disk. Container berbagi kernel OS host, sehingga jauh lebih ringan dan cepat.</p>

<h2>Instalasi Docker</h2>
<pre><code># Download Docker Desktop dari docker.com
# Verifikasi instalasi
docker --version
docker run hello-world
</code></pre>

<h2>Konsep Dasar Docker</h2>

<h3>Image dan Container</h3>
<ul>
  <li><strong>Image</strong> — Blueprint/template yang berisi OS, runtime, dan aplikasi. Bersifat immutable.</li>
  <li><strong>Container</strong> — Instance yang sedang berjalan dari sebuah image. Bersifat ephemeral (sementara).</li>
</ul>

<h3>Perintah Dasar Docker</h3>
<pre><code># Tarik image dari Docker Hub
docker pull node:20-alpine

# Jalankan container
docker run -it node:20-alpine sh

# Lihat container yang berjalan
docker ps

# Lihat semua container (termasuk yang berhenti)
docker ps -a

# Stop container
docker stop container-id

# Hapus container
docker rm container-id

# Lihat semua image
docker images

# Hapus image
docker rmi image-id
</code></pre>

<h2>Dockerfile: Membuat Image Custom</h2>
<pre><code># Dockerfile untuk aplikasi Node.js
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
</code></pre>

<pre><code># Build image
docker build -t bimble-api:latest .

# Jalankan container dari image custom
docker run -p 3000:3000 -e NODE_ENV=production bimble-api:latest
</code></pre>

<h2>Docker Compose: Multi-Container Setup</h2>
<p>Docker Compose memungkinkan kamu mendefinisikan dan menjalankan multiple container sekaligus — sangat berguna untuk menjalankan API + database + cache bersama-sama.</p>
<pre><code># docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/bimble
      - NODE_ENV=development
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: bimble
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres-data:
</code></pre>

<pre><code># Jalankan semua service
docker compose up -d

# Lihat log
docker compose logs -f

# Hentikan semua service
docker compose down
</code></pre>

<h2>Best Practices Docker</h2>
<ol>
  <li>Gunakan image Alpine untuk ukuran lebih kecil (<code>node:20-alpine</code> bukan <code>node:20</code>)</li>
  <li>Manfaatkan layer caching — copy package.json sebelum source code</li>
  <li>Jangan jalankan container sebagai root user</li>
  <li>Gunakan multi-stage build untuk production image yang lebih kecil</li>
  <li>Simpan secret di environment variables, bukan di Dockerfile</li>
</ol>`,
        excerpt: 'Panduan Docker untuk developer. Pelajari konsep container, cara membuat Dockerfile, menggunakan Docker Compose untuk multi-container setup, dan best practices containerisasi aplikasi.',
        coverImageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200',
        tags: 'Docker, DevOps, Containerization, Tutorial, Backend',
        status: 'published',
        publishedAt: d(12),
        viewCount: 3456,
        AuthorId: 1,
        createdAt: d(12),
        updatedAt: d(12),
      },
      {
        title: 'Tips Lolos Technical Interview di Perusahaan Teknologi Indonesia',
        slug: 'tips-lolos-technical-interview-perusahaan-teknologi-indonesia',
        content: `<h2>Realita Technical Interview di Indonesia</h2>
<p>Technical interview di perusahaan teknologi Indonesia berbeda-beda tergantung level dan perusahaan. Startup tahap awal mungkin hanya satu sesi coding test, sementara unicorn seperti Gojek atau Tokopedia bisa memiliki 4-6 tahap interview selama 2-4 minggu.</p>
<p>Artikel ini berisi strategi yang terbukti efektif berdasarkan pengalaman nyata developer Indonesia yang sudah melewati proses rekrutmen di berbagai perusahaan teknologi.</p>

<h2>Tahapan Umum Technical Interview</h2>
<ol>
  <li><strong>Online Assessment</strong> — Test coding online di HackerRank, Codility, atau platform khusus perusahaan (1-2 jam)</li>
  <li><strong>Phone/Video Screen</strong> — Diskusi teknis singkat dengan recruiter atau engineer (30-45 menit)</li>
  <li><strong>Technical Interview</strong> — Live coding dan diskusi arsitektur dengan engineer senior (60-90 menit)</li>
  <li><strong>System Design Interview</strong> — Merancang sistem skala besar (untuk level mid-senior, 60-90 menit)</li>
  <li><strong>Culture Fit / HR Interview</strong> — Diskusi soft skill, motivasi, dan nilai perusahaan</li>
</ol>

<h2>Persiapan Algoritma dan Struktur Data</h2>
<p>Ini adalah bagian yang paling ditakuti, tapi bisa diatasi dengan latihan terstruktur.</p>

<h3>Topik yang Sering Muncul</h3>
<ul>
  <li><strong>Array dan String</strong> — Two pointers, sliding window, prefix sum</li>
  <li><strong>Hash Map/Set</strong> — Untuk lookup O(1)</li>
  <li><strong>Stack dan Queue</strong> — Valid parentheses, BFS, monotonic stack</li>
  <li><strong>Binary Search</strong> — Search di sorted array dan masalah optimization</li>
  <li><strong>Linked List</strong> — Fast/slow pointers, reverse, detect cycle</li>
  <li><strong>Tree dan Graph</strong> — DFS, BFS, binary search tree</li>
  <li><strong>Dynamic Programming</strong> — Memoization, tabulation untuk optimasi</li>
</ul>

<h3>Contoh Soal dan Solusi</h3>
<pre><code>// Soal: Two Sum
// Cari dua angka dalam array yang jumlahnya = target
// Input: [2, 7, 11, 15], target = 9
// Output: [0, 1] (karena 2 + 7 = 9)

function twoSum(nums, target) {
  const map = new Map()

  for (let i = 0; i &lt; nums.length; i++) {
    const complement = target - nums[i]

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(nums[i], i)
  }

  return []
}
</code></pre>

<h2>Framework STAR untuk Behavioral Interview</h2>
<p>Selain coding, kamu akan ditanya pertanyaan perilaku. Gunakan framework STAR:</p>
<ul>
  <li><strong>S</strong>ituation — Konteks situasinya apa?</li>
  <li><strong>T</strong>ask — Tugasmu apa?</li>
  <li><strong>A</strong>ction — Apa yang kamu lakukan?</li>
  <li><strong>R</strong>esult — Hasilnya apa? (dengan angka jika bisa)</li>
</ul>

<p>Contoh: "Ceritakan saat kamu harus menyelesaikan proyek dengan deadline ketat."</p>

<h2>Tips untuk Live Coding Session</h2>
<ol>
  <li><strong>Berpikir keras</strong> — Verbalize pemikiranmu. Interviewer ingin tahu cara berpikirmu, bukan hanya solusinya.</li>
  <li><strong>Klarifikasi soal</strong> — Tanya edge cases sebelum mulai coding</li>
  <li><strong>Mulai dengan brute force</strong> — Solusi O(n²) yang benar lebih baik dari solusi O(n) yang tidak selesai</li>
  <li><strong>Optimasi setelah</strong> — Diskusikan kompleksitas waktu/ruang dan cara optimasinya</li>
  <li><strong>Test dengan contoh</strong> — Jalankan kode secara manual dengan input yang kamu buat</li>
</ol>

<h2>Persiapan System Design (Mid-Senior)</h2>
<p>Untuk posisi mid-senior, kamu akan diminta merancang sistem skala besar. Kuasai konsep:</p>
<ul>
  <li>Load balancing dan horizontal scaling</li>
  <li>Caching (Redis, CDN)</li>
  <li>Database sharding dan replication</li>
  <li>Message queue (Kafka, RabbitMQ)</li>
  <li>Microservices vs monolith</li>
  <li>CAP theorem dan eventual consistency</li>
</ul>

<h2>Resources untuk Persiapan</h2>
<ul>
  <li>LeetCode — latihan soal algoritma (gratis, Premium untuk soal perusahaan spesifik)</li>
  <li>NeetCode.io — roadmap dan video penjelasan soal LeetCode</li>
  <li>System Design Primer (GitHub) — panduan gratis system design</li>
  <li>Pramp — platform mock interview gratis dengan developer lain</li>
</ul>`,
        excerpt: 'Strategi lengkap untuk lolos technical interview di perusahaan teknologi Indonesia. Tips persiapan algoritma, live coding, system design, dan behavioral interview dengan contoh nyata.',
        coverImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
        tags: 'Interview, Karir, Algoritma, Tips Developer, Technical Interview',
        status: 'published',
        publishedAt: d(10),
        viewCount: 8923,
        AuthorId: 1,
        createdAt: d(10),
        updatedAt: d(10),
      },
      {
        title: 'Membangun Portfolio Developer yang Menarik Recruiter',
        slug: 'membangun-portfolio-developer-yang-menarik-recruiter',
        content: `<h2>Mengapa Portfolio Lebih Penting dari Ijazah?</h2>
<p>Di industri teknologi, yang kamu bisa lakukan lebih penting dari mana kamu belajar. Banyak developer sukses di Indonesia yang tidak memiliki latar belakang ilmu komputer, tapi berhasil mendapatkan pekerjaan impian karena memiliki portfolio yang kuat.</p>
<p>Recruiter dan hiring manager menghabiskan rata-rata 7-10 detik untuk melihat CV. Portfolio yang baik bisa membuat mereka menghabiskan 5-10 menit — meningkatkan peluangmu masuk ke tahap interview.</p>

<h2>Apa yang Harus Ada di Portfolio Developer?</h2>

<h3>1. GitHub Profile yang Aktif</h3>
<p>GitHub adalah portfolio utama seorang developer. Pastikan:</p>
<ul>
  <li>Profile picture dan bio yang profesional</li>
  <li>Pinned repositories menampilkan 6 proyek terbaik</li>
  <li>Contribution graph yang hijau (aktif)</li>
  <li>README di setiap repo menjelaskan proyek dengan jelas</li>
</ul>

<h3>2. 3-5 Proyek yang Solid</h3>
<p>Kualitas lebih penting dari kuantitas. Satu proyek yang selesai dengan fitur lengkap lebih baik dari 10 proyek setengah jadi. Proyek yang ideal:</p>
<ul>
  <li>Menyelesaikan masalah nyata yang bisa dijelaskan</li>
  <li>Punya README lengkap dengan screenshot dan instruksi</li>
  <li>Code yang bersih dan terstruktur</li>
  <li>Deployed dan bisa diakses online (bukan hanya di localhost)</li>
  <li>Menggunakan teknologi yang relevan dengan posisi yang dituju</li>
</ul>

<h3>3. Website Portfolio Personal</h3>
<p>Website portfolio menunjukkan kemampuan frontend dan kepribadianmu. Tidak harus mewah — yang penting informatif dan profesional. Sertakan:</p>
<ul>
  <li>Tentang diri (bio singkat, foto profesional)</li>
  <li>Skill dan teknologi yang dikuasai</li>
  <li>Daftar proyek dengan link demo dan GitHub</li>
  <li>Pengalaman kerja atau internship</li>
  <li>Kontak (email, LinkedIn, GitHub)</li>
</ul>

<h2>Ide Proyek Portfolio yang Menonjol</h2>

<h3>Untuk Pemula (0-1 tahun)</h3>
<ol>
  <li><strong>Full-Stack To-Do App</strong> — Simpel tapi tunjukkan CRUD, auth, dan deployment</li>
  <li><strong>Weather App</strong> — Integrasi API eksternal</li>
  <li><strong>E-commerce Mini</strong> — Cart, checkout, payment (bisa pakai Midtrans sandbox)</li>
</ol>

<h3>Untuk Intermediate (1-3 tahun)</h3>
<ol>
  <li><strong>Real-time Chat App</strong> — Socket.io, WebSocket, multiple rooms</li>
  <li><strong>Clone aplikasi populer</strong> — Fitur utama Airbnb, Twitter, atau Reddit</li>
  <li><strong>Aplikasi manajemen keuangan</strong> — Tracker pengeluaran dengan chart/grafik</li>
</ol>

<h3>Yang Membuat Portfolio Berbeda</h3>
<ul>
  <li>Selesaikan aplikasi hingga deployment — bukan hanya localhost</li>
  <li>Tulis blog/artikel teknis di Medium atau Dev.to tentang proyek tersebut</li>
  <li>Kontribusikan bug fix kecil ke proyek open-source yang kamu pakai</li>
  <li>Dokumentasikan journey belajarmu di Twitter/LinkedIn</li>
</ul>

<h2>Cara Deploy Proyek Gratis</h2>
<ul>
  <li><strong>Frontend</strong>: Vercel, Netlify, GitHub Pages</li>
  <li><strong>Backend API</strong>: Railway, Render (free tier), Fly.io</li>
  <li><strong>Database</strong>: Supabase (PostgreSQL), MongoDB Atlas, Railway</li>
  <li><strong>Storage</strong>: Cloudinary (gambar), ImageKit</li>
</ul>

<h2>Kesalahan Umum Portfolio Developer Indonesia</h2>
<ul>
  <li>Hanya menyimpan project tutorial yang sama persis dari YouTube</li>
  <li>Repo kosong atau README yang hanya berisi "ini adalah proyek saya"</li>
  <li>Proyek tidak bisa diakses karena link mati atau server mati</li>
  <li>Terlalu banyak proyek yang tidak selesai</li>
  <li>Portfolio website yang tidak mobile-friendly</li>
</ul>`,
        excerpt: 'Panduan membangun portfolio developer yang menarik perhatian recruiter. Tips proyek portfolio, cara presentasi di GitHub, dan strategi yang efektif untuk mendapatkan pekerjaan pertama sebagai developer.',
        coverImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
        tags: 'Portfolio, Karir Developer, GitHub, Tips, Pemula',
        status: 'published',
        publishedAt: d(8),
        viewCount: 7234,
        AuthorId: 1,
        createdAt: d(8),
        updatedAt: d(8),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {})
  },
}
