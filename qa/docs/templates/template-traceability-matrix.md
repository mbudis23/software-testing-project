# Traceability Matrix - Sistem Pembayaran Pajak Online

**Disusun oleh**: Muhammad Budi Setiawan (QA Tester)  
**Tanggal**: 2025-05-10

---

## Tujuan

Dokumen ini bertujuan untuk menunjukkan keterlacakan antara setiap kebutuhan pengguna (FR dan NFR) terhadap test case yang dibuat dan dijalankan. Matriks ini memastikan bahwa semua kebutuhan diuji dan diverifikasi secara eksplisit.

---

## Matriks Keterlacakan (Functional Requirements)

| Requirement ID | Deskripsi                              | Test Case ID(s)            | Status Eksekusi            |
| -------------- | -------------------------------------- | -------------------------- | -------------------------- |
| FR00           | Autentikasi nama dan nomor KTP         | TC001–TC004                | ✅ Lulus                   |
| FR01           | Dropdown jenis pajak                   | TC005                      | ✅ Lulus                   |
| FR02           | Validasi jumlah pajak positif          | TC006–TC009                | ❌ Sebagian gagal (BUG001) |
| FR03           | Nomor referensi unik (TAXYYYY-ID)      | TC010                      | ❌ Gagal (BUG004)          |
| FR04           | Tampilan bukti pembayaran lengkap      | TC011                      | ✅ Lulus                   |
| FR05           | Tampilkan error jika input tidak valid | TC007, TC008, TC009, TC012 | ❌ Sebagian gagal          |
| FR06           | Tombol “Kembali” untuk reset formulir  | TC013                      | ✅ Lulus                   |

---

## Matriks Keterlacakan (Non-Functional Requirements)

| Requirement ID | Deskripsi                          | Test Case ID(s) | Status Eksekusi   |
| -------------- | ---------------------------------- | --------------- | ----------------- |
| NFR01          | Waktu respon < 2 detik             | TC014           | ✅ Lulus          |
| NFR02          | UI responsif di berbagai perangkat | TC015           | ❌ Gagal (BUG003) |
| NFR03          | Validasi input real-time           | TC016           | ✅ Lulus          |
| NFR04          | Minimal 100 pengajuan/hari         | TC017           | ⛔ Belum diuji    |
| NFR05          | Data KTP aman (tidak bocor/log)    | TC018           | ✅ Lulus          |

---

## Ringkasan

- **Total Requirements**: 11
- **Fully Passed**: 6
- **Partially Failed / Issues**: 4
- **Not Yet Executed**: 1

---

## Rekomendasi QA

- Pastikan developer memperbaiki semua issue yang menyebabkan test case gagal.
- Lakukan **uji ulang** (regression test) untuk: FR02, FR03, FR05, NFR02.
- Jalankan TC017 begitu sistem mendukung load testing.
- Traceability Matrix harus diperbarui setelah setiap siklus pengujian.
