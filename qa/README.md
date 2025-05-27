DevTools listening on ws://127.0.0.1:37221/devtools/browser/d03f20a5-dc8b-40d6-8c40-f4a5b86a84c5

====================================================================================================

(Run Starting)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Cypress: 14.3.3 │
│ Browser: Electron 130 (headless) │
│ Node Version: v18.19.1 (/usr/bin/node) │
│ Specs: 5 found (FR00.cy.js, FR01-FR02.cy.js, FR03-FR04.cy.js, FR05-FR06.cy.js, NFR01- │
│ NFR05.cy.js) │
│ Searched: cypress/e2e/\*_/_.cy.{js,jsx,ts,tsx} │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────────────────────

Running: FR00.cy.js (1 of 5)

✅ AUTENTIKASI (FR00)
✓ TC001 - Autentikasi Valid (2312ms)
✓ TC002 - KTP Kurang dari 16 (517ms)
✓ TC003 - KTP Bukan Angka (544ms)
✓ TC004 - Kosong Semua (334ms)

4 passing (4s)

(Results)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Tests: 4 │
│ Passing: 4 │
│ Failing: 0 │
│ Pending: 0 │
│ Skipped: 0 │
│ Screenshots: 0 │
│ Video: false │
│ Duration: 3 seconds │
│ Spec Ran: FR00.cy.js │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────────────────────

Running: FR01-FR02.cy.js (2 of 5)

✅ FORMULIR PAJAK (FR01–FR02)
✓ TC005A - Memilih opsi Pajak Kendaraan dari dropdown (778ms)
✓ TC005B - Memilih opsi Pajak Penghasilan dari dropdown (274ms)
✓ TC006A - Submit Pajak Penghasilan dengan jumlah 150000 (1966ms)
✓ TC006B - Submit Pajak Kendaraan dengan jumlah 250000 (1310ms)
✓ TC006C - Submit Pajak Penghasilan dengan jumlah minimum (10000) (1234ms)
✓ TC006D - Submit Pajak Kendaraan dengan jumlah besar (10000000) (1266ms) 1) TC006E - Submit Pajak Penghasilan dengan jumlah menggunakan leading zero (00020000)
✓ TC007 - Jumlah Pajak Kosong (396ms) 2) TC008 - Jumlah Negatif
✓ TC009 - Input Non-Numerik (550ms)

8 passing (19s)
2 failing

1. ✅ FORMULIR PAJAK (FR01–FR02)
   TC006E - Submit Pajak Penghasilan dengan jumlah menggunakan leading zero (00020000):
   AssertionError: Timed out retrying after 4000ms: Expected to find content: 'Jumlah: Rp 20000' but never did.
   at Context.eval (webpack:///./cypress/e2e/FR01-FR02.cy.js:55:36)

2. ✅ FORMULIR PAJAK (FR01–FR02)
   TC008 - Jumlah Negatif:
   AssertionError: Timed out retrying after 4000ms: Expected to find element: `.text-red-500`, but never found it.
   at Context.eval (webpack:///./cypress/e2e/FR01-FR02.cy.js:68:28)

(Results)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Tests: 10 │
│ Passing: 8 │
│ Failing: 2 │
│ Pending: 0 │
│ Skipped: 0 │
│ Screenshots: 2 │
│ Video: false │
│ Duration: 18 seconds │
│ Spec Ran: FR01-FR02.cy.js │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

(Screenshots)

- /home/budi-setiawan/Documents/software-testing-project/qa/cypress/screenshots/FR (1280x720)
  01-FR02.cy.js/✅ FORMULIR PAJAK (FR01–FR02) -- TC006E - Submit Pajak Penghasila…  
  dengan jumlah menggunakan leading zero (00020000) (failed).png
- /home/budi-setiawan/Documents/software-testing-project/qa/cypress/screenshots/FR (1280x720)
  01-FR02.cy.js/✅ FORMULIR PAJAK (FR01–FR02) -- TC008 - Jumlah Negatif (failed).…  
  g

────────────────────────────────────────────────────────────────────────────────────────────────────

Running: FR03-FR04.cy.js (3 of 5)

✅ PENGAJUAN & NOMOR REFERENSI (FR03–FR04)
✓ TC010 - Referensi Unik Format (3657ms)
✓ TC011 - Bukti Pembayaran Lengkap di Halaman Form (1404ms)
✓ TC011 - Bukti Pembayaran Lengkap di Halaman Cek (2535ms)

3 passing (8s)

(Results)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Tests: 3 │
│ Passing: 3 │
│ Failing: 0 │
│ Pending: 0 │
│ Skipped: 0 │
│ Screenshots: 0 │
│ Video: false │
│ Duration: 7 seconds │
│ Spec Ran: FR03-FR04.cy.js │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────────────────────

Running: FR05-FR06.cy.js (4 of 5)

✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06)
✓ TC012 - Pesan Error Jumlah (799ms) 1) TC013 - Tombol Kembali setelah Error

