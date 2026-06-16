# Fitur: Auto Certificate

## Overview
Fitur ini memungkinkan user untuk mendapatkan sertifikat penyelesaian kursus dalam format HTML yang bisa diprint sebagai PDF melalui browser. Tidak ada library PDF eksternal yang digunakan — sertifikat di-generate sebagai HTML berdesain branded Bimble.id dan bisa diprint via Ctrl+P browser.

## Database
Tabel baru: `Certificates`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INTEGER | Primary key, auto increment |
| UserId | INTEGER | FK ke Users (CASCADE delete) |
| CourseId | INTEGER | FK ke Courses (CASCADE delete) |
| certificateNumber | STRING | Nomor unik sertifikat (BIMBLE-0001-0001-XXXXX) |
| issuedAt | DATE | Tanggal terbit sertifikat |
| createdAt | DATE | Timestamp dibuat |
| updatedAt | DATE | Timestamp diupdate |

Constraint unik: `(UserId, CourseId)` — satu user hanya bisa punya satu sertifikat per kursus.

## Syarat Mendapatkan Sertifikat
- User harus sudah membeli kursus (`isPaid = true`)
- Sertifikat hanya dibuat sekali — request berikutnya mengambil data yang sudah ada (idempotent)

## API Endpoints
| Method | URL | Auth | Deskripsi |
|--------|-----|------|-----------|
| GET | `/public/certificates/:courseId` | JWT | Tampilkan HTML sertifikat (printable/saveable as PDF) |
| GET | `/public/certificates/:courseId/info` | JWT | Info sertifikat (sudah ada / belum, nomor, tanggal) |

### Catatan Auth
Kedua endpoint membutuhkan JWT. Token bisa dikirim via:
- Header `access_token`
- Header `Authorization: Bearer <token>`
- Query param `?access_token=<token>` (digunakan saat buka tab baru via `window.open`)

### Response `GET /public/certificates/:courseId`
HTML document (Content-Type: text/html) — langsung bisa diprint sebagai PDF via browser.

### Response `GET /public/certificates/:courseId/info`
```json
{
  "hasCertificate": true,
  "certificate": {
    "certificateNumber": "BIMBLE-0001-0003-LXYZ123",
    "issuedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Error Responses
| Error | Status | Pesan |
|-------|--------|-------|
| `CertificateNotEligible` | 403 | You must purchase this course to get a certificate |
| `CertificateNotFound` | 404 | Certificate not found |

## Format Nomor Sertifikat
```
BIMBLE-{userId4digit}-{courseId4digit}-{timestamp_base36_uppercase}
```
Contoh: `BIMBLE-0001-0003-LXYZ123`

- userId dan courseId di-pad dengan leading zeros ke 4 digit
- Timestamp dalam base36 uppercase untuk keunikan

## Cara Print PDF
1. Buka halaman `/certificates/:courseId` di frontend
2. Klik tombol "Lihat & Print Sertifikat" (atau "Terbitkan & Lihat Sertifikat" jika belum ada)
3. Sertifikat akan terbuka di tab baru
4. Tekan **Ctrl+P** (Windows/Linux) atau **Cmd+P** (Mac)
5. Pilih **"Save as PDF"** sebagai printer
6. Klik Print / Save

## File-file yang Diubah/Dibuat

### Backend
- `server/migrations/20240101000015-create-certificates.js` — Migration tabel Certificates
- `server/src/models/certificate.js` — Model Sequelize Certificate
- `server/src/helpers/certificate.js` — Helper generate nomor & HTML sertifikat
- `server/src/controllers/public/CertificateController.js` — Controller endpoint sertifikat
- `server/src/routes/publicRouter.js` — Tambah routes certificate
- `server/src/middlewares/errorHandler.js` — Tambah error CertificateNotEligible & CertificateNotFound
- `server/src/middlewares/authentication.js` — Tambah support token via query param

### Frontend
- `client/src/views/user/CertificateView.vue` — Halaman info & aksi sertifikat
- `client/src/router/index.js` — Route `/certificates/:courseId`
- `client/src/views/user/MyCourseDetailView.vue` — Tambah tombol "Dapatkan Sertifikat" di sidebar

## Desain Sertifikat
Sertifikat menggunakan desain branded Bimble.id dengan:
- Warna utama: Indigo (#4F46E5) dan Orange (#F97316)
- Font: Poppins (heading) dan Inter (body)
- Border double untuk kesan resmi
- Badge difficulty (Mudah/Sedang/Sulit) dengan warna berbeda
- Ukuran A4 landscape (794px × 562px+) untuk print optimal
