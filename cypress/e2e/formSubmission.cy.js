describe('Form Submission',() => {
    beforeEach(() => {
        cy.visit('https://practice.qabrains.com/');
        cy.get('div.flex.items-center > button').click();
        cy.contains('Form Submission').click();
    });

    it('validates successful form submission', () => {
        cy.url().should('include', '/form-submission');
        cy.get('#name').type('John Doe');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#contact').type('12345678904');
        cy.get('#date').type('2023-10-10');
        cy.get('#file').attachFile('example.json');
        cy.get('#date').type('2023-10-10');
        cy.contains('label', 'Red').click();
        cy.get('#Red').should('be.checked');
        cy.contains('label', 'Pizza').click();
        cy.get('#Pizza').should('be.checked');
        cy.get('#country').select('Bangladesh');
        cy.get('button').contains('Submit').click();
        cy.url().should('include', '/form-submission?submitted=true')
        cy.get('.title').should('have.text', 'Form submit successfully.');
    });

    it.only('validates error messages for required fields', () =>{
        cy.get('button').contains('Submit').click();
        cy.get('.text-red-500.text-sm.mt-1')
            .should('contain.text', 'Name is a required field')
            .and('contain.text', 'Email is a required field')
            .and('contain.text', 'Contact is a required field')
            .and('contain.text', 'Upload File is a required field')
            .and('contain.text', 'Color is a required field')
            .and('contain.text', 'Food is a required field')
            .and('contain.text', 'Country is a required field');
    });
});