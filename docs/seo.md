# Fitur: SEO & Artikel

## Overview
Implementasi SEO komprehensif untuk Bimble.id mencakup konten artikel, dynamic meta tags, Open Graph, sitemap, robots.txt, dan structured data (JSON-LD).

---

## 1. Fitur Artikel

### Database
Tabel `Articles`:
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| title | STRING | Judul artikel |
| slug | STRING (unique) | URL-friendly identifier |
| content | TEXT | Konten HTML |
| excerpt | TEXT | Ringkasan untuk SEO/preview |
| coverImageUrl | STRING | URL gambar cover |
| tags | STRING | Comma-separated tags |
| status | ENUM | draft / published |
| publishedAt | DATE | Tanggal publikasi |
| viewCount | INTEGER | Jumlah view |
| AuthorId | INTEGER | FK ke Users |

### API Endpoints

**Public:**
- `GET /public/articles` — list artikel published (page, search, tag)
- `GET /public/articles/:slug` — detail + increment viewCount

**Admin (JWT + Admin role):**
- `GET /admin/articles` — list semua artikel
- `GET /admin/articles/:id` — detail
- `POST /admin/articles` — buat artikel baru
- `PUT /admin/articles/:id` — update
- `PATCH /admin/articles/:id/status` — toggle draft/published
- `DELETE /admin/articles/:id` — hapus

### Frontend Pages
- `/articles` — listing dengan search dan filter tag
- `/articles/:slug` — halaman detail artikel
- `/admin/articles` — admin list view
- `/admin/articles/add` — buat artikel baru
- `/admin/articles/:id/edit` — edit artikel

---

## 2. Dynamic Meta Tags + Open Graph

Composable `useSeoMeta(options)` di `client/src/composables/useSeoMeta.js`:

```js
// Contoh penggunaan:
useSeoMeta({
  title: 'Judul Halaman',          // → "Judul Halaman | Bimble.id"
  description: 'Deskripsi...',
  image: 'https://...',            // og:image, twitter:image
  keywords: 'kata, kunci',
  type: 'article',                  // og:type (default: 'website')
})

// Untuk data dinamis:
const seoOptions = computed(() => data.value ? {
  title: data.value.name,
  description: data.value.description,
} : null)
useSeoMeta(seoOptions)
```

**Tags yang di-set:**
- `<title>` — dokumen
- `meta[name="description"]`
- `meta[name="keywords"]`
- `meta[property="og:title"]`
- `meta[property="og:description"]`
- `meta[property="og:image"]`
- `meta[property="og:url"]`
- `meta[property="og:type"]`
- `meta[property="og:site_name"]`
- `meta[name="twitter:card"]`
- `meta[name="twitter:title"]`
- `meta[name="twitter:description"]`
- `meta[name="twitter:image"]`

---

## 3. Sitemap.xml

`GET /sitemap.xml` (Express) — auto-generated dari database.

Berisi semua URL publik:
- Halaman statis (/, /courses, /articles, /roadmaps, /about)
- Semua kursus aktif (/courses/:id)
- Semua artikel published (/articles/:slug)
- Semua roadmaps (/roadmaps/:id)

**Daftarkan ke Google Search Console:**
`https://bimble.id/sitemap.xml`

---

## 4. Robots.txt

`GET /robots.txt` (Express) — blokir halaman private dari crawler.

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /my-courses
...
Sitemap: https://bimble.id/sitemap.xml
```

---

## 5. JSON-LD Structured Data

Composable `useJsonLd(schema)` di `client/src/composables/useJsonLd.js`.

Digunakan di:
- `HomeView.vue` — Organization schema
- `CourseDetailView.vue` — Course schema (dynamic)
- `ArticleDetailView.vue` — BlogPosting schema (dynamic)

---

## Checklist SEO

- [x] Dynamic `<title>` per halaman
- [x] `<meta name="description">` per halaman
- [x] Open Graph tags (og:title, og:image, dll)
- [x] Twitter Card tags
- [x] Sitemap.xml auto-generated
- [x] Robots.txt
- [x] JSON-LD structured data (Organization, Course, BlogPosting)
- [x] Konten artikel untuk target keyword
- [ ] Prerendering (Tier 3 — masa depan)
- [ ] Migrasi ke Nuxt (Tier 3 — masa depan)
