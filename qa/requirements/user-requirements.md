# 📄 User Requirement Document (URD)

## 1. Target Pengguna

- Masyarakat umum yang ingin melakukan pembayaran pajak online menggunakan **NPWP**
- Petugas pajak atau sistem eksternal yang ingin mengecek status pembayaran

## 2. Tujuan Sistem

Sistem ini bertujuan untuk:

- Menyediakan layanan digital untuk menyetor pajak secara online
- Memberikan **bukti pengiriman pajak** melalui referensi unik
- Memungkinkan pengguna mengecek **status pembayaran** dengan referenceId
- Memvalidasi keberadaan pengguna melalui NPWP

## 3. Functional Requirements

| Kode  | Deskripsi                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------- |
| FR-01 | Sistem harus memverifikasi keberadaan pengguna berdasarkan NPWP pada Firebase Realtime DB           |
| FR-02 | Sistem harus menolak format NPWP yang tidak sesuai (harus 6 digit angka)                            |
| FR-03 | Sistem harus memproses permintaan submit pajak dengan field wajib: `tax_type`, `amount`, dan `npwp` |
| FR-04 | Sistem harus menghasilkan dan menyimpan `referenceId` unik untuk setiap pembayaran                  |
| FR-05 | Sistem harus menyimpan data pembayaran pajak ke Firebase                                            |
| FR-06 | Sistem harus menolak `amount` yang bernilai negatif                                                 |
| FR-07 | Sistem harus menyediakan endpoint untuk mengecek status pembayaran berdasarkan `referenceId`        |
| FR-08 | Sistem harus menyediakan endpoint untuk mengambil data pengguna berdasarkan NPWP                    |

## 4. Non-Functional Requirements

| Kode   | Deskripsi                                                           |
| ------ | ------------------------------------------------------------------- |
| NFR-01 | Sistem harus memiliki response time < 1 detik untuk semua endpoint  |
| NFR-02 | Sistem harus memvalidasi semua input pengguna                       |
| NFR-03 | Sistem harus berjalan stabil pada lingkungan Node.js dengan Express |
