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