1 passing (5s)
1 failing

1. ✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06)
   TC013 - Tombol Kembali setelah Error:
   AssertionError: Timed out retrying after 4000ms: Expected to find content: 'Ajukan Lagi' within the element: <button.w-full.bg-indigo-600.text-white.py-2.px-4.rounded-md.hover:bg-indigo-700> but never did.
   at Context.eval (webpack:///./cypress/e2e/FR05-FR06.cy.js:17:21)

(Results)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Tests: 2 │
│ Passing: 1 │
│ Failing: 1 │
│ Pending: 0 │
│ Skipped: 0 │
│ Screenshots: 1 │
│ Video: false │
│ Duration: 5 seconds │
│ Spec Ran: FR05-FR06.cy.js │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

(Screenshots)

- /home/budi-setiawan/Documents/software-testing-project/qa/cypress/screenshots/FR (1280x720)
  05-FR06.cy.js/✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06) -- TC013 - Tombol Kemb…  
  i setelah Error (failed).png

────────────────────────────────────────────────────────────────────────────────────────────────────

Running: NFR01-NFR05.cy.js (5 of 5)

✅ NON-FUNCTIONAL TESTS (NFR01–NFR05)
✓ TC014 - Respons Time < 2 detik (1865ms)
✓ TC015 - UI Responsif Mobile (180ms) 1) TC016 - Validasi Real-time
✓ TC017 - Beban ≥ 100 Input (168276ms)

3 passing (3m)
1 failing

1. ✅ NON-FUNCTIONAL TESTS (NFR01–NFR05)
   TC016 - Validasi Real-time:
   AssertionError: Timed out retrying after 4000ms: Expected to find element: `.text-red-500`, but never found it.
   at Context.eval (webpack:///./cypress/e2e/NFR01-NFR05.cy.js:29:28)

(Results)

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Tests: 4 │
│ Passing: 3 │
│ Failing: 1 │
│ Pending: 0 │
│ Skipped: 0 │
│ Screenshots: 1 │
│ Video: false │
│ Duration: 2 minutes, 54 seconds │
│ Spec Ran: NFR01-NFR05.cy.js │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

(Screenshots)

- /home/budi-setiawan/Documents/software-testing-project/qa/cypress/screenshots/NF (1280x720)
  R01-NFR05.cy.js/✅ NON-FUNCTIONAL TESTS (NFR01–NFR05) -- TC016 - Validasi Real-…  
  me (failed).png

====================================================================================================

(Run Finished)

       Spec                                              Tests  Passing  Failing  Pending  Skipped

┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ✔ FR00.cy.js 00:03 4 4 - - - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✖ FR01-FR02.cy.js 00:18 10 8 2 - - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✔ FR03-FR04.cy.js 00:07 3 3 - - - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✖ FR05-FR06.cy.js 00:05 2 1 1 - - │
├────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ✖ NFR01-NFR05.cy.js 02:54 4 3 1 - - │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
✖ 3 of 5 failed (60%) 03:30 23 19 4 - -
