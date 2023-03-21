import loginPage from '../support/pages/login/index'
import shaversPage from '../support/pages/shavers/index'
//import header from '../support/components/header/index'
describe('Login', () => {

  context('Quando submeto o formulário', () => {

    it('Deve logar com sucesso', () => {

      const user = {
        name: 'Guilherme',
        email: 'adm.guilhermedesousa@gmail.com',
        password: 'pwd123'
      }
      
      loginPage.submit(user.email, user.password)
    
      //header.userShouldLoggedIn(user.name)
      shaversPage.header.userShouldLoggedIn(user.name)
    })

    it('Não deve logar com senha incorreta', () => {

      const user = {
        email: 'adm.guilhermedesousa@gmail.com',
        password: 'pwdError'
      }

      loginPage.submit(user.email, user.password)

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.noticeShouldBe(message)
    })

    it('Não deve logar com email não cadastrado', () => {

      const user = {
        email: 'naoexiste@gmail.com',
        password: 'pwd123'
      }

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

    const password = [
      '1',
      '12',
      '123',
      '1234',
      '12345',
    ]

    password.forEach((p) => {
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

    const email = [
      'gscode.com.br',
      'gscode&.com.br',
      '@.com.br',
      '112345',
      'xpto',
      'xpto123',
    ]

    email.forEach((e) => {
      it(`Não deve logar com a senha: ${e}`, () => {
        loginPage.submit(e, user.password)

        loginPage.alertShouldBe('Informe um email válido')
      })
    })
  })
})