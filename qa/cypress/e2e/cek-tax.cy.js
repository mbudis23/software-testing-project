describe('Cek Bukti Pengajuan Pajak', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cek');
  });

  it('menampilkan form dan input tersedia', () => {
    cy.get('h2').contains('Cek Bukti Pengajuan').should('be.visible');
    cy.get('input#refInput').should('be.visible');
    cy.get('button').contains('Cek Bukti').should('exist');
  });

  it('berhasil menampilkan bukti pajak jika nomor referensi valid', () => {
    cy.get('input#refInput').type('tax2025-001');
    cy.get('button').contains('Cek Bukti').click();

    cy.contains('Nomor Referensi:').should('contain', 'TAX2025-159');
    cy.contains('Jenis Pajak:').should('contain', 'Pajak Penghasilan');
    cy.contains('Jumlah:').should('contain', '250000');
    cy.contains('Tanggal:').should('exist');
  });

  it('menampilkan error jika nomor referensi tidak ditemukan', () => {
    cy.get('input#refInput').type('TAX0000-999');
    cy.get('button').contains('Cek Bukti').click();

    cy.contains('Data tidak ditemukan. Pastikan nomor referensi benar.').should('be.visible');
  });

  it('mengubah input ke huruf kapital secara otomatis', () => {
    cy.get('input#refInput').type('tax2025-002');
    cy.get('input#refInput').should('have.value', 'TAX2025-002');
  });

  it('menampilkan bukti pajak untuk referensi TAX2025-002', () => {
    cy.get('input#refInput').type('TAX2025-002');
    cy.get('button').contains('Cek Bukti').click();

    cy.contains('Jenis Pajak:').should('contain', 'Pajak Kendaraan');
    cy.contains('Jumlah:').should('contain', '150000');
  });
});
