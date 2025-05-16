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

- [ ] Dropdown jenis pajak menampilkan daftar pilihan
- [ ] Jumlah pajak hanya menerima angka positif
- [ ] Jumlah kosong, negatif, atau teks ditolak dengan pesan error
- [ ] Tombol submit hanya aktif jika input valid

---

## ✅ Referensi & Bukti Pembayaran

- [ ] Sistem menghasilkan nomor referensi unik (format: TAXYYYY-XXX)
- [ ] Nomor referensi tidak duplikat jika 2 pengajuan bersamaan
- [ ] Halaman bukti menampilkan semua informasi dengan benar (jenis, jumlah, tanggal, referensi)
- [ ] Tombol “Kembali” membersihkan formulir dan dapat diisi ulang

---

## ✅ Validasi Real-time

- [ ] Validasi muncul saat pengguna mengetik jumlah pajak
- [ ] Validasi KTP muncul sebelum tombol lanjut diklik
- [ ] Tidak bisa lanjut tanpa input valid

---

## ✅ Performa & Responsivitas

- [ ] Waktu submit < 2 detik di koneksi normal
- [ ] Tampilan responsif di desktop, tablet, dan smartphone
- [ ] Elemen UI tidak bertumpuk atau pecah di mobile (BUG003)
- [ ] Ukuran tombol dan font cukup besar untuk pengguna awam

---

## ✅ Keamanan & Data Sensitif

- [ ] Nomor KTP tidak muncul di `console.log` atau tab Network
- [ ] Input sensitif tidak disimpan di localStorage/sessionStorage
- [ ] Tidak ada log server yang menyimpan data KTP mentah (perlu verifikasi backend)

---

## ⚙️ Pengujian Tambahan

- [ ] Simulasi ≥ 100 transaksi tanpa crash (TC017 - Load Test)
- [ ] Sistem tidak mengizinkan form kosong dikirim

---

## Status Akhir (QA Internal)

| Status QA | Keterangan                         |
| --------- | ---------------------------------- |
| ⬜ Draft  | Belum lengkap                      |
| 🔶 Review | Mayoritas sudah oke, ada minor bug |
| ✅ Final  | Semua poin checklist lolos         |

**Status Saat Ini**: ⬜
