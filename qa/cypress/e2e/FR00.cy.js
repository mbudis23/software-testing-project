describe('✅ AUTENTIKASI (FR00)', () => {
  it('TC001 - Autentikasi Valid', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('1234567890123456');
    cy.contains('Ajukan Pajak').click();
    cy.url().should('include', '/form');
  });

  it('TC002 - KTP Kurang dari 16', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('123456789012345');
    cy.contains('Ajukan Pajak').click();
    cy.get('.text-red-500').should('exist');
  });

  it('TC003 - KTP Bukan Angka', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('12a#67890bcd!@#%');
    cy.contains('Ajukan Pajak').click();
    cy.get('.text-red-500').should('exist');
  });

  it('TC004 - Kosong Semua', () => {
    cy.visit('/');
    cy.contains('Ajukan Pajak').click();
    cy.get('.text-red-500').should('exist');
  });
});