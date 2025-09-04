describe('Drag and Drop List',() => {
    beforeEach(() => {
        cy.visit('https://practice.qabrains.com/');
        cy.get('div.flex.items-center > button').click();
        cy.contains('Drag and Drop List').click();
    });

    it('validates successful drag and drop', () => { 
        cy.get('button.lg\\:hidden').click();
        cy.get('div[draggable="true"]').scrollIntoView();
        cy.get('div[draggable="true"]').drag('div:contains("Drop Here")',{ force: true });
        //cy.contains('Drop Here').should('have.text', 'Drag Me');
    });
});