describe("mvp tests", () => {
    describe("can navigate to form", () => {
        it("can navigate to site", () => {
            cy.visit('http://localhost:3000/').url().should('include', 'localhost');
        })
        it("can select pizza button", () => {
            cy.get("button").click();
        })
        it("new route is shown after clicking", () => {
            cy.url().should('include', '/pizza')
        })
    })
    describe("pizza size tests", () => {
        it("can select a size", () => {
            cy.get('#size').select('Large').should('have.value', 'large')
        })
        it("can navigate to next page", () => {
            cy.wait(100);
            cy.get('button').click();
        })
    })
    describe("pizza sauce tests", () => {
        it('correct route to sauce page', () => {
            cy.url().should('include', '/sauce')
        })
        it('can select sauce', () => {
            cy.get('#original-red').click().should('have.value', 'Original Red');
        })
        it("can navigate to previous page", () => {
            cy.get('button').first().click();
        })
        it("can navigate to next page", () => {
            cy.wait(100);
            cy.get('button').click();
            cy.get('button').last().click();
        })
    })
    describe("pizza toppings tests", () => {
        it("correct route to toppings page", () => {
            cy.url().should('include', '/toppings');
        })
        it("can select multiple checkboxes", () => {
            cy.get('#pepperoni').click().should('have.checked', true);
            cy.get('#onions').click().should('have.checked', true);
            cy.get("#sausage").click().should('have.checked', true);
            cy.get('#pepperoni').uncheck().should('not.have.checked', false);
            cy.get('#onions').uncheck().should('not.have.checked', false);
            cy.get("#sausage").uncheck().should('not.have.checked', false);
        })
        it("can check the gluten toggler",() => {
            cy.get('.slider').click();
            cy.get('input').last().should('have.checked', true);
        })
        it("can navigate to previous page", () => {
            cy.get('button').first().click();
        })
        it("can navigate to next page", () => {
            cy.wait(100);
            cy.get('button').last().click();
            cy.get('button').last().click();
           
        })
    })
    describe("name and submit tests", () => {
        it('correct route to submit page', () => {
            cy.url().should('include', '/submit');
        })
        it("can add name to textbox", () => {
            cy.get('input[type="text"]').first().type("Eric Lindros").should('have.value', 'Eric Lindros')
        })
        it("can add text to special box", () => {
            cy.get('input[type="text"]').last().type("88 the pepperonis").should('have.value', '88 the pepperonis')
        })
        it("can succesfully submit", () => {
            cy.get('.submit-button').should('not.be.disabled', true);
            cy.get('.submit-button').click();
        })
        it("can navigate to previous page", () => {
            cy.get('button').last().click();
            cy.get('button').last().click();
        })
        it("!!SHOULD FAIL ON CLICK!! can not post when shouldn't post !!SHOULD FAIL ON CLICK!!", () => {
            cy.get('input[type="text"]').first().clear();
            cy.get('.submit-button').click();
        })
    })
})

