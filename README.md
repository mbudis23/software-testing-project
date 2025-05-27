# 📄 Sistem Pengajuan Pembayaran Pajak Online

Aplikasi web yang memungkinkan pengguna mengajukan pembayaran pajak secara **mudah**, **cepat**, dan **aman** melalui antarmuka online. Proyek ini dikembangkan sebagai bagian dari tugas mata kuliah **Pengujian Perangkat Lunak**.

## 👥 Anggota Kelompok

- **Muhammad Zidane Septian Irsyadi**
  NIM: 22/504678/TK/55212
- **Kholil Asjaduddin**
  NIM: 22/504792/TK/55224
- **Muhammad Budi Setiawan**
  NIM: 22/505064/TK/55254

## 📄 Link Slides

[Canva Slides Presentasi](https://www.canva.com/design/DAGn8G-1Rnw/uTDKDI8Fh9wreIf-C1VAmA/edit?utm_content=DAGn8G-1Rnw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## 📄 User Requirement Document (URD) – Sistem Pengajuan Pajak

### 1. 🌟 Tujuan Sistem

Menyediakan platform digital sederhana dan aman bagi pengguna untuk:

- Mengisi informasi pribadi (nama & NPWP)
- Mengajukan pembayaran pajak berdasarkan jenis dan jumlah
- Mengecek kembali bukti pengajuan melalui nomor referensi

### 2. 👤 Target Pengguna

- Wajib pajak individu
- Sistem internal verifikasi pajak
- Pengembang atau QA yang memverifikasi fungsionalitas backend dan frontend

### 3. ✅ Functional Requirements

| Kode  | Nama Fitur                  | Deskripsi                                                                 |
|-------|-----------------------------|---------------------------------------------------------------------------|
| FR00  | Autentikasi Pengguna        | Sistem memverifikasi Nama dan KTP pengguna. KTP harus 16 digit angka.     |
| FR01  | Dropdown Jenis Pajak        | Sistem menyediakan daftar pilihan jenis pajak untuk dipilih pengguna.     |
| FR02  | Validasi Jumlah Pajak       | Input jumlah pajak harus berupa angka positif. Tampilkan error jika salah.|
| FR03  | Pengajuan Formulir          | Sistem memproses dan menyimpan data pajak setelah formulir dikirim.       |
| FR04  | Nomor Referensi Unik        | Sistem menghasilkan nomor referensi transaksi dengan format unik.         |
| FR05  | Tampilan Bukti Pembayaran   | Sistem menampilkan bukti lengkap: nomor referensi, pajak, jumlah, tanggal.|
| FR06  | Penanganan Error & Navigasi | Sistem menampilkan pesan error dan menyediakan tombol “Kembali”.          |


### 4. 🚫 Non-Functional Requirements

| Kode   | Nama Kualitas Sistem       | Deskripsi                                                                 |
|--------|----------------------------|---------------------------------------------------------------------------|
| NFR01  | Waktu Respons              | Proses submit dan tampil bukti harus selesai dalam waktu < 2 detik.       |
| NFR02  | Responsif di Mobile        | Tampilan tidak pecah di layar 320px–768px, tombol tetap mudah diakses.    |
| NFR03  | Validasi Real-time         | Validasi muncul saat pengguna mengetik, tanpa perlu klik submit terlebih dahulu. |
| NFR04  | Ketahanan Beban            | Sistem dapat memproses ≥ 100 transaksi tanpa crash atau penurunan performa.|

### 5. 🥪 Validation & Testable Criteria

Setiap functional requirement di atas telah diturunkan ke dalam:

- **Pengujian Cypress**: untuk validasi UI/UX, interaksi user, validasi input, navigasi, dan localStorage
- **Postman API Test Collection**: untuk pengujian endpoint backend terkait submit dan get data

## 🔧 Feature Analysis

| Fitur                    | Halaman | Deskripsi                                          | Validasi                                     | Output                                      |
| ------------------------ | ------- | -------------------------------------------------- | -------------------------------------------- | ------------------------------------------- |
| Input nama dan NPWP      | `/`     | Formulir awal untuk mengisi identitas pengguna     | Wajib diisi, NPWP 16 digit                   | Simpan ke localStorage, redirect ke `/form` |
| Navigasi ke halaman cek  | `/`     | Tombol untuk cek bukti pengajuan                   | Tidak ada                                    | Arahkan ke `/cek`                           |
| Formulir pengajuan pajak | `/form` | Pilih jenis pajak dan masukkan jumlah              | Jumlah ≥ Rp10.000, jenis pajak harus dipilih | Menampilkan bukti pengajuan                 |
| Validasi NPWP lokal      | `/form` | Mengambil dan memverifikasi NPWP dari localStorage | 16 digit                                     | Lanjut ke proses pengajuan                  |
| Reset formulir           | `/form` | Tombol "Ajukan Lagi" untuk isi ulang               | Tidak ada                                    | Kosongkan input, kembali ke formulir        |
| Kembali ke Home          | `/form` | Tombol untuk kembali ke halaman utama              | Tidak ada                                    | Redirect ke `/`                             |
| Input referensi          | `/cek`  | Input kode referensi untuk verifikasi              | Konversi otomatis ke kapital                 | Cari data dalam daftar                      |
| Verifikasi referensi     | `/cek`  | Mencari referensi pada data dummy                  | Harus cocok persis                           | Tampilkan bukti atau error                  |

## Test Case

---

### ✅ AUTENTIKASI (FR00)

| ID    | Nama Pengujian     | Deskripsi Skenario             | Data Uji                            | Ekspektasi                               |
| ----- | ------------------ | ------------------------------ | ----------------------------------- | ---------------------------------------- |
| TC001 | Autentikasi Valid  | Input nama dan KTP benar       | "Wahyu Trondol", "3210123456789001" | Lolos ke halaman formulir pembayaran     |
| TC002 | KTP Kurang dari 16 | Input 15 digit                 | "Wahyu Trondol", "123456789012345"  | Tampil error: "Nomor KTP harus 16 digit" |
| TC003 | KTP Bukan Angka    | Input dengan huruf atau simbol | "Wahyu Trondol", "12a#67890bcd!@#%" | Tampil error: "Nomor KTP harus angka"    |
| TC004 | Kosong Semua       | Kosongkan nama dan KTP         | "", ""                              | Tampil error validasi pada kedua input   |

---

### ✅ FORMULIR PAJAK (FR01–FR02)

| ID    | Nama Pengujian      | Deskripsi Skenario             | Data Uji        | Ekspektasi                                 |
| ----- | ------------------- | ------------------------------ | --------------- | ------------------------------------------ |
| TC005 | Pilih Jenis Pajak   | Pilih salah satu dari dropdown | Pajak Kendaraan | Dropdown aktif dan data terkirim           |
| TC006 | Jumlah Pajak Valid  | Input angka positif            | 150000          | Data valid, lanjut ke pengiriman           |
| TC007 | Jumlah Pajak Kosong | Field jumlah dibiarkan kosong  | (kosong)        | Tampil error: “Jumlah pajak harus positif” |
| TC008 | Jumlah Negatif      | Input -100000                  | -100000         | Tampil error: “Jumlah pajak harus positif” |
| TC009 | Input Non-Numerik   | Input “abcde”                  | “abcde”         | Tampil error: “Jumlah pajak harus positif” |

---

### ✅ PENGAJUAN & NOMOR REFERENSI (FR03–FR04)

| ID    | Nama Pengujian           | Deskripsi Skenario    | Data Uji                  | Ekspektasi                                               |
| ----- | ------------------------ | --------------------- | ------------------------- | -------------------------------------------------------- |
| TC010 | Referensi Unik Format    | Kirim formulir sukses | Pajak Penghasilan, 200000 | Nomor: TAX2025-00X muncul dan unik tiap transaksi        |
| TC011 | Bukti Pembayaran Lengkap | Lihat tampilan bukti  | -                         | Tampilkan: nomor referensi, jenis pajak, jumlah, tanggal |

---

### ✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06)

| ID    | Nama Pengujian     | Deskripsi Skenario                  | Data Uji              | Ekspektasi                                |
| ----- | ------------------ | ----------------------------------- | --------------------- | ----------------------------------------- |
| TC012 | Pesan Error Jumlah | Kirim dengan jumlah kosong          | Pajak Penghasilan, "" | Tampil pesan error                        |
| TC013 | Tombol Kembali     | Klik tombol “Kembali” setelah error | -                     | Formulir dikosongkan dan bisa diisi ulang |

---

### ✅ NON-FUNCTIONAL TESTS (NFR01–NFR05)

| ID    | Nama Pengujian      | Deskripsi Skenario                     | Data Uji                  | Ekspektasi                                 |
| ----- | ------------------- | -------------------------------------- | ------------------------- | ------------------------------------------ |
| TC014 | Respons Time        | Ukur waktu submit & tampil bukti       | Pajak Penghasilan, 100000 | Waktu < 2 detik                            |
| TC015 | UI Responsif Mobile | Uji tampilan pada mobile (320px–768px) | -                         | Tampilan tidak pecah, tombol mudah diakses |
| TC016 | Validasi Real-time  | Cek validasi muncul saat mengetik      | “abc”, “-100”             | Error muncul sebelum klik submit           |
| TC017 | Beban ≥ 100 Input   | Simulasikan 100 transaksi              | Dataset batch             | Tidak ada crash, respon stabil             |

## ✅ UAT Checklist – Sistem Pembayaran Pajak Online

### 📋 A. Functional Requirements Checklist

#### 🔐 FR00 – Autentikasi Pengguna

- [x] **TC001 – Autentikasi Valid:** Input nama dan KTP benar → Lolos ke halaman formulir pembayaran
- [x] **TC002 – KTP Kurang dari 16 digit:** Input 15 digit → Error: "Nomor KTP harus 16 digit"
- [x] **TC003 – KTP Bukan Angka:** Input huruf/simbol → Error: "Nomor KTP harus angka"
- [x] **TC004 – Kosong Semua:** Kosongkan nama dan KTP → Error validasi pada kedua input

#### 🧾 FR01–FR02 – Formulir Pajak

- [x] **TC005 – Pilih Jenis Pajak:** Pilih dari dropdown → Data terkirim
- [x] **TC006 – Jumlah Pajak Valid:** Input 150000 → Data valid, lanjut pengiriman
- [x] **TC007 – Jumlah Pajak Kosong:** Tidak input → Error: “Jumlah pajak harus positif”
- [ ] **TC008 – Jumlah Negatif:** Input -100000 → Error: “Jumlah pajak harus positif”
- [x] **TC009 – Input Non-Numerik:** Input "abcde" → Error: “Jumlah pajak harus positif”

#### 📤 FR03–FR04 – Pengajuan & Nomor Referensi

- [x] **TC010 – Referensi Unik Format:** Kirim data sukses → Nomor TAX2025-00X muncul, unik
- [x] **TC011 – Bukti Pembayaran Lengkap:** Tampilkan semua info → Referensi, pajak, jumlah, tanggal

#### ⚠️ FR05–FR06 – Penanganan Error & Navigasi

- [x] **TC012 – Pesan Error Jumlah Kosong:** Kirim tanpa jumlah → Muncul pesan error
- [ ] **TC013 – Tombol Kembali:** Klik tombol “Kembali” → Form kosong dan bisa diisi ulang

---

### 📋 B. Non-Functional Requirements Checklist

#### ⚡ NFR01 – Waktu Respons

- [x] **TC014 – Response Time:** Submit + tampil bukti < 2 detik

#### 📱 NFR02 – Responsif di Mobile

- [x] **TC015 – UI Mobile Friendly:** Layout tetap rapi di 320px–768px

#### ✍️ NFR03 – Validasi Real-time

- [ ] **TC016 – Validasi Saat Mengetik:** Error muncul sebelum klik submit

#### 🧪 NFR04 – Ketahanan Beban

- [x] **TC017 – Simulasi 100 Transaksi:** Tidak crash, respon tetap stabil
