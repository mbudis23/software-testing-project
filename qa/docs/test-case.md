# Test Cases - Sistem Pembayaran Pajak Online

---

## ✅ AUTENTIKASI (FR00)

| ID    | Nama Pengujian     | Deskripsi Skenario             | Data Uji                            | Ekspektasi                               |
| ----- | ------------------ | ------------------------------ | ----------------------------------- | ---------------------------------------- |
| TC001 | Autentikasi Valid  | Input nama dan KTP benar       | "Wahyu Trondol", "3210123456789001" | Lolos ke halaman formulir pembayaran     |
| TC002 | KTP Kurang dari 16 | Input 15 digit                 | "Wahyu Trondol", "123456789012345"  | Tampil error: "Nomor KTP harus 16 digit" |
| TC003 | KTP Bukan Angka    | Input dengan huruf atau simbol | "Wahyu Trondol", "12a#67890bcd!@#%" | Tampil error: "Nomor KTP harus angka"    |
| TC004 | Kosong Semua       | Kosongkan nama dan KTP         | "", ""                              | Tampil error validasi pada kedua input   |

---

## ✅ FORMULIR PAJAK (FR01–FR02)

| ID    | Nama Pengujian      | Deskripsi Skenario             | Data Uji        | Ekspektasi                                 |
| ----- | ------------------- | ------------------------------ | --------------- | ------------------------------------------ |
| TC005 | Pilih Jenis Pajak   | Pilih salah satu dari dropdown | Pajak Kendaraan | Dropdown aktif dan data terkirim           |
| TC006 | Jumlah Pajak Valid  | Input angka positif            | 150000          | Data valid, lanjut ke pengiriman           |
| TC007 | Jumlah Pajak Kosong | Field jumlah dibiarkan kosong  | (kosong)        | Tampil error: “Jumlah pajak harus positif” |
| TC008 | Jumlah Negatif      | Input -100000                  | -100000         | Tampil error: “Jumlah pajak harus positif” |
| TC009 | Input Non-Numerik   | Input “abcde”                  | “abcde”         | Tampil error: “Jumlah pajak harus positif” |

---

## ✅ PENGAJUAN & NOMOR REFERENSI (FR03–FR04)

| ID    | Nama Pengujian           | Deskripsi Skenario    | Data Uji                  | Ekspektasi                                               |
| ----- | ------------------------ | --------------------- | ------------------------- | -------------------------------------------------------- |
| TC010 | Referensi Unik Format    | Kirim formulir sukses | Pajak Penghasilan, 200000 | Nomor: TAX2025-00X muncul dan unik tiap transaksi        |
| TC011 | Bukti Pembayaran Lengkap | Lihat tampilan bukti  | -                         | Tampilkan: nomor referensi, jenis pajak, jumlah, tanggal |

---

## ✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06)

| ID    | Nama Pengujian     | Deskripsi Skenario                  | Data Uji              | Ekspektasi                                |
| ----- | ------------------ | ----------------------------------- | --------------------- | ----------------------------------------- |
| TC012 | Pesan Error Jumlah | Kirim dengan jumlah kosong          | Pajak Penghasilan, "" | Tampil pesan error                        |
| TC013 | Tombol Kembali     | Klik tombol “Kembali” setelah error | -                     | Formulir dikosongkan dan bisa diisi ulang |

---

## ✅ NON-FUNCTIONAL TESTS (NFR01–NFR05)

| ID    | Nama Pengujian      | Deskripsi Skenario                     | Data Uji                  | Ekspektasi                                 |
| ----- | ------------------- | -------------------------------------- | ------------------------- | ------------------------------------------ |
| TC014 | Respons Time        | Ukur waktu submit & tampil bukti       | Pajak Penghasilan, 100000 | Waktu < 2 detik                            |
| TC015 | UI Responsif Mobile | Uji tampilan pada mobile (320px–768px) | -                         | Tampilan tidak pecah, tombol mudah diakses |
| TC016 | Validasi Real-time  | Cek validasi muncul saat mengetik      | “abc”, “-100”             | Error muncul sebelum klik submit           |
| TC017 | Beban ≥ 100 Input   | Simulasikan 100 transaksi              | Dataset batch             | Tidak ada crash, respon stabil             |
