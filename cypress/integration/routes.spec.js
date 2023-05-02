describe('Testing routes available to an unauthenticated user', () => {
  it('Trying to access the labs page', () => {
    cy.visit(Cypress.env('BASE_URL')+'/labs');
    cy.url().should('eq', Cypress.env('BASE_URL')+'/login?redirect=/labs');
    cy.get('[data-cy=login-card]').should('be.visible');
  })

  it('Trying to access the sandbox page', () => {
    cy.visit(Cypress.env('BASE_URL')+'/sandbox');
    cy.url().should('eq', Cypress.env('BASE_URL')+'/login?redirect=/sandbox');
    cy.get('[data-cy=login-card]').should('be.visible');
  })

  it('Trying to access a page that does not exist', () => {
    cy.visit(Cypress.env('BASE_URL')+'/thispagedoesnotexist');
    cy.get('[data-cy=skillslounge-landin-page]');
  })

  it('Access the authentication page ', () => {
    cy.visit(Cypress.env('BASE_URL'))
    cy.get('[data-cy=dropdown-login-menu]').click();
    cy.get('[data-cy=dropdown-login-button]').should('be.visible').click();
    cy.url().should('include', '/login');
    cy.get('[data-cy=login-card]').should('be.visible');
  })

  it('Access the user preferences page', () => {
    cy.visit(Cypress.env('BASE_URL')+'/userdetails');
    cy.url().should('eq', Cypress.env('BASE_URL')+'/login?redirect=/userdetails');
    cy.get('[data-cy=login-card]').should('be.visible');
  })

  it('Access the user AddItem page', () => {
    cy.visit(Cypress.env('BASE_URL')+'/additem');
    cy.url().should('eq', Cypress.env('BASE_URL')+'/login?redirect=/additem');
    cy.get('[data-cy=login-card]').should('be.visible');
  })
})

