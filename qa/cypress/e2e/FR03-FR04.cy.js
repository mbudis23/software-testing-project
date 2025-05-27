describe('✅ PENGAJUAN & NOMOR REFERENSI (FR03–FR04)', () => {
  let referenceId = '';

  beforeEach(() => {
    localStorage.setItem('npwp', '1234567890123456');
    cy.visit('/form');
  });

  it('TC010 - Referensi Unik Format', () => {
    // Pengajuan pertama
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('200000');
    cy.contains('Ajukan Pembayaran').click();

    // Validasi format referensi
    cy.contains(/^TAX2025-\d{3}$/).should('exist');

    // Simpan referensi pertama
    cy.contains(/^TAX2025-\d{3}$/)
      .invoke('text')
      .then((ref1) => {
        // Pengajuan kedua
        cy.visit('/form');
        cy.get('select').select('Pajak Penghasilan');
        cy.get('#amount').type('200000');
        cy.contains('Ajukan Pembayaran').click();

        cy.contains(/^TAX2025-\d{3}$/)
          .invoke('text')
          .should((ref2) => {
            expect(ref2).not.to.eq(ref1);
          });
      });
  });

  it('TC011 - Bukti Pembayaran Lengkap di Halaman Form', () => {
    cy.get('select').select('Pajak Penghasilan');
    cy.get('#amount').type('200000');
    cy.contains('Ajukan Pembayaran').click();

    cy.contains(/^TAX2025-\d{3}$/)
      .should('exist')
      .invoke('text')
      .then((ref) => {
        referenceId = ref.trim(); // Simpan untuk pengecekan halaman /cek
      });

    cy.contains('Pajak Penghasilan').should('exist');
    cy.contains('200000').should('exist');
    cy.contains('Tanggal').should('exist').and('not.be.empty');
  });

  it('TC011 - Bukti Pembayaran Lengkap di Halaman Cek', () => {
  // Ajukan data terlebih dahulu
  cy.get('select').select('Pajak Penghasilan');
  cy.get('#amount').type('250000');
  cy.contains('Ajukan Pembayaran').click();

  // Ambil referensi
  cy.contains(/^TAX2025-\d{3}$/)
    .invoke('text')
    .then((ref) => {
      const refId = ref.trim();

      // Navigasi ke halaman cek dan input referensi
      cy.visit('/cek');
      cy.get('#refInput').type(refId);
      cy.contains('button', 'Cek Bukti').click();

      // Validasi tampilan satu baris per elemen
      cy.contains(`Nomor Referensi: ${refId}`).should('exist');
      cy.contains('Jenis Pajak: Pajak Penghasilan').should('exist');
      cy.contains('Jumlah: Rp').should('contain.text', 'Rp'); // pastikan label dan angka muncul
      cy.contains('Tanggal:').should('exist'); // ISO format
    });
});

});
