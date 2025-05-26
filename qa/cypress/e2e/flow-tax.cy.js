describe('Sistem Pengajuan Pajak - Versi NPWP Saja', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  // ========== HOME PAGE ==========
  describe('HomePage (/)', () => {
    beforeEach(() => {
      cy.visit('https://software-testing-project-o55d.vercel.app/');
    });

    it('Menampilkan error jika NPWP tidak 16 digit', () => {
      cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('12345');
      cy.contains('Ajukan Pajak').click();
      cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
    });

    it('Menyimpan NPWP valid dan redirect ke /form', () => {
      cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('1234567890123456');
      cy.contains('Ajukan Pajak').click();

      cy.url().should('include', '/form');
      cy.window().then(win => {
        expect(win.localStorage.getItem('npwp')).to.equal('1234567890123456');
      });
    });

    it('Navigasi ke halaman cek bukti', () => {
      cy.contains('Cek Bukti Pengajuan').click();
      cy.url().should('include', '/cek');
    });
  });

  // ========== FORM PAGE ==========
  describe('AjukanPajakPage (/form)', () => {
    beforeEach(() => {
      cy.visit('https://software-testing-project-o55d.vercel.app/form', {
        onBeforeLoad(win) {
          win.localStorage.setItem('npwp', '1234567890123456');
        }
      });
    });

    it('Menolak jika jumlah kosong dan jenis pajak belum dipilih', () => {
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi').should('be.visible');
    });

    it('Menolak jika jumlah < 10000', () => {
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('5000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Jumlah pajak minimal Rp10.000').should('be.visible');
    });

    it('Menolak jika NPWP di localStorage tidak valid', () => {
      cy.window().then(win => win.localStorage.setItem('npwp', '123'));
      cy.reload();
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('15000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
    });

    it('Menampilkan bukti pengajuan jika input valid', () => {
      cy.get('#taxType').select('Pajak Kendaraan');
      cy.get('#amount').type('25000');
      cy.contains('Ajukan Pembayaran').click();

      cy.contains('Bukti Pengajuan').should('be.visible');
      cy.contains('Nomor Referensi:').should('exist');
      cy.contains('Pajak Kendaraan').should('exist');
      cy.contains('Rp 25000').should('exist');
      cy.contains('1234567890123456').should('exist');
    });

    it('Reset form saat klik "Ajukan Lagi"', () => {
      cy.get('#taxType').select('Pajak Kendaraan');
      cy.get('#amount').type('40000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Ajukan Lagi').click();

      cy.get('#taxType').should('have.value', '');
      cy.get('#amount').should('have.value', '');
    });

    it('Kembali ke Home dari halaman bukti', () => {
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('60000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Kembali ke Home').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });
});
