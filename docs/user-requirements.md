# User Requirements - Sistem Pembayaran Pajak Online

---

## Deskripsi Sistem

Sistem pembayaran pajak online adalah aplikasi web yang memungkinkan masyarakat melakukan pembayaran pajak tanpa perlu datang langsung ke kantor pajak. Pengguna dapat login menggunakan nama dan nomor KTP, mengisi formulir jenis dan jumlah pajak, mengajukan pembayaran, dan memperoleh bukti transaksi yang sah dan unik.

---

## Functional Requirements (FR)

| ID   | Nama Fitur                    | Deskripsi                                                                                                                                |
| ---- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| FR00 | Autentikasi Pengguna          | Pengguna wajib mengisi nama lengkap dan nomor KTP sebelum dapat mengakses formulir pembayaran. Nomor KTP harus valid (16 digit numerik). |
| FR01 | Dropdown Jenis Pajak          | Pengguna dapat memilih jenis pajak (misalnya: Pajak Penghasilan, Pajak Kendaraan) melalui dropdown di formulir.                          |
| FR02 | Validasi Jumlah Pajak Positif | Input jumlah pajak hanya menerima angka positif, tidak boleh kosong, nol, atau negatif.                                                  |
| FR03 | Nomor Referensi Unik          | Setelah pengajuan berhasil, sistem menghasilkan nomor referensi unik dengan format `TAX[YEAR]-[ID]`, contoh: `TAX2025-001`.              |
| FR04 | Tampilan Bukti Pembayaran     | Sistem menampilkan bukti pembayaran berisi: nomor referensi, jenis pajak, jumlah pajak, dan tanggal transaksi.                           |
| FR05 | Penanganan Input Tidak Valid  | Jika jumlah pajak kosong, bukan angka, atau negatif, maka sistem menampilkan pesan error: “Jumlah pajak harus positif.”                  |
| FR06 | Tombol Navigasi Ulang         | Sistem menyediakan tombol “Kembali” setelah error untuk mengisi ulang formulir pembayaran.                                               |

---

## Non-Functional Requirements (NFR)

| ID    | Kategori             | Deskripsi                                                                                                                |
| ----- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| NFR01 | Performa             | Sistem harus memberikan respon waktu < 2 detik untuk pengajuan dan tampilan bukti.                                       |
| NFR02 | Usability            | Antarmuka pengguna harus sederhana, mudah dipahami, dan responsif di berbagai perangkat (desktop dan mobile).            |
| NFR03 | Real-time Validation | Validasi input (jumlah pajak dan nomor KTP) harus dilakukan secara real-time sebelum formulir dikirim.                   |
| NFR04 | Skalabilitas         | Sistem harus mampu menangani minimal 100 pengajuan per hari tanpa penurunan performa.                                    |
| NFR05 | Keamanan Data        | Data nama dan nomor KTP harus dikirim melalui koneksi terenkripsi (HTTPS) dan tidak disimpan secara terbuka di frontend. |

---

## Acceptance Criteria (Ringkasan)

| ID    | Diterima Jika...                                                                          |
| ----- | ----------------------------------------------------------------------------------------- |
| FR00  | Form autentikasi tidak bisa dilewati; validasi nomor KTP hanya menerima 16 digit numerik. |
| FR01  | Dropdown menampilkan daftar jenis pajak dan dapat dipilih tanpa error.                    |
| FR02  | Formulir menolak input 0, negatif, kosong, atau teks.                                     |
| FR03  | Sistem selalu menghasilkan nomor referensi dengan format dan urutan yang benar.           |
| FR04  | Bukti menampilkan semua data lengkap sesuai transaksi terbaru.                            |
| FR05  | Pesan error muncul konsisten pada input tidak valid.                                      |
| FR06  | Tombol “Kembali” mengosongkan form dan memungkinkan input ulang.                          |
| NFR01 | Waktu respon sistem ≤ 2 detik.                                                            |
| NFR02 | Layout tampil rapi di perangkat mobile dan tidak memerlukan zoom atau scroll horizontal.  |
| NFR03 | Validasi muncul otomatis saat mengetik jumlah pajak dan nomor KTP.                        |
| NFR04 | Tidak ada error saat dilakukan pengujian untuk ≥ 100 transaksi/hari.                      |
| NFR05 | Nomor KTP tidak muncul di browser console/log dan hanya dikirim via HTTPS.                |

---

## Catatan Tambahan

- Sistem saat ini hanya mensimulasikan proses pembayaran dan belum terintegrasi dengan sistem perpajakan resmi.
- Autentikasi sederhana menggunakan nama dan nomor KTP bertujuan untuk memverifikasi identitas dasar tanpa membuat akun.d
