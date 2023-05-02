import * as globals from "../support/global_constants";

const waitTime = 2000;
const commandTimeout = 10000;
const nonAdminEmail = globals.NonAdminUsername+globals.EmailDomain;

describe('Testing routes available to a standard user', () => {

  beforeEach(() => {
    
    cy.visit(Cypress.env('BASE_URL')+'/login');
    cy.intercept('GET', globals.LabsApiURL,  { fixture: 'labs.json' }).as('getLabs');
    cy.intercept('GET', globals.SessionsApiURL,  { fixture: 'sessionOff.json' }).as('getSessions');
    cy.intercept('GET', globals.GroupsURL,  { fixture: 'groups.json' }).as('getGroups');
    cy.intercept('POST', globals.AWSCognitoIDP,  { fixture: 'cognitoBasicUser.json' }).as('postCoggnitoIDP');
    cy.intercept('POST', globals.AWSCognitoIdentity,  { fixture: 'cognitoAdminIdentity.json' }).as('postCoggnitoIdentity');

    cy.url().should("include", "/login");
    // cy.wait(waitTime);
    cy.get('[data-cy=login-email-input]', { timeout: commandTimeout }).should('be.visible').type(nonAdminEmail);
    cy.get('[placeholder="Password"]', { timeout: commandTimeout }).should('be.visible').type(globals.UserPassword);
    cy.get('[data-cy=login-form-button]', { timeout: commandTimeout }).should('be.visible').click();
    cy.wait(['@postCoggnitoIDP', '@postCoggnitoIdentity'])
    // cy.wait(waitTime);
  })

  afterEach(() => {
    cy.get('[data-cy=dropdown-login-menu]').click({force: true});
    cy.get('[data-cy=dropdown-logout-button]').should('be.visible').click();
  })

  it('Trying to access the labs page', () => {
    cy.get('[data-cy=navbar-labs-button]', { timeout: commandTimeout }).should('be.visible').click();
    cy.wait(['@getLabs', '@getSessions', '@getGroups'])
    cy.url().should("include", "labs");
    cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible');
    cy.contains('DevOps playground - November - Jenkins test');
  });

  it('Access the user preferences page', () => {
    cy.wait(['@getSessions'])
    cy.get('[data-cy=dropdown-login-menu]').click();
    cy.get('[data-cy=dropdown-userdetails-button]').click();
    cy.url().should("include", "userdetails");
    cy.contains('Details');
    cy.get('[data-cy=userdetails-username]').should('have.value',globals.NonAdminUsername);
    cy.get('[data-cy=userdetails-email]').should('have.value',nonAdminEmail);
    cy.get('[data-cy=userdetails-save-button]').should('be.visible');
  });

  // it('Access the sandbox lab', () => {
  //   cy.visit(Cypress.env('BASE_URL')+'/labs')
  //   cy.intercept('GET', globals.LabsApiURL,  { fixture: 'labs.json' })
  //   cy.intercept('GET', globals.ReadmeS3URL,  { fixture: 'text.md' })
  //   cy.intercept('DELETE',globals.SessionsApiURL+'/*',
  //     {
  //       statusCode: 204,
  //   })
  //   cy.url().should("include", "labs")
  //   cy.get(`[class="btn btn-outline-success"]`).should('be.visible')
  //   cy.contains('Sandbox')
  //   cy.get(':nth-child(2) > .nav-link').click()
  //   cy.contains('PUNE - ITDO - Cloudformation')
  //   cy.get('.flex-column > :nth-child(1) > .nav-link').then(($span) => {
  //     expect($span.text()).to.eq("General")
  //        const text = $span.text()
  //   })
  //   cy.get('.side-menu > .flex-column > :nth-child(2)').then(($span) => {
  //     expect($span.text()).to.eq("Achievements ")
  //        const text = $span.text()
  //   })
  //   cy.get('.flex-column > :nth-child(3) > .nav-link').then(($span) => {
  //     expect($span.text()).to.eq("Slides")
  //        const text = $span.text()
  //   })
  //   cy.get('.flex-column > :nth-child(4)').then(($span) => {
  //     expect($span.text()).to.eq("Terminal")
  //        const text = $span.text()
  //   })
  //   cy.get(':nth-child(5) > .nav-link').then(($span) => {
  //     expect($span.text()).to.eq("IDE")
  //        const text = $span.text()
  //   })
  //   cy.get('.flex-column > :nth-child(7)').then(($span) => {
  //     expect($span.text()).to.eq("Available Services")
  //        const text = $span.text()
  //   })

  //   cy.get('.my-2').click()
  //   cy.get(`[class="modal-content"]`).should('be.visible')
  //   cy.get('.modal-footer > .btn-danger').click()
  //   cy.get(`[class="btn btn-secondary"]`).should('be.visible')
  //   cy.contains('Sandbox').should('not.exist')
  // });
});