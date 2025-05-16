# Test Execution Report - Sistem Pembayaran Pajak Online

**Tanggal Pengujian**: 2025-05-08 s.d. 2025-05-10  
**Versi Aplikasi**: v1.0.0  
**Lingkungan Uji**:

- Frontend: Chrome 124, Safari 17, Firefox 125
- Backend: FastAPI (Python 3.11)
- Database: PostgreSQL 14
- Alat Uji: Cypress, Postman, Manual, Chrome DevTools

---

## Ringkasan Eksekusi

| Total Test Case | Lulus (✅) | Gagal (❌) | Diblokir (⛔) | Catatan                              |
| --------------- | ---------- | ---------- | ------------- | ------------------------------------ |
| 18              | 13         | 4          | 1             | Laporan bug telah dikirim ke tim dev |

---

## Hasil Detail per Test Case

| Test Case ID | Nama Pengujian            | Status     | Catatan                                                             |
| ------------ | ------------------------- | ---------- | ------------------------------------------------------------------- |
| TC001        | Autentikasi Valid         | ✅ Passed  | Nama & KTP valid, lanjut ke form                                    |
| TC002        | KTP Kurang dari 16 Digit  | ✅ Passed  | Validasi berhasil muncul                                            |
| TC003        | KTP Bukan Angka           | ✅ Passed  | Validasi real-time bekerja                                          |
| TC004        | Kosong Semua Input        | ✅ Passed  | Error pada nama dan KTP muncul bersamaan                            |
| TC005        | Pilih Jenis Pajak         | ✅ Passed  | Dropdown berjalan baik                                              |
| TC006        | Jumlah Pajak Valid        | ✅ Passed  | Formulir berhasil dikirim                                           |
| TC007        | Jumlah Pajak Kosong       | ❌ Failed  | Tidak muncul pesan error (lihat BUG001)                             |
| TC008        | Jumlah Negatif            | ❌ Failed  | Formulir tetap bisa dikirim (lihat BUG001)                          |
| TC009        | Input Non-Numerik         | ✅ Passed  | Validasi real-time muncul                                           |
| TC010        | Referensi Unik Format     | ❌ Failed  | Duplikasi ID ditemukan saat submit bersamaan (lihat BUG004)         |
| TC011        | Bukti Pembayaran Lengkap  | ✅ Passed  | Tampil lengkap dengan semua data                                    |
| TC012        | Pesan Error Jumlah Kosong | ❌ Failed  | Validasi tidak muncul (sama dengan TC007)                           |
| TC013        | Tombol Kembali            | ✅ Passed  | Form ter-reset dan dapat diisi ulang                                |
| TC014        | Respons Time              | ✅ Passed  | Respon rata-rata 1.2 detik                                          |
| TC015        | UI Responsif Mobile       | ❌ Failed  | Tampilan bukti tumpang tindih (lihat BUG003)                        |
| TC016        | Validasi Real-time        | ✅ Passed  | Muncul saat mengetik, tidak perlu klik                              |
| TC017        | Beban ≥ 100 Input         | ⛔ Blocked | Belum dilakukan, server limit untuk simulasi massal belum disiapkan |
| TC018        | Data KTP Aman             | ✅ Passed  | Tidak muncul di console atau log, HTTPS aktif                       |

---

## Ringkasan Bug Penting

| ID     | Modul     | Severity | Status    | Deskripsi Singkat                               |
| ------ | --------- | -------- | --------- | ----------------------------------------------- |
| BUG001 | Validasi  | Medium   | Open      | Jumlah pajak kosong/negatif tetap bisa dikirim  |
| BUG003 | Tampilan  | Low      | In Review | Teks referensi tumpang tindih di layar mobile   |
| BUG004 | Referensi | Critical | Open      | Duplikasi nomor referensi saat submit bersamaan |

---

## Rekomendasi QA

- **Wajib** memperbaiki validasi jumlah pajak di sisi server untuk menutup celah input salah (BUG001).
- Nomor referensi harus dibangkitkan secara **atomic** untuk mencegah duplikasi (BUG004).
- **Minor revisi CSS** dibutuhkan untuk perbaikan tampilan bukti di resolusi mobile (BUG003).
- Setelah perbaikan dilakukan, disarankan menjalankan ulang test case: **TC007, TC008, TC010, TC015**, dan **TC017** (jika backend sudah siap diuji massal).

---

## Kesimpulan Akhir

> Sistem telah lulus **13 dari 18 test case**. Beberapa bug mayor seperti validasi dan duplikasi ID perlu segera diperbaiki sebelum sistem dianggap layak untuk dirilis ke publik. QA merekomendasikan satu siklus pengujian ulang setelah bug diperbaiki.
