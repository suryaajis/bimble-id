# Fitur: Belajar Bareng (Study Rooms)

## Overview
Ruang belajar virtual real-time menggunakan Socket.io. User bisa bergabung bersama pelajar lain dengan timer Pomodoro tersinkronisasi dan chat sederhana.

## Dependencies Baru
- Server: `socket.io`
- Client: `socket.io-client`

## Arsitektur

### Socket.io Namespace
`/study` — semua koneksi study room menggunakan namespace ini

### Room ID Format
- `course-{courseId}` — room untuk kursus tertentu
- `general-{timestamp}` — room umum

### State (In-Memory)
Tidak menggunakan database — state disimpan di memory server:
```
rooms = Map {
  roomId: {
    participants: Map { socketId: { name, joinedAt } },
    timer: { state, secondsLeft, interval }
  }
}
```
State hilang saat server restart — ini by design untuk simplicity.

## Socket Events

### Client → Server
| Event | Payload | Deskripsi |
|-------|---------|-----------|
| `room:join` | `{ roomId }` | Bergabung ke room |
| `room:leave` | — | Keluar dari room |
| `timer:start` | — | Mulai timer Pomodoro |
| `timer:reset` | — | Reset timer |
| `chat:message` | `{ text }` | Kirim pesan |

### Server → Client
| Event | Payload | Deskripsi |
|-------|---------|-----------|
| `room:state` | `{ participants, timer }` | State room saat join |
| `room:participants` | `[...]` | Update daftar peserta |
| `timer:tick` | `{ secondsLeft, state }` | Update timer setiap detik |
| `timer:phase` | `{ phase, secondsLeft }` | Ganti fase (work/break) |
| `timer:started` | `{ startedBy }` | Timer dimulai oleh siapa |
| `timer:reset` | `{ secondsLeft, state }` | Timer di-reset |
| `chat:message` | `{ id, text, author, timestamp }` | Pesan baru |

## Pomodoro Timer
- Sesi Fokus: 25 menit
- Sesi Istirahat: 5 menit
- Auto-switch antara work dan break
- Chat dinonaktifkan saat sesi fokus

## API Endpoint
`GET /public/study-rooms` — list room yang sedang aktif (requires auth)

## Cara Setup
1. Install dependencies: `cd server && npm install socket.io && cd ../client && npm install socket.io-client`
2. Tambahkan `CLIENT_URL` ke `.env`
3. Server sudah otomatis init Socket.io saat start

## Pages
- `/study-rooms` — list semua room aktif
- `/study-rooms/:roomId` — masuk ke room tertentu
