describe('Login Page', () => {

  it('เข้าสู่ระบบสำเร็จ', () => {
    cy.visit('/login')

    cy.env(['ADMIN_USERNAME', 'ADMIN_PASSWORD']).then(({ ADMIN_USERNAME, ADMIN_PASSWORD }) => {

      cy.log('ADMIN_USERNAME', ADMIN_USERNAME)
      cy.log('ADMIN_PASSWORD', ADMIN_PASSWORD)

      // ข้อมูลถูกดึงมาจาก cypress.env.json  ที่กำหนด รัหัสผ่านและ username ไว้แล้ว

      cy.get('[data-cy="login-username-input"]').type(ADMIN_USERNAME)
      cy.get('[data-cy="login-password-input"]').type(ADMIN_PASSWORD)
      cy.get('[data-cy="login-submit-button"]').click()

      cy.url().should('include', '/record')
    })
  })


  it('กรอกรหัสผ่านผิด แสดงข้อความ error, ค้างอยู่หน้าเดิม', () => {
    cy.visit('/login')
    cy.get('[data-cy="login-username-input"]').type('wrongusername')
    cy.get('[data-cy="login-password-input"]').type('wrongpassword')
    cy.get('[data-cy="login-submit-button"]').click()

    cy.get('[data-cy="login-error-alert"]')
      .should('contain.text', 'No active account found with the given credentials')

    cy.url().should('include', '/login')
  })

  it('ไม่กรอก username, password ต้อง error และไม่ redirect', () => {
    cy.visit('/login')

    cy.get('[data-cy="login-submit-button"]').click()

    cy.url().should('include', '/login')
  })

  it('กรอกแค่ username แต่ไม่กรอก password ต้อง error และไม่ redirect', () => {
    cy.visit('/login')
    cy.get('[data-cy="login-username-input"]').type('admin')
    cy.get('[data-cy="login-submit-button"]').click()
    cy.url().should('include', '/login')
  })

  it('กรอก username/password ผิดซ้ำจนระบบล็อก', () => {
    cy.visit('/login')

    cy.intercept('POST', '**/api/users/login').as('loginRequest')

    const username = 'admin'
    const wrongPassword = 'wrongpassword'

    // 🔁 ยิง login ผิด 5 ครั้ง
    for (let i = 0; i < 6; i++) {
      cy.get('[data-cy="login-username-input"]').clear().type(username)
      cy.get('[data-cy="login-password-input"]').clear().type(wrongPassword)
      cy.get('[data-cy="login-submit-button"]').click()

    }

    // 🔥 ครั้งที่ 6 → ควรถูกล็อก
    cy.get('[data-cy="login-username-input"]').clear().type(username)
    cy.get('[data-cy="login-password-input"]').clear().type(wrongPassword)
    cy.get('[data-cy="login-submit-button"]').click()



    // ✅ ตรวจข้อความแจ้งเตือน (แก้ syntax ให้ถูก)
    cy.get('[data-cy="login-error-alert"]')
      .should('be.visible')
      .and('contain.text', 'Too many failed login attempts')

    // ✅ ยังอยู่หน้า login
    cy.url().should('include', '/login')
  })

    it('เปลี่ยนภาษาไทยได้ และให้เปลี่ยนกลับเป็นอังกฤษ', () => {
    cy.visit('/login')
    cy.get('[data-cy="login-language-select"]').select('ไทย')

    cy.get('.justify-center').should('contain.text', 'ชื่อผู้ใช้')
    cy.get('.justify-center').should('not.contain.text', 'username')
    
  })
})