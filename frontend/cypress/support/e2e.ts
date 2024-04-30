// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
beforeEach(() => {
  cy.visit("");
});
before(() => {
  cy.request("GET", "http://localhost:3001/api/tests/cypress").then(
    (response) => expect(response.status).to.eq(200),
  );
});
after(() => {
  cy.request("GET", "http://localhost:3001/api/tests/clear").then((response) =>
    expect(response.status).to.eq(200),
  );
});
// Alternatively you can use CommonJS syntax:
// require('./commands')
