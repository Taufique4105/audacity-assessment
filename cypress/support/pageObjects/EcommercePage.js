class EcommercePage {
    visit() {
        cy.visit('https://practice.qabrains.com/');
        cy.get('div.flex.items-center > button').click();
        cy.contains('E-Commerce Site').click();
        cy.get('#page-sidebar button.lg\\:hidden').click();
        cy.contains('a', 'Visit Demo Site').click();
    }

    login(email, password) {
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button').contains('Login').click();
    }

    addToCart(productName) {
        cy.contains('.flex.flex-col', productName)
            .within(() => {
                cy.contains('button', 'Add to cart').click();
            });
    }

    removeFromCart(productName) {
        cy.contains('.flex.flex-col', productName)
            .within(() => {
                cy.contains('button', 'Remove from cart').click();
            });
    }

    updateCartCount(count) {
        cy.scrollTo('top');
        cy.get('span[role="button"]').contains(count).click();
    }

    incrementCart() {
        cy.get('button').contains('+').click();
    }

    decrementCart() {
        cy.get('button').contains('-').click();
    }

    addToFavorites(productName) {
        cy.contains('.flex.flex-col', productName)
            .within(() => {
                cy.get('.w-5.h-5').click();
            });
    }

    verifyFavoriteRed(productName) {
        cy.contains('.flex.flex-col', productName)
            .within(() => {
                cy.get('button.cursor-pointer svg')
                    .should('have.css', 'color', 'rgb(255, 0, 0)');
            });
    }

    openSortDropdown() {
        cy.get('button[data-slot="popover-trigger"]').click();
    }

    selectSortOption(optionText) {
        cy.contains(optionText).click();
    }

    getProductPrices() {
        return cy.get('.products .text-lg.font-bold');
    }

    checkout(firstName, lastName) {
        cy.contains('Checkout').click();
        cy.get('input[placeholder="Ex. John"]').type(firstName);
        cy.get('input[placeholder="Ex. Doe"]').type(lastName);
        cy.contains('Continue').click();
    }

    finishCheckout() {
        cy.contains('Finish').click();
    }
}

export default new EcommercePage();