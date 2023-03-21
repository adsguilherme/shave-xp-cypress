class Header {

  userShouldLoggedIn(name) {
    cy.get('.logged-user div a')
      .should('be.visible')
      .and ('have.text', 'Olá, '+ name)
  }
}

export default new Header()