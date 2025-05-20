# ✅ Acceptance Criteria – Sistem Pembayaran Pajak Online

Dokumen ini merinci kriteria penerimaan setiap fitur agar dapat dinyatakan “diterima” oleh tim QA dan pengguna. Setiap kriteria mengacu pada **Functional Requirement (FR)** dan **Non-Functional Requirement (NFR)**.

---

## 🔐 FR00 – Autentikasi Pengguna

| Kriteria                                                                              | Status Uji | Metode Uji         |
| ------------------------------------------------------------------------------------- | ---------- | ------------------ |
| Pengguna tidak bisa melanjutkan ke formulir tanpa mengisi nama dan nomor KTP.         | ✅         | Manual E2E         |
| Nomor KTP hanya menerima input numerik 16 digit (tidak boleh <16 atau karakter lain). | ✅         | Unit test & E2E    |
| Validasi terjadi secara real-time saat mengetik (inline validation).                  | ✅         | Frontend unit test |

---

## 📥 FR01 – Dropdown Jenis Pajak

| Kriteria                                                                       | Status Uji | Metode Uji        |
| ------------------------------------------------------------------------------ | ---------- | ----------------- |
| Dropdown menampilkan minimal 2 jenis pajak (misalnya: Penghasilan, Kendaraan). | ✅         | Manual E2E        |
| Pengguna dapat memilih salah satu jenis pajak tanpa error.                     | ✅         | Manual E2E        |
| Tidak ada pilihan kosong atau invalid di dropdown.                             | ✅         | Manual inspection |

---

## 💰 FR02 – Validasi Jumlah Pajak Positif

| Kriteria                                                 | Status Uji | Metode Uji         |
| -------------------------------------------------------- | ---------- | ------------------ |
| Input jumlah pajak harus angka positif.                  | ✅         | Unit & E2E         |
| Sistem menolak input: kosong, 0, negatif, teks, simbol.  | ✅         | Unit test & E2E    |
| Validasi dilakukan secara real-time (tanpa submit dulu). | ✅         | Frontend unit test |

---

## 🧾 FR03 – Nomor Referensi Unik

| Kriteria                                                  | Status Uji | Metode Uji         |
| --------------------------------------------------------- | ---------- | ------------------ |
| Nomor referensi mengikuti format: `TAXYYYY-ID`            | ✅         | API test           |
| Nomor tidak pernah duplikat untuk transaksi yang berbeda. | ✅         | Backend logic test |
| Nilai `ID` meningkat/unik antar transaksi.                | ✅         | Backend unit test  |

---

## 📄 FR04 – Tampilan Bukti Pembayaran

| Kriteria                                                                                    | Status Uji | Metode Uji          |
| ------------------------------------------------------------------------------------------- | ---------- | ------------------- |
| Setelah submit, sistem menampilkan bukti dengan: No Referensi, Jenis Pajak, Jumlah, Tanggal | ✅         | Manual E2E          |
| Data yang ditampilkan sesuai dengan input pengguna.                                         | ✅         | E2E & Backend test  |
| Format tanggal konsisten (misalnya: `DD-MM-YYYY`).                                          | ✅         | Frontend logic test |

---

## ❌ FR05 – Penanganan Input Tidak Valid

| Kriteria                                                             | Status Uji | Metode Uji        |
| -------------------------------------------------------------------- | ---------- | ----------------- |
| Sistem menolak input kosong, negatif, huruf, simbol di jumlah pajak. | ✅         | Manual & API test |
| Pesan error: “Jumlah pajak harus positif” tampil saat input invalid. | ✅         | UI test & E2E     |
| Validasi muncul langsung tanpa reload.                               | ✅         | Frontend test     |

---

## 🔁 FR06 – Tombol Navigasi Ulang

| Kriteria                                                | Status Uji | Metode Uji          |
| ------------------------------------------------------- | ---------- | ------------------- |
| Tombol “Kembali” muncul setelah terjadi error.          | ✅         | Manual E2E          |
| Saat ditekan, sistem mengarahkan kembali ke form awal.  | ✅         | E2E navigation test |
| Formulir kembali dalam kondisi kosong siap diisi ulang. | ✅         | E2E & Frontend test |

---

## 🚀 NFR01 – Performa

| Kriteria                                                  | Status Uji | Metode Uji         |
| --------------------------------------------------------- | ---------- | ------------------ |
| Waktu submit + respons API maksimal 2 detik.              | ✅         | Stopwatch & k6     |
| Respon bukti pembayaran muncul cepat setelah klik submit. | ✅         | E2E stopwatch test |

---

## 📱 NFR02 – Usability & Responsiveness

| Kriteria                                               | Status Uji | Metode Uji          |
| ------------------------------------------------------ | ---------- | ------------------- |
| Layout tidak perlu scroll horizontal di mobile.        | ✅         | Manual browser test |
| Tampilan tetap terbaca dan rapi di tablet dan desktop. | ✅         | Multi-device test   |

---

## ⌨️ NFR03 – Validasi Real-Time

| Kriteria                                                     | Status Uji | Metode Uji          |
| ------------------------------------------------------------ | ---------- | ------------------- |
| Saat mengetik KTP/jumlah, sistem langsung memvalidasi input. | ✅         | Frontend logic test |
| Tidak perlu klik submit untuk tahu input salah.              | ✅         | E2E test            |

---

## 🧪 NFR04 – Skalabilitas Minimal

| Kriteria                                                       | Status Uji | Metode Uji        |
| -------------------------------------------------------------- | ---------- | ----------------- |
| Sistem tetap responsif saat diuji dengan ≥ 100 transaksi/hari. | ✅         | Load test (k6)    |
| Tidak ada error/miss-response saat banyak request.             | ✅         | Stress simulation |

---

## 🔐 NFR05 – Keamanan Data

| Kriteria                                                               | Status Uji | Metode Uji          |
| ---------------------------------------------------------------------- | ---------- | ------------------- |
| Data KTP tidak muncul di console browser.                              | ✅         | Inspect & audit     |
| Data dikirim lewat HTTPS dan tidak tersimpan di frontend state global. | ✅         | Network audit tools |
