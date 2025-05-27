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

| Kode  | Halaman    | Requirement                                                                              |
| ----- | ---------- | ---------------------------------------------------------------------------------------- |
| FR-01 | `/` (Home) | Sistem harus menolak submit jika nama atau NPWP kosong                                   |
| FR-02 | `/` (Home) | Sistem harus memvalidasi bahwa NPWP terdiri dari 16 digit                                |
| FR-03 | `/` (Home) | Sistem harus menyimpan nama dan NPWP ke `localStorage` jika valid                        |
| FR-04 | `/` (Home) | Sistem harus melakukan redirect ke `/form` setelah submit berhasil                       |
| FR-05 | `/` (Home) | Sistem harus mengarahkan ke halaman `/cek` ketika tombol 'Cek Bukti Pengajuan' diklik    |
| FR-06 | `/form`    | Sistem harus menolak submit jika jenis pajak dan/atau jumlah belum diisi                 |
| FR-07 | `/form`    | Sistem harus memvalidasi bahwa jumlah pajak minimal Rp10.000                             |
| FR-08 | `/form`    | Sistem harus memvalidasi NPWP dari `localStorage` agar memiliki 16 digit                 |
| FR-09 | `/form`    | Sistem harus menampilkan bukti pengajuan jika data valid                                 |
| FR-10 | `/form`    | Sistem harus dapat mereset formulir jika pengguna klik “Ajukan Lagi”                     |
| FR-11 | `/form`    | Sistem harus kembali ke halaman utama jika pengguna klik “Kembali ke Home”               |
| FR-12 | `/cek`     | Sistem harus menyediakan kolom input referensi yang mengubah input menjadi huruf kapital |
| FR-13 | `/cek`     | Sistem harus mencocokkan input referensi dengan daftar data pajak yang tersedia          |
| FR-14 | `/cek`     | Sistem harus menampilkan pesan error jika referensi tidak ditemukan                      |
| FR-15 | `/cek`     | Sistem harus menampilkan rincian bukti pengajuan jika referensi ditemukan                |

### 4. 🥪 Validation & Testable Criteria

Setiap functional requirement di atas telah diturunkan ke dalam:

- **Pengujian Cypress**: untuk validasi UI/UX, interaksi user, validasi input, navigasi, dan localStorage
- **Postman API Test Collection**: untuk pengujian endpoint backend terkait submit dan get data

### 5. 🚫 Non-Functional Requirements

| Kode   | Requirement                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------- |
| NFR-01 | Sistem harus kompatibel dengan browser modern (Chrome, Firefox, Edge)                               |
| NFR-02 | Sistem harus memberikan respon dalam waktu < 2 detik                                                |
| NFR-03 | Semua input pengguna harus divalidasi di sisi klien (client-side validation)                        |
| NFR-04 | Sistem harus memiliki fallback yang aman jika data tidak tersedia (e.g. input kosong, NPWP invalid) |
| NFR-05 | Sistem harus aman dari injection melalui `input` dan hanya menerima input numerik untuk jumlah      |

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
