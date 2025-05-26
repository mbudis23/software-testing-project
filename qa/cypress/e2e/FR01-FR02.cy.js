describe('✅ FORMULIR PAJAK (FR01–FR02)', () => {
  beforeEach(() => {
    localStorage.setItem('npwp', '1234567890123456');
    cy.visit('/form');
  });

  it('TC005A - Memilih opsi Pajak Kendaraan dari dropdown', () => {
    cy.get('select').select('Pajak Kendaraan')
      .should('have.value', 'Pajak Kendaraan');
  });

  it('TC005B - Memilih opsi Pajak Penghasilan dari dropdown', () => {
    cy.get('select').select('Pajak Penghasilan')
      .should('have.value', 'Pajak Penghasilan');
  });

  it('TC006A - Submit Pajak Penghasilan dengan jumlah 150000', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('150000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('exist');
  });

  it('TC006B - Submit Pajak Kendaraan dengan jumlah 250000', () => {
    cy.get('select').select('Pajak Kendaraan');
    cy.get('#amount').type('250000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('exist');
  });

  it('TC006C - Submit Pajak Penghasilan dengan jumlah minimum (10000)', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('10000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('exist');
  });

  it('TC006D - Submit Pajak Kendaraan dengan jumlah besar (10000000)', () => {
    cy.get('select').select('Pajak Kendaraan');
    cy.get('#amount').type('10000000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('exist');
  });

  it('TC006E - Submit Pajak Penghasilan dengan jumlah menggunakan leading zero (00020000)', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('00020000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains('Bukti Pengajuan').should('exist');
    cy.contains('Jumlah: Rp 20000').should('exist');
  });

  it('TC007 - Jumlah Pajak Kosong', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.contains('Ajukan Pembayaran').click();
    cy.get('.text-red-500').should('exist');
  });

  it('TC008 - Jumlah Negatif', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('-100000');
    cy.contains('Ajukan Pembayaran').click();
    cy.get('.text-red-500').should('exist');
  });

  it('TC009 - Input Non-Numerik', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('abcde');
    cy.contains('Ajukan Pembayaran').click();
    cy.get('.text-red-500').should('exist');
  });
});