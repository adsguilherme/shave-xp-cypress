import loginPage from '../support/pages/views/login/index'
import shaversPage from '../support/pages/views/shavers/index'

import { faker } from '@faker-js/faker'

// Delete via banco
// Cypress.Commands.add('createUser', (user) => {
//   cy.task('removeUser', user.email) // Essa task irá fazer o delete, conforme as config do arquivo cypress.config.js
//     .then(function (result) {
//       cy.log(result)
//     })

//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3333/users',
//     body: user,
//   }).then(function (response) {
//       expect(response.status).to.eq(201)
//   })
// })

// Delete via API Helpers
// Cypress.Commands.add('createUser', (user) => {
//   cy.request({
//     method: 'DELETE',
//     url: 'http://localhost:5000/user/' + user.email,
//   }).then(function (response) {
//     expect(response.status).to.eq(204)
//   })
    

//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:3333/users',
//     body: user,
//   }).then(function (response) {
//       expect(response.status).to.eq(201)
//   })
// })

// Implementando Delete e Post na API Helper
Cypress.Commands.add('createUser', (user) => {
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:5000/user/' + user.email,
  }).then(function (response) {
    expect(response.status).to.eq(204)
  })
    
  cy.request({
    method: 'POST',
    url: 'http://localhost:5000/user',
    body: user,
  }).then(function (response) {
      expect(response.status).to.eq(201)
  })
})

Cypress.Commands.add('recoveryPass', (email) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/password/forgot',
    body: { email: email}
  }).then(result => {
    expect(result.status).to.eq(204)
  })
})

Cypress.Commands.add('getToken', (email) => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:5000/token/' + email,
  }).then(result => {
    expect(result.status).to.eq(200)
    cy.log(result.body.token)
    Cypress.env('token', result.body.token)
  })
})

Cypress.Commands.add('uiLogin', (user) => {
  loginPage.submit(user.email, user.password)
  shaversPage.header.userShouldLoggedIn(user.name)
})

Cypress.Commands.add('apiLogin', (user) => {

  cy.request({
    method: 'POST',
    url: 'http://localhost:3333/sessions',
    body: { 
      email: user.email,
      password: user.password
    }
  }).then(response => {
      expect(response.status).to.equal(200)

      const { user, token } = response.body

      window.localStorage.setItem('@ShaveXP:token', token)
      window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
  })

  cy.visit('/')
})

Cypress.Commands.add('deleteUser', (user) => {
  cy.request({
      method: 'DELETE',
      url: 'http://localhost:5000/user/' + user.email
  }).then(function (response) {
      expect(response.status).to.eq(204)
  })
})