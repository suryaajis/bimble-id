# Fitur: Video Progress Tracking

## Overview
Fitur ini memungkinkan user untuk melacak video mana yang sudah ditonton/diselesaikan dalam sebuah kursus.

## Database
Tabel baru: `UserVideoProgresses`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INTEGER | Primary key |
| UserId | INTEGER | FK ke Users |
| VideoId | INTEGER | FK ke Videos |
| isCompleted | BOOLEAN | Status selesai |
| completedAt | DATE | Waktu selesai |

## API Endpoints
| Method | URL | Auth | Deskripsi |
|--------|-----|------|-----------|
| POST | /public/progress/:videoId/complete | JWT | Tandai video selesai |
| DELETE | /public/progress/:videoId/complete | JWT | Batalkan tanda selesai |
| GET | /public/progress/:courseId | JWT | Ambil progress kursus |

## Response GET /public/progress/:courseId
```json
{
  "totalVideos": 10,
  "completedCount": 4,
  "percentage": 40,
  "completedVideoIds": [1, 2, 3, 4],
  "isCompleted": false
}
```

## Frontend Changes
- Progress bar di halaman My Course Detail
- Checkmark pada video yang sudah selesai di playlist sidebar
- Tombol toggle "Tandai Selesai" / "Tandai Belum Selesai"
- Progress percentage di My Courses grid

## Cara Pakai
1. User membuka kursus yang sudah dibeli
2. Setelah selesai menonton video, klik tombol "Tandai Selesai"
3. Video di sidebar akan tampil dengan checkmark hijau
4. Progress bar di atas terupdate otomatis
5. Di halaman My Courses, progress setiap kursus ditampilkan
