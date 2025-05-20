describe('FR01–FR06 – Halaman Pengajuan Pajak', () => {
  beforeEach(() => {
    cy.visit('/form') // sesuaikan dengan route aktual halaman ini
    cy.clearLocalStorage()
  })

  it('menolak jika dropdown kosong dan jumlah < 10000', () => {
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi').should('be.visible')
  })

  it('tidak menerima input negatif, nol, teks, atau simbol', () => {
    cy.get('input[type="text"]').type('-10000')
    cy.get('input[type="text"]').should('have.value', '10000') // strip minus (hanya angka)

    cy.get('input[type="text"]').clear().type('abc')
    cy.get('input[type="text"]').should('have.value', '') // tidak boleh menerima huruf

    cy.get('input[type="text"]').clear().type('0')
    cy.get('select').select('Pajak Penghasilan')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Jumlah pajak minimal Rp10.000 dan jenis pajak wajib diisi').should('be.visible')
  })

  it('dropdown memiliki 2 opsi pajak dan dapat dipilih', () => {
    cy.get('select').should('exist')
    cy.get('select > option').should('have.length.at.least', 3) // termasuk placeholder
    cy.get('select').select('Pajak Kendaraan').should('have.value', 'Pajak Kendaraan')
  })

  it('berhasil ajukan pajak dan tampil bukti lengkap', () => {
    cy.get('select').select('Pajak Kendaraan')
    cy.get('input[type="text"]').type('20000')
    cy.contains('Ajukan Pembayaran').click()

    cy.contains('Bukti Pengajuan').should('be.visible')
    cy.contains('Nomor Referensi: TAX2025').should('exist')
    cy.contains('Pajak Kendaraan').should('exist')
    cy.contains('Rp 20000').should('exist')
    cy.contains('Tanggal:').should('exist')
  })

  it('tombol "Ajukan Lagi" mereset form dan kembali ke awal', () => {
    cy.get('select').select('Pajak Kendaraan')
    cy.get('input[type="text"]').type('30000')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Ajukan Lagi').click()

    cy.get('select').should('have.value', '')
    cy.get('input[type="text"]').should('have.value', '')
    cy.contains('Ajukan Pembayaran').should('be.visible')
  })

  it('tombol "Kembali ke Home" mengarahkan ke halaman utama', () => {
    cy.get('select').select('Pajak Penghasilan')
    cy.get('input[type="text"]').type('50000')
    cy.contains('Ajukan Pembayaran').click()
    cy.contains('Kembali ke Home').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
