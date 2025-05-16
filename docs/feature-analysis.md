# Feature Analysis - Sistem Pembayaran Pajak Online

---

## Feature Mapping Table

| Req ID | Nama Fitur                    | Deskripsi Teknis                                                                       | Backend (API)                           | Frontend (Komponen/Validasi)               | Test yang Relevan                                   |
| ------ | ----------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| FR00   | Autentikasi Nama & KTP        | Form input wajib nama & nomor KTP (16 digit numerik); validasi real-time               | `/auth/verify` (POST)                   | `AuthForm.jsx`, validasi input saat ketik  | Unit (validasi), API (verifikasi), E2E (login flow) |
| FR01   | Dropdown Jenis Pajak          | Dropdown menampilkan daftar pajak dari frontend atau API (statis/dinamis)              | (opsional: `/tax/types`)                | `TaxForm.jsx`, <select>                    | E2E (pilih jenis pajak), Unit test dropdown         |
| FR02   | Validasi Jumlah Pajak Positif | Input hanya menerima angka > 0; validasi ganda (frontend + backend)                    | Validasi `amount > 0`                   | `TaxForm.jsx` + helper `validateAmount.js` | Unit (validasi), E2E (input positif/negatif)        |
| FR03   | Referensi Unik Pembayaran     | Nomor referensi format `TAXYYYY-ID`, ID autoincrement atau UUID unik                   | `generateReferenceNumber()` + DB insert | Ditampilkan di `ReceiptPage.jsx`           | Backend test ID, E2E kirim data dan lihat referensi |
| FR04   | Bukti Pembayaran              | Menampilkan nomor referensi, jenis pajak, jumlah, tanggal (dari hasil respons backend) | `/payment/submit` (POST) → return JSON  | `ReceiptPage.jsx`                          | E2E (verifikasi output lengkap)                     |
| FR05   | Pesan Error Validasi          | Tampilkan error jika jumlah kosong, non-numerik, atau negatif                          | Validasi input di API                   | Notifikasi error via form feedback UI      | Negative test (UI + API), Unit test                 |
| FR06   | Tombol “Kembali”              | Mengarahkan pengguna kembali ke form awal, reset semua input                           | Tidak diperlukan API                    | Button reset di `ReceiptPage.jsx`          | E2E (navigasi ulang dan input baru)                 |

---

## Non-Functional Mapping

| Req ID | Fokus              | Deskripsi Teknis Implementasi                                                       | Pengujian QA yang Direkomendasikan          |
| ------ | ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------- |
| NFR01  | Performa           | API response time < 2 detik, gunakan caching/database index                         | Load test (JMeter, k6), Stopwatch timing    |
| NFR02  | Responsiveness     | Gunakan media queries / flex layout / responsive CSS framework (Tailwind/Bootstrap) | Manual test multi-device / Browser DevTools |
| NFR03  | Validasi Real-time | Validasi di event `onChange` dan `onBlur` untuk input                               | Frontend unit test + E2E feedback timing    |
| NFR04  | Kapasitas Minimum  | Database/queue mendukung ≥ 100 transaksi/hari                                       | Simulasi input beruntun (batch test)        |

---

## Catatan Implementasi Tambahan

- Validasi nomor KTP sebaiknya menyaring karakter non-numerik secara langsung saat input.
- Nomor referensi sebaiknya di-_lock_ oleh backend, tidak ditentukan dari frontend.
- Perlu retry mechanism atau notifikasi jika koneksi saat submit gagal.

---

## Rencana Penurunan ke Pengujian

- **Unit Test**:

  - Validasi input: KTP, jumlah pajak
  - Fungsi `generateReferenceNumber()`

- **API Test (Postman/REST)**:

  - Submit form dengan data benar/salah
  - Respons waktu, format JSON hasil submit

- **End-to-End (Cypress)**:
  - Alur: login → isi form → submit → lihat bukti → kembali
  - Kasus gagal: kosong, negatif, non-angka
