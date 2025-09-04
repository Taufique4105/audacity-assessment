import FormSubmissionPage from '../support/pageObjects/FormSubmissionPage';

describe('Form Submission', () => {
    beforeEach(() => {
        FormSubmissionPage.visit();
    });

    it('validates successful form submission', () => {
        cy.url().should('include', '/form-submission');
        FormSubmissionPage.fillName('John Doe');
        FormSubmissionPage.fillEmail('john.doe@example.com');
        FormSubmissionPage.fillContact('12345678904');
        FormSubmissionPage.fillDate('2023-10-10');
        FormSubmissionPage.uploadFile('example.json');
        FormSubmissionPage.selectColor('Red');
        FormSubmissionPage.selectFood('Pizza');
        FormSubmissionPage.selectCountry('Bangladesh');
        FormSubmissionPage.submit();
        FormSubmissionPage.checkSuccessUrl();
        FormSubmissionPage.checkSuccessMessage();
    });

    it('validates error messages for required fields', () => {
        FormSubmissionPage.submit();
        FormSubmissionPage.checkRequiredFieldErrors();
    });
});