describe('✅ NON-FUNCTIONAL TESTS (NFR01–NFR05)', () => {
  beforeEach(() => {
    localStorage.setItem('npwp', '1234567890123456');
    cy.visit('/form');
  });

  it('TC014 - Respons Time < 2 detik', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('100000');

    const start = performance.now();
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan', { timeout: 2000 }).should('exist').then(() => {
      const end = performance.now();
      expect(end - start).to.be.lessThan(2000);
    });
  });

  it('TC015 - UI Responsif Mobile', () => {
    cy.viewport(375, 667); // iPhone 6/7/8 size
    cy.get('select').should('be.visible');
    cy.get('#amount').should('be.visible');
    cy.contains('Ajukan Pembayaran').should('be.visible');
  });

  it('TC016 - Validasi Real-time', () => {
    cy.get('#amount').type('abc');
    cy.get('.text-red-500').should('exist');
  });

  it('TC017 - Beban ≥ 100 Input', () => {
    for (let i = 0; i < 100; i++) {
      localStorage.setItem('npwp', '1234567890123456');
      cy.visit('/form');

      cy.get('select').select('Pajak Penghasilan');
      cy.get('#amount').type('10000');
      cy.contains('Ajukan Pembayaran').click();
      cy.contains('Bukti Pengajuan', { timeout: 3000 }).should('exist');
    }
  });
});