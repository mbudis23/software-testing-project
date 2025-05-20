describe('Sistem Pengajuan Pajak', () => {

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  // ========================
  // 💻 Halaman Home (/)
  // ========================
  describe('Halaman Home', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('menampilkan error jika nama dan NPWP kosong', () => {
      cy.contains('Ajukan Pajak').click();
      cy.contains('Nama dan NPWP harus diisi!').should('be.visible');
    });

    it('menampilkan error jika NPWP tidak 16 digit', () => {
      cy.get('input[placeholder="Masukkan Nama"]').type('Budi');
      cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('12345');
      cy.contains('Ajukan Pajak').click();
      cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
    });

    it('berhasil simpan data dan redirect ke /form', () => {
      cy.get('input[placeholder="Masukkan Nama"]').type('Budi');
      cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('1234567890123456');
      cy.contains('Ajukan Pajak').click();

      cy.url().should('include', '/form');
      cy.window().then(win => {
        expect(win.localStorage.getItem('name')).to.equal('Budi');
        expect(win.localStorage.getItem('npwp')).to.equal('1234567890123456');
      });
    });

    it('navigasi ke halaman cek bukti pengajuan', () => {
      cy.contains('Cek Bukti Pengajuan').click();
      cy.url().should('include', '/cek');
    });
  });

  // ========================
  // 📄 Halaman Form Pajak (/form)
  // ========================
  describe('Halaman Pengajuan Pajak', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/form', {
        onBeforeLoad(win) {
          win.localStorage.setItem('npwp', '1234567890123456');
        }
      });
    });

    it('menampilkan error jika jenis pajak dan jumlah kosong', () => {
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi').should('be.visible');
    });

    it('menampilkan error jika jumlah < 10000', () => {
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('9000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Jumlah pajak minimal Rp10.000').should('be.visible');
    });

    it('menampilkan error jika NPWP di localStorage tidak valid', () => {
      cy.window().then(win => win.localStorage.setItem('npwp', '123'));
      cy.reload();
      cy.get('#taxType').select('Pajak Kendaraan');
      cy.get('#amount').type('20000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
    });

    it('berhasil submit dan menampilkan bukti pengajuan', () => {
      cy.get('#taxType').select('Pajak Kendaraan');
      cy.get('#amount').type('25000');
      cy.contains('Ajukan Pembayaran').click();

      cy.contains('Bukti Pengajuan').should('be.visible');
      cy.contains('Nomor Referensi:').should('exist');
      cy.contains('Pajak Kendaraan').should('exist');
      cy.contains('Rp 25000').should('exist');
      cy.contains('1234567890123456').should('exist');
    });

    it('dapat mengklik "Ajukan Lagi" dan reset form', () => {
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('40000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Ajukan Lagi').click();
      cy.get('#taxType').should('have.value', '');
      cy.get('#amount').should('have.value', '');
    });

    it('dapat kembali ke halaman home', () => {
      cy.get('#taxType').select('Pajak Penghasilan');
      cy.get('#amount').type('30000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Kembali ke Home').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

});
