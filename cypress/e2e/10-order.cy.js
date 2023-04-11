import data from '../fixtures/order.json'

describe('Pedido', () => {

  context('Usuário logado', () => {

    const { customer, shaver, service } = data

    before(() => {

      cy.createUser(customer)
      cy.apiLogin(customer)

    })

    it('Deve poder solicitar serviço', () => {

      cy.selectShaver(shaver.name)
      cy.selectService(service.description)
      cy.confirmOrder()
      cy.hasOrder()
    })
  })
})