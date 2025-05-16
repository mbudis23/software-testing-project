# Bug Report - Sistem Pembayaran Pajak Online

**Update Terakhir**: [isi saat diperbarui]

---

## Format Kolom

| ID  | Tanggal | Modul | Severity | Langkah Reproduksi | Hasil Aktual | Hasil Diharapkan | Status | Bukti (ss/log) |
| --- | ------- | ----- | -------- | ------------------ | ------------ | ---------------- | ------ | -------------- |

---

## 📋 Daftar Bug

| ID     | Tanggal    | Modul       | Severity | Langkah Reproduksi                                                               | Hasil Aktual                                  | Hasil Diharapkan                            | Status    | Bukti                 |
| ------ | ---------- | ----------- | -------- | -------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------- | --------- | --------------------- |
| BUG001 | 2025-05-08 | Validasi    | Medium   | 1. Isi jumlah pajak dengan nilai negatif <br> 2. Klik tombol "Submit"            | Tidak ada pesan error, formulir tetap dikirim | Muncul error: "Jumlah pajak harus positif"  | Open      | screenshot_bug001.png |
| BUG002 | 2025-05-08 | Autentikasi | High     | 1. Isi nomor KTP dengan 12 digit angka <br> 2. Klik "Lanjut"                     | Sistem lanjut ke halaman formulir             | Muncul error: "Nomor KTP harus 16 digit"    | Fixed     | screenshot_bug002.png |
| BUG003 | 2025-05-09 | Bukti       | Low      | 1. Isi dan kirim formulir pajak <br> 2. Periksa tampilan bukti di mobile (320px) | Teks referensi tumpang tindih                 | Teks harus responsif dan rapi di mobile     | In Review | screenshot_bug003.png |
| BUG004 | 2025-05-09 | Referensi   | Critical | 1. Submit dua formulir sangat cepat (2 tab browser)                              | Kedua bukti menggunakan nomor referensi sama  | Setiap bukti harus punya nomor unik berbeda | Open      | log_duplikasi_id.json |
| BUG005 | 2025-05-09 | UI          | Low      | 1. Akses halaman formulir di Safari <br> 2. Klik dropdown jenis pajak            | Dropdown tidak bisa dibuka                    | Dropdown bisa digunakan di semua browser    | Open      | video_bug005.mov      |

---

## Keterangan Severity

| Level    | Penjelasan                                                              |
| -------- | ----------------------------------------------------------------------- |
| Critical | Merusak fungsi utama, transaksi gagal, atau menyebabkan kehilangan data |
| High     | Menghambat proses utama atau keamanan data                              |
| Medium   | Fitur berjalan tapi tidak sesuai ekspektasi                             |
| Low      | Minor visual bug, tidak mengganggu fungsi utama                         |

---

## Status Bug

| Status    | Penjelasan                                           |
| --------- | ---------------------------------------------------- |
| Open      | Baru ditemukan, belum diperbaiki                     |
| Fixed     | Sudah diperbaiki oleh tim developer                  |
| In Review | Perbaikan sudah dilakukan, menunggu verifikasi ulang |
| Closed    | Sudah diverifikasi oleh QA, tidak muncul kembali     |

---

## Catatan Tambahan

- Semua bukti error harus disimpan dalam folder `qa/screenshots/` atau `qa/logs/`.
- Gunakan penamaan file bukti sesuai ID bug, contoh: `screenshot_bug001.png`.
- Komunikasi dengan tim dev bisa dicatat di `bug_discussion.md` jika diperlukan.
