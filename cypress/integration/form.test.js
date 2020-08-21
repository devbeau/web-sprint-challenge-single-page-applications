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
    describe("form tests", () => {
        it("can add test to textbox", () => {
            cy.get('input[type="text"]').first().type("Eric Lindros").should('have.value', 'Eric Lindros')
        })
        it("can select multiple checkboxes", () => {
            cy.get('#pepperoni').click().should('have.checked', true);
            cy.get('#onions').click().should('have.checked', true);
            cy.get("#sausage").click().should('have.checked', true);
            cy.get('#pepperoni').uncheck().should('not.have.checked', false);
            cy.get('#onions').uncheck().should('not.have.checked', false);
            cy.get("#sausage").uncheck().should('not.have.checked', false);
        })
        it("can succesfully submit", () => {
            cy.get('.submit-button').should('not.be.disabled', true);
            cy.get('.submit-button').click();
        })
        it("!!SHOULD FAIL ON CLICK!! can not post when shouldn't post !!SHOULD FAIL ON CLICK!!", () => {
            cy.get('input[type="text"]').first().clear();
            cy.get('.submit-button').click();
        })
    })

})