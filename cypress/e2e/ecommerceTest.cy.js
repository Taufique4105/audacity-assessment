import EcommercePage from '../support/pageObjects/EcommercePage';

describe('E-Commerce Site TestSuit', () => {
    beforeEach(() => {
        EcommercePage.visit();
        EcommercePage.login('practice@qabrains.com', 'Password123');
    });

    it('verifies items can be added to cart', () => {
        EcommercePage.addToCart('Sample Shoe Name');
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Added to cart');
    });

    it('verifies items can be removed from cart', () => {
        EcommercePage.addToCart('Sample Shoe Name');
        cy.wait(2000);
        EcommercePage.removeFromCart('Sample Shoe Name');
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Removed from cart');
    });

    it('verifies item count can be updated in cart', () => {
        EcommercePage.addToCart('Sample Shoe Name');
        EcommercePage.updateCartCount('1');
        EcommercePage.incrementCart();
        cy.get('span.border').should('have.text', '2');
        EcommercePage.decrementCart();
        cy.get('span.border').should('have.text', '1');
    });

    it('verifies favorite list functionality', () => {
        EcommercePage.addToFavorites('Sample Shoe Name');
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Added to favorites');
        cy.reload();
        EcommercePage.verifyFavoriteRed('Sample Shoe Name');
        EcommercePage.addToFavorites('Sample Shoe Name');
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Removed from favorites');
    });

    it('validates product sorting', () => {
        EcommercePage.openSortDropdown();
        EcommercePage.selectSortOption('Low to High (Price)');
        cy.wait(500);
        EcommercePage.getProductPrices().then(($prices) => {
            const priceValues = $prices
                .map((i, el) => parseFloat(el.innerText.replace('$', '').replace(',', '')))
                .get();
            const sortedAsc = [...priceValues].sort((a, b) => a - b);
            expect(priceValues).to.deep.eq(sortedAsc);
        });

        EcommercePage.openSortDropdown();
        EcommercePage.selectSortOption('High to Low (Price)');
        cy.wait(500);
        EcommercePage.getProductPrices().then(($prices) => {
            const priceValues = $prices
                .map((i, el) => parseFloat(el.innerText.replace('$', '').replace(',', '')))
                .get();
            const sortedDesc = [...priceValues].sort((a, b) => b - a);
            expect(priceValues).to.deep.eq(sortedDesc);
        });
    });

    it('verifies checkout functionality', () => {
        EcommercePage.addToCart('Sample Shoe Name');
        EcommercePage.updateCartCount('1');
        EcommercePage.checkout('Dan', 'Humfrey');
        cy.contains('Payment Information:').should('be.visible');
        cy.contains('Shipping Information:').should('be.visible');
        cy.contains('Price Total:').should('be.visible');
        EcommercePage.finishCheckout();
        cy.contains('Thank you for your order!').should('be.visible');
    });
});