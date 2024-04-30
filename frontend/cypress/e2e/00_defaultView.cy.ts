describe("Logged out user", () => {
  it("Posts show", () => {
    cy.frontpageChildCount(3);
  });

  it("Correct view", () => {
    cy.contains("Add a post").should("not.exist");
    cy.contains("Profile").should("not.exist");
    cy.contains("Home");
    cy.contains("Login");
    cy.contains("Register");
    cy.get(".frontpage-container").should("not.contain", "Add a post");
  });
  it("My profile route empty", () => {
    cy.visit("./myprofile");
    cy.get(".main").should("be.empty");
  });
  it("Delete and post buttons not visible in profile route", () => {
    cy.get(".content-header")
      .first()
      .within(() => {
        cy.get("a").click();
      });
    cy.get(".content-container")
      .first()
      .within(() => {
        cy.get(".edit-container").should("not.exist");
      });
  });
  it("Comment button not visible", () => {
    cy.get(".frontpage-container").should("not.contain", "Add a post");
    cy.get(".frontpage-container").first().click();
    cy.get("button").should("not.exist");
  });
});
