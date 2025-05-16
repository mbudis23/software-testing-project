# Test Plan - Sistem Pembayaran Pajak Online

---

## 1. Deskripsi Sistem

Sistem ini adalah aplikasi web yang memfasilitasi masyarakat dalam melakukan pembayaran pajak secara daring. Pengguna memulai dengan mengisi nama dan nomor KTP, kemudian memilih jenis pajak, mengisi jumlah pajak, mengirimkan formulir, dan menerima bukti pembayaran dengan nomor referensi unik.

---

## 2. Tujuan Pengujian

- Memastikan seluruh kebutuhan fungsional dan non-fungsional telah diimplementasikan sesuai analisis fitur.
- Menjamin integritas data dan validasi masukan berjalan dengan benar.
- Memverifikasi bahwa alur lengkap pengguna (dari autentikasi hingga bukti pembayaran) dapat dieksekusi tanpa error.
- Menemukan bug sebelum sistem digunakan oleh publik.

---

## 3. Lingkup Pengujian

### Dalam Cakupan:

- Autentikasi awal menggunakan nama dan nomor KTP.
- Formulir pembayaran pajak: jenis pajak & jumlah.
- Validasi input real-time dan backend.
- Proses pengajuan & penyimpanan data.
- Tampilan bukti pembayaran dengan informasi lengkap.
- Penanganan error & navigasi ulang via tombol "Kembali".

### Di Luar Cakupan:

- Integrasi dengan sistem pajak nasional atau gateway pembayaran.
- Pengelolaan akun pengguna (login-password).
- Riwayat transaksi permanen.

---

## 4. Strategi Pengujian

Pengujian akan dilakukan mengikuti urutan tahapan pengembangan:

1. **User Requirement → Feature Analysis**  
   Referensi: `user-requirements.md`, `feature-analysis.md`.

2. **Unit Test (selama pengembangan)**

   - Backend: validasi data, nomor referensi.
   - Frontend: validasi input form.

3. **API Test**

   - Metode: Postman / REST Client.
   - Endpoint: autentikasi, pengajuan pajak, pengambilan bukti.

4. **End-to-End Test (Acceptance Test)**
   - Tools: Cypress / Playwright.
   - Simulasi alur penuh pengguna dan skenario edge case.

---

## 5. Jenis Pengujian

| Jenis Test            | Tujuan                                                             |
| --------------------- | ------------------------------------------------------------------ |
| Unit Testing          | Memastikan fungsi validasi dan pembentukan data berjalan benar     |
| Input Validation Test | Uji validasi input jumlah pajak dan nomor KTP                      |
| API Test              | Memastikan backend menerima, memproses, dan merespons dengan benar |
| End-to-End Test       | Simulasi seluruh perjalanan pengguna dari awal hingga akhir        |
| Negative Test         | Uji input salah, kosong, atau format tidak sesuai                  |
| Regression Test       | Pastikan fitur lama tetap berjalan setelah fitur baru ditambahkan  |
| Load Test             | Uji minimal 100 transaksi dalam waktu singkat                      |
| Responsive Test       | Uji tampilan dan fungsionalitas di berbagai perangkat dan resolusi |

---

## 6. Kriteria Keberhasilan

| Kriteria                                        | Target                                                |
| ----------------------------------------------- | ----------------------------------------------------- |
| 100% test case kritis lulus                     | Semua test case FR dan NFR wajib berhasil             |
| Response time form submission & bukti < 2 detik | Dipantau dengan stopwatch dan devtools                |
| Tidak ada bug blocker                           | Semua severity tinggi ditangani sebelum deploy        |
| UI responsif di ≥ 3 ukuran layar                | Diuji manual & otomatis pada mobile, tablet, desktop  |
| Nomor referensi unik dan tidak ganda            | Hasil akhir dicek dalam database atau respons backend |

---

## 7. Risiko Potensial dan Mitigasi

| Risiko                                | Dampak                        | Mitigasi                                  |
| ------------------------------------- | ----------------------------- | ----------------------------------------- |
| Duplikasi nomor referensi             | Bukti transaksi tidak valid   | Tambahkan locking/transaksi atomic di DB  |
| Error validasi tidak muncul real-time | User frustrasi, salah input   | Validasi dual: frontend & backend         |
| Data sensitif bocor di console/log    | Pelanggaran privasi           | Gunakan HTTPS, hindari logging nomor KTP  |
| Server overload saat pengajuan massal | Gagal submit, kehilangan data | Simulasi load dan tambahkan limit handler |

---

## 8. Tools

| Kategori       | Tools                |
| -------------- | -------------------- |
| Unit Testing   | Pytest, Jest         |
| API Testing    | Postman, REST Client |
| E2E Testing    | Cypress, Playwright  |
| Load Testing   | JMeter, k6           |
| Responsiveness | Chrome DevTools      |
| Dokumentasi    | Markdown             |

---
