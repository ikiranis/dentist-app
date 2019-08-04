describe('Test patients route', () => {
    it('Load the app', () => {
        cy.visit('/')
        cy.contains('div', 'Login')
    })

    it('Login to app', () => {
        cy.get('#login').click()
        cy.contains('h1', 'Επιλογές')
    })

    it('Load patients page', () => {
        cy.get('.navbar-nav > li').contains('Ασθενείς').click()
        cy.contains('h1', 'Ασθενείς')
    })

    it('Load patient page', () => {
        cy.get('.patientName').then((patients) => {
            // Get first patient
            const patient = patients[0]

            cy.get(patient).click()

            cy.get('input[id="fname"]').should('have.value', patient.text)
        })
    })

    it('Update lname', () => {
        const changelname = 'Change' + Math.floor(Math.random() * 100);

        cy.get('input[id="lname"]').clear().type(changelname)
        cy.get('#saveInfo').click()

        cy.get('.navbar-nav > li').contains('Ασθενείς').click()

        cy.get('.patientName').eq(1).contains(changelname)
    })
})
