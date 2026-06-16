# Fitur: Telegram Bot

## Overview
Integrasi dengan Telegram Bot untuk mengirimkan reminder belajar harian dan ringkasan progress mingguan ke user.

## Setup Bot
1. Buat bot baru di Telegram dengan @BotFather
2. Jalankan `/newbot` dan ikuti instruksi
3. Salin Bot Token ke `.env`
4. Daftarkan webhook URL: `POST https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://yourapp.com/telegram/webhook`

## Environment Variables
```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
TELEGRAM_BOT_USERNAME=bimbleid_bot
```

## Database Changes
Kolom baru di tabel `Users`:
| Kolom | Tipe | Default |
|-------|------|---------|
| telegramChatId | STRING | null |
| telegramConnectedAt | DATE | null |
| reminderEnabled | BOOLEAN | true |

Tabel baru: `TelegramConnectTokens`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| UserId | INTEGER | FK ke Users |
| token | STRING | Token 32 char hex, unique |
| expiresAt | DATE | 10 menit setelah dibuat |

## API Endpoints
| Method | URL | Auth | Deskripsi |
|--------|-----|------|-----------|
| GET | /public/telegram/status | JWT | Cek status koneksi |
| POST | /public/telegram/connect-token | JWT | Generate token untuk connect |
| PATCH | /public/telegram/reminder | JWT | Toggle reminder on/off |
| DELETE | /public/telegram/disconnect | JWT | Putus koneksi |
| POST | /telegram/webhook | None | Webhook dari Telegram |

## Bot Commands
| Command | Fungsi |
|---------|--------|
| /start <token> | Hubungkan akun Bimble |
| /stop | Matikan reminder |
| /start_reminder | Aktifkan reminder |
| /status | Cek status akun |

## Jadwal Notifikasi
- Reminder harian: 08:00 WIB (01:00 UTC), setiap hari
- Ringkasan mingguan: Minggu 09:00 WIB (02:00 UTC)

## Flow Koneksi
1. User klik "Hubungkan Telegram" di halaman Profil
2. Server generate token sementara (10 menit)
3. User klik deep link → terbuka Telegram Bot
4. Bot terima `/start <token>`, verifikasi token, simpan chatId ke User
5. Bot kirim pesan konfirmasi
