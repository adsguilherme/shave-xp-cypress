import loginPage from '../support/pages/login/index'
import shaversPage from '../support/pages/views/shavers/index'
import catalogPage from '../support/pages/views/catalog/index'
import orderPage from '../support/pages/views/order/index'

import data from '../fixtures/order.json'

describe('Pedido', () => {
  
  context('Usuário logado', () => {

    const { customer, shaver, service } = data // Aqui está sendo utilizado o conceito de destruturação { } .

    before(() => {
      
      cy.createUser(customer)
      cy.apiLogin(customer)

      //cy.uiLogin(customer)
      
      //loginPage.submit(customer.email, customer.password)
      //shaversPage.header.userShouldLoggedIn(customer.name)
      
    })

    it('Deve poder solicitar serviço', () => {

    shaversPage.selectShaver(shaver.name)
    catalogPage.hasShaver(shaver.name)

    catalogPage.selectService(service.description)
    catalogPage.hasTitle(service.description)

    catalogPage.confirmOrder()
    orderPage.hasOrder()
      
    })
    
  })

})