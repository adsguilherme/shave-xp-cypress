class LoginPage { // Nome de Classes usamos PascalCase

  constructor() {
    this.alertError = '.alert-error'
  }

  submit(email = null, password = null) {
    cy.visit('/')

    cy.get('input[placeholder$=email]').as('email')
    cy.get('input[placeholder*=senha]').as('password')

    if (email) {
      cy.get('@email').type(email)
    }

    if (password) {
      cy.get('@password').type(password)
    }

    cy.contains('button', 'Entrar').click()
  }

  noticeShouldBe(message) {
    cy.get('.notice-container')
      .should('be.visible')
      .find('.error p')
      .and('have.text', message)
  }

  alertShouldBe(message) {
    cy.get(this.alertError)
      .should('be.visible')
      .and('have.text', message)
  }

  requiredFields(emailMessage, passwordMessage ) {
    cy.get(this.alertError)
      .should('have.length', 2)
      .and(($small) => {
        expect($small.get(0).textContent).to.eq(emailMessage)
        expect($small.get(1).textContent).to.eq(passwordMessage)
      })
  }
}

export default new LoginPage()