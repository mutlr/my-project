import { USERNAME, PASSWORD, hexToRgb } from "../support/utilities";

const COMMENT_TITLE = "Comment title for Cypress";
describe("Comment tests", () => {
  before(() => {
    cy.register();
  });
  beforeEach(() => {
    cy.login(USERNAME, PASSWORD);
    cy.get(".frontpage-container").first().click();
  });

  it("Comment button visible", () => {
    cy.contains("Comment");
  });
  it("Cannot comment without title", () => {
    let songName;
    let artist;
    cy.contains("Comment").click();
    cy.get('input[name="song"]').type("hello");
    cy.get(".songs-container")
      .first()
      .within(() => {
        cy.get(".song-name")
          .first()
          .then((e) => {
            songName = e.text();
            console.log("Song: ", e.text());
          });
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
    cy.contains("Title is required").should(
      "have.css",
      "color",
      hexToRgb("#ff0000"),
    );
    cy.get(".post-form-main-container").should("be.visible");
  });
  it("Cannot comment without song", () => {
    cy.contains("Comment").click();
    cy.get('input[name="title"]').type(COMMENT_TITLE);
    cy.contains("Submit").click();
    cy.get(".post-form-main-container").within(() => {
      cy.get(".postform-error")
        .should("contain.text", "Choose a song")
        .should("have.css", "color", hexToRgb("#ff0000"));
    });
    cy.get(".post-form-main-container").should("be.visible");
  });
  it("Commenting works", () => {
    let songName;
    let artist;
    cy.contains("Comment").click();
    cy.get('input[name="title"]').type(COMMENT_TITLE);
    cy.get('input[name="song"]').type("hello");
    cy.get(".songs-container")
      .first()
      .within(() => {
        cy.get(".song-name")
          .first()
          .then((e) => {
            songName = e.text();
            console.log("Song: ", e.text());
          });
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
    cy.get(".postpage-container").should("contain", COMMENT_TITLE);
    cy.get(".post-form-main-container").should("not.be.visible");
  });
});
