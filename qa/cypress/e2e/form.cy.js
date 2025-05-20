describe('Form Pengajuan Pajak', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/form', {
      onBeforeLoad(win) {
        win.localStorage.setItem('npwp', '1234567890123456'); // NPWP valid
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

  it('menampilkan error jika NPWP tidak 16 digit', () => {
    cy.window().then(win => win.localStorage.setItem('npwp', '123')); // NPWP salah
    cy.reload();
    cy.get('#taxType').select('Pajak Kendaraan');
    cy.get('#amount').type('12000');
    cy.contains('Ajukan Pembayaran').click();
    cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
  });

  it('berhasil submit jika input valid', () => {
    cy.get('#taxType').select('Pajak Kendaraan');
    cy.get('#amount').type('15000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('be.visible');
    cy.contains('Nomor Referensi:').should('exist');
    cy.contains('Pajak Kendaraan').should('exist');
    cy.contains('Rp 15000').should('exist');
    cy.contains('1234567890123456').should('exist');
  });

  it('dapat mengklik "Ajukan Lagi" dan reset form', () => {
    cy.get('#taxType').select('Pajak Penghasilan');
    cy.get('#amount').type('20000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Ajukan Lagi').click();
    cy.get('#taxType').should('have.value', '');
    cy.get('#amount').should('have.value', '');
    cy.contains('Formulir Pengajuan Pajak').should('exist');
  });

  it('dapat kembali ke halaman home', () => {
    cy.get('#taxType').select('Pajak Penghasilan');
    cy.get('#amount').type('30000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Kembali ke Home').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
