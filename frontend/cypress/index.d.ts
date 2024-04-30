declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): void;
    register(): void;
    frontpageChildCount(count: number): void;
  }
}
