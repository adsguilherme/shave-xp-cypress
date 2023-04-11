import data from '../fixtures/user-login.json'
describe('Login', () => {

  context('Quando submeto o formulário', () => {

    it('Deve logar com sucesso - Usando Import', () => {

      const user = data.sucess

      cy.createUser(user)
      cy.submitLogin(user.email, user.password)
      cy.userShouldLoggedIn(user.name)
    })

    it('Não deve logar com senha incorreta', () => {

      const user = data.invpass

      cy.submitLogin(user.email, user.password)

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      cy.noticeErrorShouldBe(message)
    })

    it('Não deve logar com email não cadastrado', () => {

      const user = data.email404

      cy.submitLogin(user.email, user.password)
      
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      cy.noticeErrorShouldBe(message)
    })

    it('Campos obrigatórios', () => {
      cy.submitLogin()

      cy.get('.alert-error')
      .should('have.length', 2)
      .and(($small) => {
        expect($small.get(0).textContent).to.eq('E-mail é obrigatório')
        expect($small.get(1).textContent).to.eq('Senha é obrigatória')
      })
    })
  })

  context('Senha muito curta', () => {

    const user = {
      email: 'adm.guilhermedesousa@gmail.com'
    }

    data.shortpass.forEach((p) => {
      it(`Não deve logar com a senha: ${p}`, () => {
        cy.submitLogin(user.email, p)
        cy.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('Email no formato incorreto', () => {

    const user = {
      password: 'pwd123'
    }

    data.invemail.forEach((e) => {
      it(`Não deve logar com a senha: ${e}`, () => {
        cy.submitLogin(e, user.password)
        cy.alertShouldBe('Informe um email válido')
      })
    })
  })
})