describe('FR00 – Registrasi Pengguna (Register Page)', () => {
  const dummyName = 'Siti QA'
  const dummyEmail = 'sitiqa@example.com'
  const dummyPassword = 'secure123'

  beforeEach(() => {
    cy.visit('/register') // sesuaikan dengan route halaman register kamu
    cy.clearLocalStorage()
  })

  it('tidak bisa registrasi jika ada field kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Nama, email, dan password wajib diisi').should('be.visible')

    cy.get('input[type="text"]').type(dummyName)
    cy.get('button[type="submit"]').click()
    cy.contains('Nama, email, dan password wajib diisi')

    cy.get('input[type="email"]').type(dummyEmail)
    cy.get('button[type="submit"]').click()
    cy.contains('Nama, email, dan password wajib diisi')
  })

  it('tidak bisa registrasi dengan email yang sudah terdaftar', () => {
    // Simulasi user sudah terdaftar di localStorage
    cy.window().then((win) => {
      const existing = [{ name: dummyName, email: dummyEmail, password: dummyPassword }]
      win.localStorage.setItem('users', JSON.stringify(existing))
    })

    cy.get('input[type="text"]').type(dummyName)
    cy.get('input[type="email"]').type(dummyEmail)
    cy.get('input[type="password"]').type(dummyPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Email sudah terdaftar').should('be.visible')
  })

  it('berhasil registrasi dengan data valid', () => {
    cy.get('input[type="text"]').type(dummyName)
    cy.get('input[type="email"]').type(dummyEmail)
    cy.get('input[type="password"]').type(dummyPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Registrasi berhasil! Silakan login.').should('be.visible')
    cy.url({ timeout: 2000 }).should('include', '/login')

    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem('users'))
      expect(users).to.deep.include({
        name: dummyName,
        email: dummyEmail,
        password: dummyPassword,
      })
    })
  })
})
