class FormSubmissionPage {
    visit() {
        cy.visit('https://practice.qabrains.com/');
        cy.get('div.flex.items-center > button').click();
        cy.contains('Form Submission').click();
    }

    fillName(name) {
        cy.get('#name').type(name);
    }

    fillEmail(email) {
        cy.get('#email').type(email);
    }

    fillContact(contact) {
        cy.get('#contact').type(contact);
    }

    fillDate(date) {
        cy.get('#date').type(date);
    }

    uploadFile(filename) {
        cy.get('#file').attachFile(filename);
    }

    selectColor(color) {
        cy.contains('label', color).click();
        cy.get(`#${color}`).should('be.checked');
    }

    selectFood(food) {
        cy.contains('label', food).click();
        cy.get(`#${food}`).should('be.checked');
    }

    selectCountry(country) {
        cy.get('#country').select(country);
    }

    submit() {
        cy.get('button').contains('Submit').click();
    }

    checkSuccessUrl() {
        cy.url().should('include', '/form-submission?submitted=true');
    }

    checkSuccessMessage() {
        cy.get('.title').should('have.text', 'Form submit successfully.');
    }

    checkRequiredFieldErrors() {
        cy.get('.text-red-500.text-sm.mt-1')
            .should('contain.text', 'Name is a required field')
            .and('contain.text', 'Email is a required field')
            .and('contain.text', 'Contact is a required field')
            .and('contain.text', 'Upload File is a required field')
            .and('contain.text', 'Color is a required field')
            .and('contain.text', 'Food is a required field')
            .and('contain.text', 'Country is a required field');
    }
}

export default new FormSubmissionPage();