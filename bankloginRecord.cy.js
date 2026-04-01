describe('Record Page', () => {
  beforeEach(() => {
    cy.login('DBB@Dev', 'Bank#1142')
  })
  it.skip('ตรวจสอบชื่อผู้ใช้งานที่แสดง กดที่ชื่อผู้ใช้งาน กดอุปกรณ์ของฉัน ดูรายละเอียดและ อุปกรณ์ของฉัน', () => {
    // 1. เข้าสู่หน้า Record
    cy.visit('/$/record/')

    // 2. กดเปิดเมนู (เพิ่มการเช็คให้ชัวร์ว่าปุ่มแสดงขึ้นมาแล้วค่อยกด)
    cy.get('[data-test="company-menu-button"]').should('be.visible').click()
    cy.get('#list-item-170').should('be.visible').click()

    cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-text-field__slot > [data-test="password"]').should('be.visible').click()
    cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-text-field__slot > [data-test="password"]').should('be.visible').type('Bank#1142')
    cy.get(':nth-child(4) > .v-input__control > .v-input__slot > .v-text-field__slot > [data-test="password"]').should('be.visible').click()
    cy.get(':nth-child(4) > .v-input__control > .v-input__slot > .v-text-field__slot > [data-test="password"]').should('be.visible').type('Bank#1143')
    cy.get('[data-test="confirm-password"]').should('be.visible').click()
    cy.get('[data-test="confirm-password"]').should('be.visible').type('Bank#1143')
    cy.get('[data-test="v-btn-update-password"]').should('be.visible').click()
    cy.url().should('include', '/record')
  })
  it.skip('ตรวจสอบ เครดิตวิดิโอคงเหลือ ', () => {
    cy.visit('/$/record/')

    cy.get('.v-app-bar__nav-icon > .v-btn__content > .v-icon').should('be.visible').click()
    cy.get(':nth-child(8) > .v-list-group__header').should('be.visible').click()
    cy.get('[href="/report/v2/record-transaction"]').should('be.visible').click()

    cy.url().should('include', '/record')
  })


  it.skip('ตรวจสอบ พื้นที่ Google Drive (ใช้ไปแล้ว / ทั้งหมด)', () => {
    cy.visit('/$/record/')

    cy.get('[data-test="record_balance"]').should('be.visible').click()
    cy.url().should('include', '/record')
  })


  it('อัดวิดีโอ WEBM Speed 1x ด้วย Order ที่มีในระบบ', () => {
    cy.visit('/$/record/')

    //เลือกกล้องที่ต้องการอัดวิดีโอ
    cy.get('[data-test="v-btn-setting"] > .v-btn__content > .v-icon').should('be.visible').click()
    cy.get('#v-select-camera > .v-input > .v-input__control > .v-input__slot > .v-select__slot').should('be.visible').click()
    cy.get('#list-170').should('be.visible').click()
    cy.get('.v-dialog').should('be.visible')

    // 🔽 เลื่อนลงด้านล่างแล้วกด
    cy.get(':nth-child(5) > .col > h3').scrollIntoView().should('be.visible').click()
    cy.get('.col > div > a').should('be.visible').invoke('removeAttr', 'target').click()

    cy.url().should('include', 'drive.google.com')

    // cy.get('input[type="email"]').should('be.visible').type('supportteam@dobybot.com')
    // cy.get('#identifierNext').should('be.visible').click()
    // cy.get('input[type="password"]').should('be.visible').type('D@bbsup10240')
    // cy.get('#passwordNext').should('be.visible').click()


    //ขั้นอัดวิดีโอ WEBM Speed 1x ด้วย Order ที่มีในระบบ 
    // cy.get('[data-test="v-text-field-control-code"]').should('be.visible').type('ORDER-202406-00001')
    // cy.get('[data-test="v-btn-record"]').should('be.visible').click()
  })
})

