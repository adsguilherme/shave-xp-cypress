import forgotPassPage from '../support/pages/views/forgot-pass/index'
import resetPassPage from '../support/pages/views/reset-pass/index'
import loginPage from '../support/pages/views/login/index'
import shaversPage from '../support/pages/views/shavers/index'

describe('Esqueci minha senha', () => {
  
  it('Deve poder solicitar o resgate de senha', () => {

    const user = {
      name: 'Gui Sousa',
      email: 'qa@gmail.com',
      password: 'abc123',
      is_shaver: false
    }

    cy.createUser(user)

    forgotPassPage.go()
    forgotPassPage.submit(user.email) 
    
    const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
    forgotPassPage.noticeShouldBe(message)
    
  })

  context('Quando usuário solicita resgate de senha', () => {

    const user = {
      name: 'Gui Sousa 2',
      email: 'qa1@gmail.com',
      password: 'pwd123',
      is_shaver: false
    }
    beforeEach(() => {
      cy.createUser(user)
      cy.recoveryPass(user.email)
      cy.getToken(user.email) //HACK: Sempre que for usar o Cypress.env deixar dentro de um before/beforeEach. Caso contrário teremos esse, devido o JS ser assincrono. Se passar dentro do it não irá funcionar, trazendo vazio.
    })

    it('Deve poder cadastrar uma nova senha', () => {
      resetPassPage.go(Cypress.env('token'))
      resetPassPage.submit('abc123', 'abc123')

      const message = 'Agora você já pode logar com a sua nova senha secreta.'
      resetPassPage.noticeShouldBe(message)

      cy.log(Cypress.env('token'))
    })

    afterEach(() => {
      loginPage.submit(user.email, 'abc123')
      shaversPage.header.userShouldLoggedIn(user.name)
    })
  })

})