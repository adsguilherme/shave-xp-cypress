import header from "../../components/header"

class ShaversPage {

  constructor() { // O contructor é uma função que é executada automaticamente quando ativo a classe. Não sendo necessário invocar o constructor.
    this.header = header
  }

  selectShaver(name) {
    cy.contains('figcaption h3', name) // Seletor CSS + texto
    .should('be.visible').click()
  }

}

export default new ShaversPage()