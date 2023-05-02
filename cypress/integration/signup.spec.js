import * as globals from "../support/global_constants";

const timeout = 1000;

describe("Testing sign up for a new user", () => {
  let emailToRegister = globals.NonAdminUsername+globals.EmailDomain

  it("Trying to access the register page from the loginpage", () => {
    cy.visit(Cypress.env('BASE_URL')+'/login');
    cy.url().should("include", "/login");
    cy.contains("Create Account").click();
    cy.url().should("include", "/register");
  });

  it("Sign up on the register page", () => {

    cy.visit(Cypress.env('BASE_URL')+'/register');
    cy.intercept('POST', globals.AWSCognitoIDP,  { fixture: 'cognitoRegister.json' }).as("postCognitoIDP");
    cy.url().should("include", "/register");
    cy.get('[data-cy=register-fullname-input]').type(globals.NonAdminUsername);
    cy.get('[data-cy=register-email-input]').type(emailToRegister);
    cy.get('[placeholder="Password"]').type(globals.SkillsLoungeSignupPassword);
    cy.get('[data-cy=register-password-confirm-input]').type(
      globals.SkillsLoungeSignupPassword
    );
 
    cy.get('[data-cy=register-terms-checkbox]').check({ force: true });

    // Press Get Started Button
    cy.get('[data-cy=register-submit-button]').click();
    cy.url().should("include", "/activate");
    cy.wait(["@postCognitoIDP"]);

    // Set activation code
    cy.get('[data-cy=activate-code-input]').should('be.visible').type("111111");
    cy.get('[data-cy=activate-submit-button]').click();
    cy.contains('Account activation was successful. Please login on the next screen.');
    cy.get('[class="btn btn-primary"]').click()

  });

  it("Login with created user", () => {
    // login attempt
    cy.visit(Cypress.env('BASE_URL')+'/login?redirect=/labs');
    cy.intercept('POST', globals.AWSCognitoIDP,  { fixture: 'cognitoBasicUser.json' }).as("postCognitoIDP");
    cy.intercept('GET', globals.SessionsApiURL,  { fixture: 'sessionOff.json' }).as("getSessions");
    cy.intercept('POST', globals.AWSCognitoIdentity,  { fixture: 'cognitoUserIdentity.json' }).as("postCognitoIdentity");
    cy.intercept('GET', globals.LabsApiURL,  { fixture: 'labs.json' }).as("getLabs");
    cy.get('[data-cy=login-email-input]').type(emailToRegister);
    cy.get('[placeholder="Password"]').type(globals.SkillsLoungeSignupPassword);
    cy.get('[data-cy=login-form-button]').click();
    cy.wait(["@postCognitoIDP", "@postCognitoIdentity","@getSessions","@getLabs"]);
    cy.get('[data-cy=labs-runlab-button]').should('be.visible');
    cy.url().should("include", "labs");
    // logout user
    cy.get('[data-cy=dropdown-login-menu]').click();
    cy.get('[data-cy=dropdown-logout-button]').should('be.visible').click();
    cy.contains('Login');
  });

});