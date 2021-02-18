describe('Form', () => {
    beforeEach(() => cy.visit('http://localhost:3000'))

    describe('testing inputs', () => {
        it('can type in name field', () => {
            cy.get('input[name=name]')
            .type('Mark')
            .should('have.value', 'Mark')
            cy.get('input[name=email]')
            .type('mark@email.com')
            .should('have.value', 'mark@email.com')
            cy.get('input[name=password]')
            .type('password')
            .should('have.value', 'password')
        })
        it('Can test validation', () => {
            cy.get('input[name=name]')
            .type('Mark')
            cy.get('input[name=password]')
            .type('00')
            cy.get('input[name=email]')
            .type('mark@email.com')
            cy.get('input[name=terms]')
            .check()
            cy.get('button')
            .click()
        })
        it('button should be disabled', () => {
            cy.get('button')
            .should('be.disabled')
        })
        it('shouldn not submit empty', () => {
            cy.get('button')
            .submit()
        })
    })
})