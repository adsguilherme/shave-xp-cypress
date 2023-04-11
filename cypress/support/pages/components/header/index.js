class Header {

  userShouldLoggedIn(name) {

    const firstName = name.split(' ')[0]

    cy.get('.logged-user div a')
      .should('be.visible')
      .and ('have.text', 'Olá, ' + firstName)
  }
}

export default new Header()