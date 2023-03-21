describe('Login', () => {

  context('Quando submeto o formulário', () => {

    it('Deve logar com sucesso', () => {

      const user = {
        name: 'Guilherme',
        email: 'adm.guilhermedesousa@gmail.com',
        password: 'pwd123'
      }
      
      cy.visit('http://localhost:3000')

      cy.get('input[placeholder$=email]').type(user.email) // 'input[placeholder="Seu email"]'
      cy.get('input[placeholder*=senha]').type(user.password) // 'input[type="password"]'
      
      // * contém
      // ^ começa com
      // $ termina com

      cy.contains('button', 'Entrar').click()
      // Outra forma de seletor:
      //cy.get('button[type="submit"]').click() // Exemplo de xpath: //button[text()="Entrar"]

      cy.get('.logged-user div a')
        .should('be.visible')
        .and ('have.text', 'Olá, '+ user.name)
    })

    it('Não deve logar com senha incorreta', () => {

      cy.visit('http://localhost:3000')

      const user = {
        name: 'Guilherme',
        email: 'adm.guilhermedesousa@gmail.com',
        password: 'pwdError'
      }

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      cy.get('input[placeholder$=email]').type(user.email)
      cy.get('input[placeholder*=senha]').type(user.password)

      cy.contains('button', 'Entrar').click()

      cy.get('.notice-container')
        .should('be.visible')
        .find('.error p')
        .and('have.text', message)
    })

    it('Não deve logar com email não cadastrado', () => {

      cy.visit('http://localhost:3000')

      const user = {
        name: 'Guilherme',
        email: 'naoexiste@gmail.com',
        password: 'pwd123'
      }

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      cy.get('input[placeholder$=email]').type(user.email)
      cy.get('input[placeholder*=senha]').type(user.password)

      cy.contains('button', 'Entrar').click()

      cy.get('.notice-container')
        .should('be.visible')
        .find('.error p') // TODO: Depois testar se apenas com p funciona
        .and('have.text', message)
    })
  })
})