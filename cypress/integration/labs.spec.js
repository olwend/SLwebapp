import * as globals from "../support/global_constants";
var labsJson = require('../fixtures/labs.json');
var labItem = require('../fixtures/labItem.json');
var sessionOff = require('../fixtures/sessionOff.json');
var sessionOn = require('../fixtures/sessionOn.json');
const commandTimeout = 10000;
const waitTime = 1500;
const runLabWaitTime = 5000;
const labsReplies = [];
const sessionsReplies = [];

describe("Testing labs via an admin user", () => {
  var adminEmail = globals.AdminUsername+globals.EmailDomain;
  var labName1 = globals.TestLabName+"-1";
  var labName2 = globals.TestLabName+"-2";
  var labName3 = globals.TestLabName+"-3";

  beforeEach(() => {
    labsReplies.length = 0;
    sessionsReplies.length = 0;
    cy.visit(Cypress.env('BASE_URL')+'/login');
    cy.intercept('GET', globals.SessionsApiURL,  req => req.reply(sessionsReplies.shift())).as("getSessions");  
    cy.intercept('GET', globals.GroupsURL,  { fixture: 'groups.json' }).as('getGroups');    
    cy.intercept('DELETE', globals.LabsApiURL+"/*",  { statusCode: 204 }).as("deleteLabs");
    cy.intercept('PUT', globals.LabsApiURL+"/*",  { statusCode: 201 }).as("putLabs");
    cy.intercept('POST', globals.AWSCognitoIDP,  { fixture: 'cognitoAdminUser.json' }).as("postCognitoIDP");
    cy.intercept('POST', globals.AWSCognitoIdentity,  { fixture: 'cognitoAdminIdentity.json' }).as("postCognitoIdentity");
    cy.url().should("include", "/login");
    cy.contains('Login', { timeout: commandTimeout });
    cy.get('[data-cy=login-email-input]').type(adminEmail);
    cy.get('[placeholder="Password"]').type(globals.AdminPassword);
    cy.get('[data-cy=login-form-button]').click();
  })

  afterEach(() => {
    cy.get('[data-cy=dropdown-login-menu]').click();
    cy.get('[data-cy=dropdown-logout-button]').should('be.visible').click();
  })

    
  it("Admin user log in successfully using the login page", () => {
    // prepare labs for loading in labs subpage
    labsReplies.push(labsJson);
    gotLabsAndLoad();
    cy.url().should("include", "/labs");
  });

  it("Admin user creates and deletes a new lab successfully", () => {
    let newLab = prepareLabs(labName1);
    // prepare responses for this scenario of AWS old labs - 2x with added labs - old labs after deletion
    labsReplies.push(labsJson, newLab, newLab, labsJson);
    gotLabsAndLoad();
    createLab(labName1);
    searchLab(labName1);
    deleteLab(labName1);
  });

  it("Admin user creates, updates and deletes a new lab successfully", () => {
    let newLab = prepareLabs(labName2);
    // prepare responses for this scenario of AWS old labs - 4x with added labs because of edit and refresh - old labs after deletion
    labsReplies.push(labsJson, newLab, newLab, newLab, newLab,labsJson);
    gotLabsAndLoad();
    createLab(labName2);
    searchLab(labName2);

    // update lab
    cy.get('[data-cy=labs-editlab-button]').should('be.visible').click();
    // cy.get('[data-cy=labs-editlab-button]')
    // cy.wait(waitTime);
    cy.wait(["@getSpecificLab"]);
    cy.get('[data-cy=editlab-general-description-input]').type(" TempDescription");
    cy.get('[data-cy=editlab-save-button]').click();
    cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible');
    searchLab(labName2);
    deleteLab(labName2);
  });

  it("Admin user creates, runs and deletes a new lab successfully", () => {
    let newLab = prepareLabs(labName3);
    sessionsReplies.push(sessionOff,sessionOn,sessionOn,sessionOn,sessionOff);
    // cy.intercept('GET', globals.SessionsApiURL,  req => req.reply(sessionsReplies.shift()));    
    cy.intercept('POST', globals.SessionsApiURL, {statusCode:200}).as("postSession");
    cy.intercept('DELETE', globals.SessionsApiURL, {statusCode:200}).as("deleteSession");
    cy.intercept('GET', globals.ReadmeS3URL,  { fixture: 'text.md' }).as("getReadmeS3");
    labsReplies.push(labsJson, newLab, newLab, newLab, labsJson);
    gotLabsAndLoad();    
    createLab(labName3);    
    searchLab(labName3);    
    // run lab
    cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible').click();
    cy.wait(waitTime);
    cy.get('.modal-content').should('be.visible');
    cy.wait(waitTime);
    cy.url().should("include", "sandbox");
    cy.get('[data-cy=sandbox-general-link]').should('be.visible');
    cy.get('[data-cy=sandbox-slides-link]').should('be.visible');
    cy.get('[data-cy=sandbox-ide-link]').should('be.visible');
    cy.get('[data-cy=sandbox-session-labname]').then(($span) => {
      expect($span.text()).to.eq(labName3);
    })

    // End Lab 
    cy.get('[data-cy=sandbox-endlab-button]').click();
    cy.get('[data-cy=end-lab-modal-yes-button]', { timeout: commandTimeout }).should('be.visible').click();
    cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible');
    cy.wait(waitTime);
    deleteLab(labName3);
  });
});

