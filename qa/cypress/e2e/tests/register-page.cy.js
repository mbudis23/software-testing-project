describe('Halaman Register', () => {
  const dummyName = 'Siti Aminah'
  const dummyEmail = 'siti@example.com'
  const dummyPassword = 'password123'

  beforeEach(() => {
    cy.visit('/register') // pastikan route halaman register adalah /register
    cy.clearLocalStorage()
  })

  it('tidak bisa submit jika ada field yang kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Nama, email, dan password wajib diisi')
  })

  it('berhasil registrasi dengan data valid', () => {
    cy.get('input[type="text"]').type(dummyName)
    cy.get('input[type="email"]').type(dummyEmail)
    cy.get('input[type="password"]').type(dummyPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Registrasi berhasil! Silakan login.')
    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem('users'))
      expect(users).to.deep.include({
        name: dummyName,
        email: dummyEmail,
        password: dummyPassword
      })
    })

    cy.url({ timeout: 2000 }).should('include', '/login') // redirect terjadi
  })

  it('tidak bisa daftar dengan email yang sama', () => {
    // Simulasikan user sudah terdaftar
    cy.window().then((win) => {
      const user = [{ name: dummyName, email: dummyEmail, password: dummyPassword }]
      win.localStorage.setItem('users', JSON.stringify(user))
    })

    cy.get('input[type="text"]').type(dummyName)
    cy.get('input[type="email"]').type(dummyEmail)
    cy.get('input[type="password"]').type(dummyPassword)
    cy.get('button[type="submit"]').click()

    cy.contains('Email sudah terdaftar')
  })
})
