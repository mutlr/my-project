import { hexToRgb, GREEN, USERNAME, PASSWORD } from "../support/utilities";

describe("Login and register tests", () => {
  describe("Register tests", () => {
    it("Register errors", () => {
      cy.contains("Login");
      cy.contains("Register").click();
      cy.get('input[name="username"]').type("Us");
      cy.get('input[name="email"]').type("Username");
      cy.get('input[name="password"]').type("Us");
      cy.get("button").click();
      cy.contains("Enter a valid email").should(
        "have.css",
        "color",
        hexToRgb("#ff0000"),
      );
      cy.contains("Username min 4 characters").should(
        "have.css",
        "color",
        hexToRgb("#ff0000"),
      );
      cy.contains("Password must be at least 6 characters").should(
        "have.css",
        "color",
        hexToRgb("#ff0000"),
      );
      cy.get('input[name="email"]').clear().type("email22@hotmail.com");
      cy.get("Enter a valid email").should("not.exist");
    });

    it("Register works", () => {
      cy.contains("Register").click();

      cy.get('input[name="username"]').type("UsernameCypress");
      cy.get('input[name="email"]').type("Username@hotmail.com");
      cy.get('input[name="password"]').type("Password");

      cy.get("button").click();
      cy.contains("Registered successfully!").should(
        "have.css",
        "background-color",
        GREEN,
      );
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.contains("Profile");
    });
  });

  describe("Login tests", () => {
    before(() => {
      cy.register();
    });
    it("Login errors", () => {
      cy.contains("Login").click();
      cy.get("button").click();

      cy.contains("Username is required").should(
        "have.css",
        "color",
        hexToRgb("#ff0000"),
      );
      cy.contains("Password is required").should(
        "have.css",
        "color",
        hexToRgb("#ff0000"),
      );
      cy.contains("Profile").should("not.exist");
    });
    it("Login with invalid user", () => {
      cy.contains("Login").click();
      cy.get('input[name="username"]').type("Username22");
      cy.get('input[name="password"]').type("Username");

      cy.get("button").click();
      cy.contains("Invalid username or password").should(
        "have.css",
        "background-color",
        hexToRgb("#ff0000"),
      );
    });

    it("Login with valid user", () => {
      cy.visit("/login");
      cy.get('input[name="username"]').type(USERNAME);
      cy.get('input[name="password"]').type(PASSWORD);
      cy.get("button").click();
      cy.contains("Logged in!").should("have.css", "background-color", GREEN);
      cy.contains("Profile");
    });
  });
});