function prepareLabs(labName) {
  let testLabs = Cypress._.cloneDeep(labsJson);
  labItem.labName = labName;
  testLabs.totalItems = testLabs.totalItems + 1;
  testLabs.items.push(labItem);
  cy.intercept('GET', globals.LabsApiURL+"/*", req => req.reply(labItem)).as("getSpecificLab");
  return testLabs;
}

function gotLabsAndLoad(){
  cy.intercept('GET', globals.LabsApiURL, req => req.reply(labsReplies.shift())).as("getLabs");
  cy.get('[data-cy=navbar-labs-button]').click();
  cy.wait(["@getLabs", "@getGroups", "@getSessions"]);
  cy.get('[data-cy=labs-newlab-button]', { timeout: commandTimeout }).should('be.visible');
  cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible');
}

function createLab(labName) {
  cy.intercept('POST', globals.LabsApiURL,  { fixture: 'labsCreate.json' }).as("postLabs");
  cy.intercept('PUT', globals.ReadmeS3URL, {
    statusCode: 200,
    } ).as("putReadmeS3");
  // create new lab
  cy.get('[data-cy=labs-newlab-button]', { timeout: commandTimeout }).click();

  // select base container tab & add IDE to base container
  cy.get('[data-cy=editlab-navbar-base-container-button]', { timeout: commandTimeout }).should('be.visible').click();
  cy.get('[data-cy=editlab-base-ide-switch]', { timeout: commandTimeout }).check({ force: true });
  cy.get('[data-cy=editlab-base-shell-switch]', { timeout: commandTimeout }).check({ force: true });

  // base settings of lab
  cy.get('[data-cy=editlab-navbar-general-button]').click();
  cy.get('[data-cy=editlab-general-labname-input]', { timeout: commandTimeout }).should('be.visible').type(labName);
  cy.get('[data-cy=editlab-general-description-input]', { timeout: commandTimeout }).should('be.visible').type(globals.TestDescription);
  cy.get('[data-cy=editlab-general-categories-input]').click().type('Cloud{enter}');
  cy.get('[data-cy=editlab-general-type-input]').click().type('Academy{enter}');
  cy.get('[data-cy=editlab-general-resource-input]').click().type('256 / 512{enter}');
  cy.get('[data-cy=editlab-general-timer-input]').click().type('30 minutes{enter}');
  cy.get('[data-cy=editlab-general-active-switch]').check({ force: true });
  cy.get('[data-cy=editlab-general-filename-input]').attachFile('readme.md');
  cy.wait(waitTime);
  cy.get('[data-cy=editlab-save-button]').click({force: true});
  cy.wait(["@getLabs", "@putReadmeS3", "@postLabs"]);
  cy.get('[data-cy=labs-runlab-button]', { timeout: commandTimeout }).should('be.visible');
}

function searchLab(labName) {
  cy.get('[data-cy=labs-refresh-button]', { timeout: commandTimeout }).should('be.visible').click({force: true});
  cy.wait(["@getLabs", "@getGroups"]);
  cy.wait(waitTime);  
  cy.get(`[class="form-control form-control-lg"]`).click().type(labName);
  cy.contains(labName, { timeout: commandTimeout });
  cy.wait(waitTime);
}

function searchLabClearField() {
  cy.get(`[class="form-control form-control-lg"]`).click().clear();
  cy.wait(waitTime);
}

function deleteLab(labName) {
    searchLabClearField(); 
    cy.get(`[class="form-control form-control-lg"]`).click().type(labName);
    cy.contains(labName, { timeout: commandTimeout });
    cy.get('[data-cy=labs-deletelab-button]', { timeout: commandTimeout }).should('be.visible').click();
    cy.wait(waitTime);
    cy.get(`[class="form-control form-control-lg"]`).click().type(labName);
    cy.contains('No data found!', { timeout: commandTimeout });
}

