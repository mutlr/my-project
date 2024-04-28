import cypress from "cypress";

export const hexToRgb = (hex: string) => {
  let r = 0;
  let g = 0;
  let b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = parseInt(`${hex[1]}${hex[1]}`, 16);
    g = parseInt(`${hex[2]}${hex[2]}`, 16);
    b = parseInt(`${hex[3]}${hex[3]}`, 16);

  // 6 digits

  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  // return rgb value , alert on space
  return `rgb(${r}, ${g}, ${b})`;
};

const GREEN = 'rgb(0, 128, 0)';
const USERNAME = 'Username';
const PASSWORD = 'Password';
const TITLE = 'Test title for Cypress';
const COMMENT_TITLE = 'Comment title for Cypress'
describe('Frontend Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('Not logged in user view', () => {

    it('Correct view', () => {
      cy.contains('Add a post').should('not.exist');
      cy.contains('Profile').should('not.exist');
      cy.contains('Home');
      cy.contains('Login');
      cy.contains('Register');
    });
  });
  describe('Register test', () => {
    before(() => {
      cy.request('GET', 'http://localhost:3001/api/tests/cypress')
      .then(response => expect(response.status).to.eq(200));
    });
    it('Register errors', () => {
      cy.contains('Login');
      cy.contains('Register').click();
      cy.get('input[name="username"]').type('Us');
      cy.get('input[name="email"]').type('Username');
      cy.get('input[name="password"]').type('Us');
      cy.get('button').click();
      cy.contains('Enter a valid email').should('have.css', 'color', hexToRgb('#ff0000'));
      cy.contains('Username min 4 characters').should('have.css', 'color', hexToRgb('#ff0000'));
      cy.contains('Password must be at least 6 characters').should('have.css', 'color', hexToRgb('#ff0000'));
      cy.get('input[name="email"]').clear().type('email22@hotmail.com');
      cy.get('Enter a valid email').should('not.exist');
    });

    it('Register works', () => {
      cy.contains('Register').click();

      cy.get('input[name="username"]').type(USERNAME);
      cy.get('input[name="email"]').type('Username@hotmail.com');
      cy.get('input[name="password"]').type(PASSWORD);

      cy.get('button').click();
      cy.contains('Registered successfully!').should('have.css', 'background-color', GREEN);
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('Profile');
    });
  });

  describe('Login tests', () => {
    it('Login errors' , () => {
      cy.contains('Login').click();
      cy.get('button').click();

      cy.contains('Username is required').should('have.css', 'color', hexToRgb('#ff0000'));
      cy.contains('Password is required').should('have.css', 'color', hexToRgb('#ff0000'));
      cy.contains('Profile').should('not.exist');
    });
    it('Login with invalid user', () => {
      cy.contains('Login').click();
      cy.get('input[name="username"]').type('Username22');
      cy.get('input[name="password"]').type('Username');

      cy.get('button').click();
      cy.contains('Invalid username or password').should('have.css', 'background-color', hexToRgb('#ff0000'));
    });

    it('Login with valid user', () => {
        cy.visit('/login')
        cy.get('input[name="username"]').type(USERNAME);
        cy.get('input[name="password"]').type(PASSWORD);
        cy.get('button').click();
        cy.contains('Logged in!').should('have.css', 'background-color', GREEN);
        cy.contains('Profile');
      console.log('Sessions ', cy.session)
    });
  });

  describe('Post tests', () => {
    beforeEach(() => {
      cy.login(USERNAME, PASSWORD)
      cy.contains('Add a post').click()
    })
    it('Cannot post without title', () => {
      let songName;
      let artist;
      cy.get('input[name="song"]').type('hello');
      cy.get('.song-name').first().then(e => songName = e.text())
      cy.get('.song-artist').first().then(e => artist = e.text())
      cy.get('.song-box').first().click() 
      cy.get('.post-form-main-container').within(() => {
        cy.get('.song-box').first().should('contain.text', songName).should('contain.text', artist)
      })
      cy.contains('Submit').click()
      cy.contains('Title is required').should('have.css', 'color', hexToRgb('#ff0000'))
      cy.get('.post-form-main-container').should('be.visible')
    })
    it ('Cannot post without song', () => {
      cy.get('input[name="title"]').type(TITLE);
      cy.contains('Submit').click()
      cy.get('.post-form-main-container').within(() => {
        cy.get('.postform-error').should('contain.text', 'Choose a song').should('have.css', 'color', hexToRgb('#ff0000'))
      })
      cy.get('.post-form-main-container').should('be.visible')
    })
    it('Posting works', () => {
      let songName;
      let artist;
      cy.get('input[name="title"]').type(TITLE);
      cy.get('input[name="song"]').type('hello');
      cy.get('.song-name').first().then(e => songName = e.text())
      cy.get('.song-artist').first().then(e => artist = e.text())
      cy.get('.song-box').first().click() 
      cy.get('.post-form-main-container').within(() => {
        cy.get('.song-box').first().should('contain.text', songName).should('contain.text', artist)
      })
      cy.contains('Submit').click()
      cy.get('.frontpage-container').should('contain', TITLE)
      cy.get('.post-form-main-container').should('not.be.visible')
    })
  });
  describe('Comment tests', () => {
    beforeEach(() => {
      cy.login(USERNAME, PASSWORD)
      cy.get('.frontpage-container').should('contain', TITLE).click()
    })

    it('Comment button visible', () => {
      cy.contains('Comment')
    })
    it('Cannot comment without title', () => {
      let songName;
      let artist;
      cy.contains('Comment').click()
      cy.get('input[name="song"]').type('hello');
      cy.get('.song-name').first().then(e => songName = e.text())
      cy.get('.song-artist').first().then(e => artist = e.text())
      cy.get('.song-box').first().click() 
      cy.get('.post-form-main-container').within(() => {
        cy.get('.song-box').first().should('contain.text', songName).should('contain.text', artist)
      })
      cy.contains('Submit').click()
      cy.contains('Title is required').should('have.css', 'color', hexToRgb('#ff0000'))
      cy.get('.post-form-main-container').should('be.visible')
    })
    it ('Cannot comment without song', () => {
      cy.contains('Comment').click()
      cy.get('input[name="title"]').type(COMMENT_TITLE);
      cy.contains('Submit').click()
      cy.get('.post-form-main-container').within(() => {
        cy.get('.postform-error').should('contain.text', 'Choose a song').should('have.css', 'color', hexToRgb('#ff0000'))
      })
      cy.get('.post-form-main-container').should('be.visible')
    })
    it('Commenting works', () => {
      let songName;
      let artist;
      cy.contains('Comment').click()
      cy.get('input[name="title"]').type(COMMENT_TITLE);
      cy.get('input[name="song"]').type('hello');
      cy.get('.song-name').first().then(e => songName = e.text())
      cy.get('.song-artist').first().then(e => artist = e.text())
      cy.get('.song-box').first().click() 
      cy.get('.post-form-main-container').within(() => {
        cy.get('.song-box').first().should('contain.text', songName).should('contain.text', artist)
      })
      cy.contains('Submit').click()
      cy.get('.postpage-container').should('contain', COMMENT_TITLE)
      cy.get('.post-form-main-container').should('not.be.visible')
    })
  })
});