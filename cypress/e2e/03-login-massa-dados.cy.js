import loginPage from '../support/pages/login/index'
import shaversPage from '../support/pages/shavers/index'
//import header from '../support/components/header/index'

import data from '../fixtures/user-login.json' // Quando usamos import conseguimos acessar de forma explícita os níveis do objeto. Já com fixture não fica explícito esse acesso.
describe('Login', () => {

  context('Quando submeto o formulário', () => {

    it('Deve logar com sucesso - Usando Fixture', () => {

      cy.fixture('user-login').then(function(data){ // O argumento (data) é o objeto que irá receber os dados do arquivo user-login.json. 
        loginPage.submit(data.sucess.email, data.sucess.password)
        //header.userShouldLoggedIn(user.name)
        shaversPage.header.userShouldLoggedIn(data.sucess.name)
      })
    })

    it('Deve logar com sucesso - Usando Import', () => {

      const user = data.sucess
      
      loginPage.submit(data.sucess.email, data.sucess.password)
    
      //header.userShouldLoggedIn(user.name)
      shaversPage.header.userShouldLoggedIn(data.sucess.name)
    })

    it('Não deve logar com senha incorreta', () => {

      const user = data.invpass

      loginPage.submit(user.email, user.password)

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.noticeShouldBe(message)
    })

    it('Não deve logar com email não cadastrado', () => {

      const user = data.email404

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.submit(user.email, user.password)

      loginPage.noticeShouldBe(message)
    })

    it('Campos obrigatórios', () => {
      loginPage.submit()

      /* 1ª forma de validação
      cy.contains('.alert-error', 'E-mail é obrigatório')
        .should('be.visible')
      
      cy.contains('.alert-error', 'Senha é obrigatória')
        .should('be.visible')
      */

      /* 2ª forma de validação
      cy.get('.alert-error')
        .should('have.length', 2)
        .and(($small) => {
          expect($small.get(0).textContent).to.eq('E-mail é obrigatório')
          expect($small.get(1).textContent).to.eq('Senha é obrigatória')
        })    
      */

     // 3ª forma com PO
      loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
    })
  })

  // Outra forma de validação isolando por it, no entanto é mais custoso a nível de escrita e código.
  
  /*
  context('Campos obrigatórios', () => {

    beforeEach(() => {
      loginPage.submit()
    })

    it('Deve validar email', () => {

      cy.get('.alert-error')
        .should('have.length', 2)
        .and(($small) => {
          expect($small.get(0).textContent).to.eq('E-mail é obrigatório')
        })
    })

    it('Deve validar senha', () => {

      cy.get('.alert-error')
        .should('have.length', 2)
        .and(($small) => {
          expect($small.get(1).textContent).to.eq('Senha é obrigatória')
        })
    })
  })
 */ 

  context('Senha muito curta', () => {

    const user = {
      email: 'adm.guilhermedesousa@gmail.com'
    }

    //const password = data.shortpass
    //password.forEach((p) => {
    
    data.shortpass.forEach((p) => { // As duas linhas de cima foram trocadas por simplesmente essa linha passando data.shortpass
      it(`Não deve logar com a senha: ${p}`, () => {
        loginPage.submit(user.email, p)

        loginPage.alertShouldBe('Pelo menos 6 caracteres')
      })
    })
  })

  context('Email no formato incorreto', () => {

    const user = {
      password: 'pwd123'
    }

    //const email = data.invemail
    //email.forEach((e) => {

    data.invemail.forEach((e) => {
      it(`Não deve logar com a senha: ${e}`, () => {
        loginPage.submit(e, user.password)

        loginPage.alertShouldBe('Informe um email válido')
      })
    })
  })
})