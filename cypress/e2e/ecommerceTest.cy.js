describe('E-Commerce Site TestSuit',() => {
    beforeEach(() => {
        cy.visit('https://practice.qabrains.com/');
        cy.get('div.flex.items-center > button').click();
        cy.contains('E-Commerce Site').click();
        cy.get('#page-sidebar button.lg\\:hidden').click();
        cy.contains('a', 'Visit Demo Site').click();

        cy.get('#email').type('practice@qabrains.com');
        cy.get('#password').type('Password123');
        cy.get('button').contains('Login').click();
        
    });
    it('verifies items can be added to cart', () => {
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // find the card containing this product name
            .within(() => {
                cy.contains('button', 'Add to cart').click();
            });
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Added to cart');
    });
    it('verifies items can be removed from cart', () => {
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // first add an item to cart
            .within(() => {
                cy.contains('button', 'Add to cart').click();
            });
        cy.wait(2000) // to visualize added item
        cy.contains('button', 'Remove from cart').click();  
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Removed from cart');
    });

    it('verifies item count can be updated in cart', () =>{
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // first add an item to cart
            .within(() => {
                cy.contains('button', 'Add to cart').click();
            });
        cy.scrollTo('top');
        cy.get('span[role="button"]')
            .contains('1')
            .click();
        cy.get('button')
            .contains('+')
            .click()    // add 1 more item
        cy.get('span.border').should('have.text', '2'); // item increased

        cy.get('button')
            .contains('-')
            .click()    // remove 1 item
        cy.get('span.border').should('have.text', '1');

    });

    it('verifies favorite list functionality', () =>{
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // first add an item to wishlist
            .within(() => {
                cy.get('.w-5.h-5').click(); // click on heart icon
            });
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Added to favorites');
        // verify favorite persistence after page reload
        cy.reload();
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // choose the same item again 
            .within(() => {
                cy.get('button.cursor-pointer svg')
            .should('have.css', 'color', 'rgb(255, 0, 0)'); // heart icon should be red
            });
        // remove from favorites
        cy.contains('.flex.flex-col', 'Sample Shoe Name')
            .within(() => {
                cy.get('.w-5.h-5').click(); // click on heart icon
            });
        cy.get('li[data-sonner-toast]')
            .should('be.visible')
            .and('contain.text', 'Removed from favorites');
    });

    it('validates product sorting', () =>{
        // Open the sort dropdown
        cy.get('button[data-slot="popover-trigger"]').click()

        cy.contains('Low to High (Price)').click()

        // Wait for products to render
        cy.wait(500) 

        // Grab all prices
        cy.get('.products .text-lg.font-bold')
            .then(($prices) => {
                const priceValues = $prices
                    .map((i, el) => parseFloat(el.innerText.replace('$', '').replace(',', '')))
                    .get()

                // Assert ascending order
                const sortedAsc = [...priceValues].sort((a, b) => a - b)
                expect(priceValues).to.deep.eq(sortedAsc)
            })

        // // For High to Low
        cy.get('button[data-slot="popover-trigger"]').click()
        cy.contains('High to Low (Price)').click()
        cy.wait(500)

        cy.get('.products .text-lg.font-bold')
            .then(($prices) => {
                const priceValues = $prices
                    .map((i, el) => parseFloat(el.innerText.replace('$', '').replace(',', '')))
                    .get()

                const sortedDesc = [...priceValues].sort((a, b) => b - a)
                expect(priceValues).to.deep.eq(sortedDesc)
            })

    })

    it.only('verifies checkout functionality', () =>{
        cy.contains('.flex.flex-col', 'Sample Shoe Name') // first add an item to cart
            .within(() => {
                cy.contains('button', 'Add to cart').click();
            });
        cy.scrollTo('top');
        cy.get('span[role="button"]')
            .contains('1')
            .click();
        cy.contains('Checkout').click();
        cy.get('input[placeholder="Ex. John"]').type('Dan');
        cy.get('input[placeholder="Ex. Doe"]').type('Humfrey');
        cy.contains('Continue').click();
        cy.contains('Payment Information:').should('be.visible');
        cy.contains('Shipping Information:').should('be.visible');
        cy.contains('Price Total:').should('be.visible');

        cy.contains('Finish').click();
        cy.contains('Thank you for your order!').should('be.visible')



    })

});