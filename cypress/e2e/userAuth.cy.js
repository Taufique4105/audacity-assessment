import UserAuthPage from '../support/pageObjects/UserAuthPage';

describe('User Authentication', () => {
  beforeEach(() => {
    UserAuthPage.visit();
  });

  it('should log in with valid credentials', () => {
    UserAuthPage.fillLogin('qa_testers@qabrains.com', 'Password123');
    UserAuthPage.submitLogin();
    UserAuthPage.assertLoginSuccess();
  });

  it('should display error message with invalid credentials', () => {
    UserAuthPage.fillLogin('invalid_user@qabrains.com', 'InvalidPassword');
    UserAuthPage.submitLogin();
    UserAuthPage.assertLoginError();
  });

  it('validates all components visibility on the login form', () => {
    UserAuthPage.assertLoginFormVisible();
  });

  it('navigates to registration and validates all components visibility', () => {
    UserAuthPage.goToRegistration();
    UserAuthPage.assertRegistrationFormVisible();
  });

  it('navigates to forget password and validates all components visibility', () => {
    UserAuthPage.goToForgotPassword();
    UserAuthPage.assertForgotPasswordFormVisible();
  });

  it('validates masking attribute on input fields', () => {
    UserAuthPage.goToRegistration();
    UserAuthPage.assertPasswordMasking();
  });

  it('validates autocomplete attribute on input fields', () => {
    UserAuthPage.goToRegistration();
    UserAuthPage.assertPasswordAutocomplete();
  });

  it('validates feedback', () => {
    UserAuthPage.signInMainSite('miraz@mail.com', 'P@ssw0rd');
    cy.wait(10000);
    cy.visit('https://practice.qabrains.com/');
    cy.wait(10000);
    UserAuthPage.submitFeedback('This is a test feedback');
    UserAuthPage.assertFeedback('Miraz', 'This is a test feedback');
  });
});