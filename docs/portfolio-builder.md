# Fitur: Portfolio Auto-Builder

## Overview
Halaman publik yang menampilkan pencapaian belajar seorang user. Bisa dibagikan ke recruiter, LinkedIn, atau siapapun tanpa perlu login.

## URL
`/portfolio/:username` — username diambil dari nama user (case-insensitive)

## API Endpoint
`GET /public/portfolio/:username` — public, tidak perlu auth

### Response
```json
{
  "user": { "name": "..." },
  "stats": {
    "totalCourses": 5,
    "totalRoadmaps": 2,
    "completedRoadmaps": 1,
    "averageRating": "8.5",
    "memberSince": "2024-01-01"
  },
  "skills": ["Web Development", "Data Science"],
  "courses": [...],
  "roadmaps": [...]
}
```

## Cara Pakai
1. Login ke Bimble
2. Klik nama kamu di navbar → "Portfolio Saya"
3. Halaman terbuka dengan URL `/portfolio/NamaKamu`
4. Klik "Bagikan Portfolio" untuk salin link
5. Bagikan ke recruiter / LinkedIn

## Data yang Ditampilkan
- Nama user (tidak ada email/info pribadi)
- Total kursus yang sudah dibeli (isPaid=true)
- Skills dari kategori kursus
- Roadmap yang diikuti dan statusnya
- Rata-rata rating yang pernah diberikan
- Tahun bergabung
