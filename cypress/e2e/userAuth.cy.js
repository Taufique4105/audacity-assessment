describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('https://practice.qabrains.com/');
  });
  
  it('should log in with valid credentials', () => {
    cy.get('#email').type('qa_testers@qabrains.com');
    cy.get('#password').type('Password123');
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/?logged=true');
    cy.get('.title').should('have.text', 'Login Successful');
    cy.get('.text-xl.text-xl.font-oswald.mb-3.uppercase.not-odd\\:font-bold').should('have.text', 'Login Successful');
    cy.contains('Congratulations. You have successfully logged in. When you are done click logout below.').should('be.visible');
    cy.get('button').contains('Logout').should('be.visible');
  });

  it('should display error message with invalid credentials', () => {
    cy.get('#email').type('invalid_user@qabrains.com');
    cy.get('#password').type('InvalidPassword');
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/?email=false&password=false')
    cy.contains('Your email and password both are invalid!').should('be.visible');
  });

  it('validates all components visibility on the login form', () => {
    cy.contains('User Authentication').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('navigates to registration and validates all components visibility', () => {
    cy.get('div.flex.items-center > button').click();
    cy.contains('Registration').click()
    cy.url().should('include', '/registration');
    cy.get('#name').should('be.visible');
    cy.get('#country').should('be.visible');
    cy.get('#account').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#confirm_password').should('be.visible');
    cy.contains('Signup').should('be.visible');
  });

  it('navigates to forget password and validates all components visibility', () => {
    cy.get('div.flex.items-center > button').click();
    cy.contains('Forgot Password').click()
    cy.url().should('include', '/forgot-password');
    cy.get('#email').should('be.visible');
    cy.contains('Reset Password').should('be.visible');
  });

  it('validates masking attribute on input fields', () => {
    cy.get('div.flex.items-center > button').click();
    cy.contains('Registration').click()
    cy.url().should('include', '/registration');
    cy.get('#password').should('have.attr', 'type', 'password');
    cy.get('#confirm_password').should('have.attr', 'type', 'password');
  });

  it('validates autocomplete attribute on input fields', () => {
    cy.get('div.flex.items-center > button').click();
    cy.contains('Registration').click()
    cy.url().should('include', '/registration');
    cy.get('#password').should('have.attr', 'autocomplete', 'new-password'); // DOM doesn't have autocomplete attribute for password field
    cy.get('#confirm_password').should('have.attr', 'autocomplete', 'new-password'); // DOM doesn't have autocomplete attribute for confirm password field
  });

  it('validates feedback', () => {
    // As feedback requires sign in to the main site, I have to use cy.origin() to handle the cross-origin authentication
    cy.get('.flex').contains('Sign In').invoke('removeAttr', 'target').click();
    cy.origin('https://qabrains.com/auth/login', () => {
        cy.get('[name="email"]').type('miraz@mail.com');
        cy.get('[name="password"]').type('P@ssw0rd');
        cy.get('div.form-group.mb-3 > button').click();
    });
    cy.wait(10000); // Wait for 10 seconds to ensure the redirection is complete
    cy.visit('https://practice.qabrains.com/');
    cy.wait(10000); // Wait for 10 seconds to ensure the main page is fully loaded with signed-in state
    cy.get('#feedback').find('[placeholder="Write Comment..."]').click().type('This is a test feedback');
    cy.get('button').contains('Submit').click();

    // assert the username and last feedback
    cy.get('#scrollableDiv .flex.items-start').first()
    .within(() => {
    cy.get('.feed-content span.font-semibold').should('have.text', 'Miraz'); // assert user
    cy.get('p').should('have.text', 'This is a test feedback'); // assert feedback
     });
    });
});