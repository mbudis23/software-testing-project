describe('HomePage Form Behavior', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // ganti dengan URL dev kamu
    cy.clearLocalStorage();
  });

  it('menampilkan error jika nama dan NPWP kosong', () => {
    cy.get('button').contains('Ajukan Pajak').click();
    cy.contains('Nama dan NPWP harus diisi!').should('be.visible');
  });

  it('menampilkan error jika NPWP tidak 16 digit', () => {
    cy.get('input[placeholder="Masukkan Nama"]').type('Budi Santoso');
    cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('12345');
    cy.get('button').contains('Ajukan Pajak').click();
    cy.contains('NPWP harus terdiri dari 16 digit').should('be.visible');
  });

  it('berhasil submit jika nama dan NPWP valid', () => {
    cy.get('input[placeholder="Masukkan Nama"]').type('Budi Santoso');
    cy.get('input[placeholder="Masukkan NPWP (16 digit)"]').type('1234567890123456');
    cy.get('button').contains('Ajukan Pajak').click();

    // seharusnya redirect ke /form
    cy.url().should('include', '/form');

    // dan menyimpan data ke localStorage
    cy.window().then((win) => {
      expect(win.localStorage.getItem('name')).to.equal('Budi Santoso');
      expect(win.localStorage.getItem('npwp')).to.equal('1234567890123456');
    });
  });

  it('navigasi ke halaman cek bukti pengajuan', () => {
    cy.get('button').contains('Cek Bukti Pengajuan').click();
    cy.url().should('include', '/cek');
  });
});
