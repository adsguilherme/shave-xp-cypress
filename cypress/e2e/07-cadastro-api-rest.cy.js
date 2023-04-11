import { faker } from '@faker-js/faker'

describe('Cadastro usuário', () => {

  it('Deve realizar cadastro com sucesso', () => {

    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/users',
      body: {
        'name': `${faker.name.firstName() +' '+ faker.name.lastName()}`,
        'email': `${faker.datatype.uuid()}@email.com` ,
        'password': 'pwd123'
    },
    }).then(({ status }) => {
      expect(status).to.eq(201)
    })
  })
})