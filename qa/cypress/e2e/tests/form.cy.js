describe('Halaman Pengajuan Pajak', () => {
  beforeEach(() => {
    cy.visit('/form') // Sesuaikan dengan route aktualnya
  })

  it('menolak pengajuan jika form kosong', () => {
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi')
  })

  it('menolak jumlah pajak < 10000', () => {
    cy.get('select').select('Pajak Penghasilan')
    cy.get('input[type="text"]').type('5000')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi')
  })

  it('berhasil mengajukan pajak dengan input valid', () => {
    cy.get('select').select('Pajak Kendaraan')
    cy.get('input[type="text"]').type('15000')
    cy.contains('Ajukan Pembayaran').click()

    cy.contains('Bukti Pengajuan')
    cy.contains('Nomor Referensi: TAX2025')
    cy.contains('Jenis Pajak: Pajak Kendaraan')
    cy.contains('Jumlah: Rp 15000')
  })

  it('tombol "Ajukan Lagi" me-reset form', () => {
    cy.get('select').select('Pajak Kendaraan')
    cy.get('input[type="text"]').type('15000')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Ajukan Lagi').click()

    // Formulir kembali tampil dan kosong
    cy.get('select').should('have.value', '')
    cy.get('input[type="text"]').should('have.value', '')
    cy.contains('Ajukan Pembayaran')
  })

  it('tombol "Kembali ke Home" mengarahkan ke homepage', () => {
    cy.get('select').select('Pajak Penghasilan')
    cy.get('input[type="text"]').type('30000')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Kembali ke Home').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
