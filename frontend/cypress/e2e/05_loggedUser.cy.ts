import { TITLE } from "../support/utilities";

describe("Logged in user", () => {
  beforeEach(() => {
    cy.login("User1", "user123");
  });
  before(() => {
    cy.login("User1", "user123");
    let songName;
    let artist;
    cy.visit("/post/1");
    cy.contains("Comment").click();
    cy.get('input[name="title"]').type(TITLE);
    cy.get('input[name="song"]').type("hello");
    cy.get(".songs-container")
      .first()
      .within(() => {
        cy.get(".song-name")
          .first()
          .then((e) => (songName = e.text()));
        cy.get(".song-artist")
          .first()
          .then((e) => (artist = e.text()));
      });
    cy.get(".song-box").first().click();
    cy.get(".post-form-main-container").within(() => {
      cy.get(".song-box")
        .first()
        .should("contain.text", songName)
        .should("contain.text", artist);
    });
    cy.contains("Submit").click();
  });
  it("Posts show in profile", () => {
    cy.contains("Profile").click();
    cy.get(".filter-container").contains("Posts");
    cy.get(".profile-content-container").children().should("have.length", 2);
    cy.get(".profile-content")
      .first()
      .within(() => {
        cy.get("button").first().contains("Delete");
        cy.get("button").first().next().contains("Edit");
      });
  });
  it("Comments show in profile", () => {
    cy.contains("Profile").click();
    cy.get(".filter-container").contains("Comments").click();
    cy.get(".profile-content-container").should("have.length", 1);
    cy.get(".profile-content").within(() => {
      cy.get("button").first().contains("Delete");
      cy.get("button").first().next().contains("Edit");
    });
  });
  it("Can delete comment", () => {
    cy.contains("Profile").click();
    cy.get(".filter-container").contains("Comments").click();
    cy.get(".profile-content-container").should("have.length", 1);
    cy.get(".profile-content").within(() => {
      cy.get("button").first().next().contains("Edit");
      cy.get("button").first().contains("Delete").click();
    });
    cy.get(".profile-content-container").should("be.empty");
    cy.visit("/post/1");
    cy.get(".postpage-container").should("not.contain", TITLE);
  });
  it("Can delete post", () => {
    cy.contains("Profile").click();
    cy.get(".filter-container").contains("Posts");
    cy.get(".profile-content").should("have.length", 2);
    cy.get(".profile-content")
      .first()
      .within(() => {
        cy.get("button").first().next().contains("Edit");
        cy.get("button").first().contains("Delete").click();
      });
    cy.get(".profile-content-container").should("have.length", 1);
    cy.get(".filter-container").contains("Comments").click();
    cy.get(".profile-content-container").should("have.length", 1);
    cy.visit("/");
    cy.frontpageChildCount(2);
  });
});
