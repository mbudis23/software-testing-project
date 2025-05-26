# QA Checklist - Sistem Pembayaran Pajak Online

**Tanggal Mulai Pemeriksaan**: 2025-05-08  
**Versi Aplikasi**: v1.0.0

---

contoh : [x] Nblah blah blah

---

## ✅ Autentikasi

- [ ] Nama dapat diisi dan divalidasi
- [ ] Nomor KTP hanya menerima angka
- [ ] Nomor KTP harus 16 digit
- [ ] Tidak dapat lanjut jika input tidak valid

---

## ✅ Formulir Pajak

- [x] Dropdown jenis pajak menampilkan daftar pilihan
- [x] Jumlah pajak hanya menerima angka positif
- [x] Jumlah kosong, negatif, atau teks ditolak dengan pesan error
- [x] Tombol submit hanya aktif jika input valid

---

## ✅ Referensi & Bukti Pembayaran

- [x] Sistem menghasilkan nomor referensi unik (format: TAXYYYY-XXX)
- [x] Nomor referensi tidak duplikat jika 2 pengajuan bersamaan
- [x] Halaman bukti menampilkan semua informasi dengan benar (jenis, jumlah, tanggal, referensi)
- [ ] Tombol “Kembali” membersihkan formulir dan dapat diisi ulang

---

## ✅ Validasi Real-time

- [ ] Validasi muncul saat pengguna mengetik jumlah pajak
- [ ] Validasi KTP muncul sebelum tombol lanjut diklik
- [ ] Tidak bisa lanjut tanpa input valid

---

## ✅ Performa & Responsivitas

- [x] Waktu submit < 2 detik di koneksi normal
- [x] Tampilan responsif di desktop, tablet, dan smartphone
- [x] Elemen UI tidak bertumpuk atau pecah di mobile (BUG003)
- [ ] Ukuran tombol dan font cukup besar untuk pengguna awam

---

## ⚙️ Pengujian Tambahan

- [x] Simulasi ≥ 100 transaksi tanpa crash (TC017 - Load Test)
- [x] Sistem tidak mengizinkan form kosong dikirim

---

## Status Akhir (QA Internal)

| Status QA | Keterangan                         |
| --------- | ---------------------------------- |
| ⬜ Draft  | Belum lengkap                      |
| 🔶 Review | Mayoritas sudah oke, ada minor bug |
| ✅ Final  | Semua poin checklist lolos         |

**Status Saat Ini**: 🔶
