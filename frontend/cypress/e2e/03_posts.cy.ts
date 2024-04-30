import { PASSWORD, TITLE, USERNAME, hexToRgb } from "../support/utilities";

describe("Post tests", () => {
  before(() => {
    cy.register();
  });
  beforeEach(() => {
    cy.login(USERNAME, PASSWORD);
    cy.contains("Add a post").click();
  });
  it("Cannot post without title", () => {
    let songName;
    let artist;
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
    cy.get(".post-form-main-container")
      .first()
      .within(() => {
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
    console.log("Song name: ", songName, "Artist: ", artist);
  });
  it("Cannot post without song", () => {
    cy.get('input[name="title"]').type(TITLE);
    cy.contains("Submit").click();
    cy.get(".post-form-main-container").within(() => {
      cy.get(".postform-error")
        .should("contain.text", "Choose a song")
        .should("have.css", "color", hexToRgb("#ff0000"));
    });
    cy.get(".post-form-main-container").should("be.visible");
    cy.contains("Cancel").click();
    cy.frontpageChildCount(3);
  });
  it("Posting works", () => {
    let songName;
    let artist;
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
    cy.get(".frontpage-container").should("contain", TITLE);
    cy.get(".post-form-main-container").should("not.be.visible");
    cy.frontpageChildCount(4);
  });
});
