describe('FR00 – Autentikasi Pengguna (Login Page)', () => {
  beforeEach(() => {
    cy.visit('/login') // sesuaikan dengan route login kamu
    cy.clearLocalStorage()
  })

  it('tidak bisa lanjut jika nama/KTP (email/password) kosong', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Email dan password wajib diisi').should('be.visible')
  })

  it('tidak bisa login jika hanya salah satu field diisi', () => {
    cy.get('input[type="email"]').type('user@example.com')
    cy.get('button[type="submit"]').click()
    cy.contains('Email dan password wajib diisi').should('be.visible')

    cy.get('input[type="email"]').clear()
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()
    cy.contains('Email dan password wajib diisi').should('be.visible')
  })

  it('menolak kredensial salah', () => {
    cy.get('input[type="email"]').type('salah@example.com')
    cy.get('input[type="password"]').type('wrongpass')
    cy.get('button[type="submit"]').click()
    cy.contains('Email atau password salah').should('be.visible')
  })

  it('berhasil login dengan kredensial benar', () => {
    cy.get('input[type="email"]').type('user@example.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('dummy-token')
      expect(win.localStorage.getItem('name')).to.eq('johndoe')
    })
  })
})


// describe('Halaman Login', () => {
//   const dummyEmail = 'user@example.com'
//   const dummyPassword = '123456'

//   beforeEach(() => {
//     cy.visit('/login') // asumsi route login adalah /login
//     cy.clearLocalStorage()
//   })

//   it('menolak login jika field kosong', () => {
//     cy.get('button[type="submit"]').click()
//     cy.contains('Email dan password wajib diisi')
//   })

//   it('menolak login jika kredensial salah', () => {
//     cy.get('input[type="email"]').type('salah@example.com')
//     cy.get('input[type="password"]').type('wrongpass')
//     cy.get('button[type="submit"]').click()
//     cy.contains('Email atau password salah')
//   })

//   it('berhasil login dengan kredensial benar', () => {
//     cy.get('input[type="email"]').type(dummyEmail)
//     cy.get('input[type="password"]').type(dummyPassword)
//     cy.get('button[type="submit"]').click()

//     cy.url().should('eq', `${Cypress.config().baseUrl}/`)
//     cy.window().then((win) => {
//       expect(win.localStorage.getItem('token')).to.eq('dummy-token')
//       expect(win.localStorage.getItem('name')).to.eq('johndoe')
//     })
//   })
// })
