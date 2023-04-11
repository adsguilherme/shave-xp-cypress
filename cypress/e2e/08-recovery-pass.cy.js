describe('Esqueci minha senha', () => {
  
  it('Deve poder solicitar o resgate de senha', () => {

    const user = {
      name: 'Gui Sousa',
      email: 'qa@gmail.com',
      password: 'abc123',
      is_shaver: false
    }

    cy.createUser(user)

    cy.requestPassword(user.email)
    
    const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
    cy.noticeSuccessShouldBe(message)
    
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
      cy.getToken(user.email)
    })

    it('Deve poder cadastrar uma nova senha', () => {

      cy.resetPassword(Cypress.env('token'), 'abc123', 'abc123')

      const message = 'Agora você já pode logar com a sua nova senha secreta.'
      cy.noticeSuccessShouldBe(message)

      cy.log(Cypress.env('token'))
    })

    afterEach(() => {
      cy.submitLogin(user.email, 'abc123')
      cy.userShouldLoggedIn(user.name)
    })
  })
})