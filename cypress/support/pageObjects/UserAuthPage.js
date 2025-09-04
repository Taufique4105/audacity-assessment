class UserAuthPage {
    visit() {
        cy.visit('https://practice.qabrains.com/');
    }

    fillLogin(email, password) {
        cy.get('#email').type(email);
        cy.get('#password').type(password);
    }

    submitLogin() {
        cy.get('button').contains('Login').click();
    }

    assertLoginSuccess() {
        cy.url().should('include', '/?logged=true');
        cy.get('.title').should('have.text', 'Login Successful');
        cy.get('.text-xl.text-xl.font-oswald.mb-3.uppercase.not-odd\\:font-bold').should('have.text', 'Login Successful');
        cy.contains('Congratulations. You have successfully logged in. When you are done click logout below.').should('be.visible');
        cy.get('button').contains('Logout').should('be.visible');
    }

    assertLoginError() {
        cy.url().should('include', '/?email=false&password=false');
        cy.contains('Your email and password both are invalid!').should('be.visible');
    }

    openSidebar() {
        cy.get('div.flex.items-center > button').click();
    }

    goToRegistration() {
        this.openSidebar();
        cy.contains('Registration').click();
        cy.url().should('include', '/registration');
    }

    goToForgotPassword() {
        this.openSidebar();
        cy.contains('Forgot Password').click();
        cy.url().should('include', '/forgot-password');
    }

    assertLoginFormVisible() {
        cy.contains('User Authentication').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('button').contains('Login').should('be.visible');
    }

    assertRegistrationFormVisible() {
        cy.get('#name').should('be.visible');
        cy.get('#country').should('be.visible');
        cy.get('#account').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#confirm_password').should('be.visible');
        cy.contains('Signup').should('be.visible');
    }

    assertForgotPasswordFormVisible() {
        cy.get('#email').should('be.visible');
        cy.contains('Reset Password').should('be.visible');
    }

    assertPasswordMasking() {
        cy.get('#password').should('have.attr', 'type', 'password');
        cy.get('#confirm_password').should('have.attr', 'type', 'password');
    }

    assertPasswordAutocomplete() {
        cy.get('#password').should('have.attr', 'autocomplete', 'new-password');
        cy.get('#confirm_password').should('have.attr', 'autocomplete', 'new-password');
    }

    signInMainSite(email, password) {
    cy.get('.flex').contains('Sign In').invoke('removeAttr', 'target').click();
    cy.origin(
        'https://qabrains.com/auth/login',
        { args: { email, password } },
        ({ email, password }) => {
            cy.get('[name="email"]').type(email);
            cy.get('[name="password"]').type(password);
            cy.get('div.form-group.mb-3 > button').click();
        }
    );
}

    submitFeedback(feedbackText) {
        cy.get('#feedback').find('[placeholder="Write Comment..."]').click().type(feedbackText);
        cy.get('button').contains('Submit').click();
    }

    assertFeedback(username, feedbackText) {
        cy.get('#scrollableDiv .flex.items-start').first()
            .within(() => {
                cy.get('.feed-content span.font-semibold').should('have.text', username);
                cy.get('p').should('have.text', feedbackText);
            });
    }
}

export default new UserAuthPage();
