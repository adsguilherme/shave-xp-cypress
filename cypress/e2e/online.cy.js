describe('app', () => {
  it('Deve estar online', () => {
    cy.visit('http://localhost:3000')
  })
})