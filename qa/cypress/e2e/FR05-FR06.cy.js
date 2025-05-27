describe('✅ PENANGANAN ERROR & NAVIGASI (FR05–FR06)', () => {
  beforeEach(() => {
    localStorage.setItem('npwp', '1234567890123456');
    cy.visit('/form');
  });

  it('TC012 - Pesan Error Jumlah', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.contains('Ajukan Pembayaran').click();
    cy.get('.text-red-500').should('exist');
  });

  it('TC013 - Tombol Kembali setelah Error', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.contains('Ajukan Pembayaran').click();
    cy.get('.text-red-500').should('exist');
    cy.get('button').contains('Ajukan Lagi').click(); // hanya muncul setelah submit sukses
    cy.get('select').should('have.value', '');
    cy.get('#amount').should('have.value', '');
  });
});