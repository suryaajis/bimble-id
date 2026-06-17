# Fitur: Multi-Payment

## Overview
Memperluas metode pembayaran dari OVO saja menjadi mendukung 5 metode:
OVO, GoPay, DANA, ShopeePay, dan QRIS — semuanya via Xendit API.

## Metode Pembayaran yang Didukung

| Metode | Channel Code | Butuh Nomor HP | Tipe |
|--------|-------------|----------------|------|
| OVO | ID_OVO | Ya | E-wallet |
| GoPay | ID_GOPAY | Ya | E-wallet |
| DANA | ID_DANA | Ya | E-wallet |
| ShopeePay | ID_SHOPEEPAY | Tidak | E-wallet |
| QRIS | - | Tidak | QR Code |

## Database Changes
Kolom baru di tabel `UserCourses`:
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| paymentMethod | ENUM | OVO/GOPAY/DANA/SHOPEEPAY/QRIS |

## API Endpoints

### E-Wallet (OVO, GoPay, DANA, ShopeePay)
```
POST /payment/ewallet/charge
Headers: access_token: <jwt>
Body: {
  "userCourseId": 5,
  "paymentMethod": "GOPAY",
  "phoneNumber": "+628123456789"
}
```

### QRIS
```
POST /payment/qris/charge
Headers: access_token: <jwt>
Body: {
  "userCourseId": 5
}
Response: {
  "qr_string": "...",
  "qr_code_url": "https://...image.png",
  "expires_at": "..."
}
```

### Webhook
```
POST /payment/ewallet/status
POST /payment/qris/status
Headers: x-callback-token: <xendit_token>
```

## Backward Compatibility
Route `/ovo/charge` dan `/ovo/status` tetap berjalan untuk kompatibilitas.

## Xendit Dashboard Setup
Daftarkan webhook URLs di Xendit Dashboard:
- E-wallet callback: `https://yourapp.com/payment/ewallet/status`
- QRIS callback: `https://yourapp.com/payment/qris/status`

## Environment Variables Baru
```
CLIENT_URL=https://yourapp.com
```

## Flow Pembayaran
1. User pilih metode pembayaran di BuyView
2. Isi nomor HP (untuk OVO/GoPay/DANA)
3. Klik Bayar → request ke `/payment/ewallet/charge` atau `/payment/qris/charge`
4. Untuk QRIS: scan QR code yang ditampilkan
5. Untuk E-wallet: approve di aplikasi e-wallet
6. Xendit kirim webhook → server set isPaid = true
7. User bisa akses kursus
