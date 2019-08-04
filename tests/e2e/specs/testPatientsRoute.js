describe('Test patients route', () => {
    it('Load the app', () => {
        cy.visit('/')
        cy.contains('div', 'Login')
    })

    it('Login to app', () => {
        cy.get('#login').click()
        cy.contains('h1', 'Επιλογές')
        cy.wait(1000)
    })

    it('Load patients page', () => {
        cy.get('.navbar-nav > li').contains('Ασθενείς').click()
        cy.contains('h1', 'Ασθενείς')
        cy.wait(1000)
    })

    it('Load patient page', () => {
        cy.get('.patientName').then((patients) => {
            // Get first patient
            const patient = patients[0]

            cy.get(patient).click()
            cy.wait(1000)

            cy.get('input[id="fname"]').should('have.value', patient.text)
        })
    })
})
