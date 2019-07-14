// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

describe('Test browsing the routes', () => {
    it('Load the app', () => {
        cy.visit('/')
        cy.contains('div', 'Login')
    })

    it('Login to app', () => {
        cy.get('#login').click()
        cy.contains('h1', 'Επιλογές')
        cy.wait(1000)
    })

    it('Load economy page', () => {
        cy.get('.navbar-nav > li').contains('Οικονομικά').click()
        cy.contains('h1', 'Οικονομικά')
    })

    it('Load calendar page', () => {
        cy.get('.navbar-nav > li').contains('Ημερολόγιο').click()
        cy.contains('h1', 'Ημερολόγιο')
    })

    it('Load tools page', () => {
        cy.get('.navbar-nav > li').contains('Εργαλεία').click()
        cy.contains('h1', 'Εργαλεία')
    })

    it('Load about page', () => {
        cy.get('.navbar-nav > li').contains('About').click()
        cy.contains('h1', 'About')
    })

    it('Load user page', () => {
        cy.get('.navbar-nav > li > a > li > a').contains('rocean').click()
        cy.contains('#username', 'rocean')
    })

    it('Load patients page', () => {
        cy.get('.navbar-nav > li').contains('Ασθενείς').click()
        cy.contains('h1', 'Ασθενείς')
    })

    it('Load patient page', () => {
        cy.get('.patientName').first().click()
        cy.contains('#brandTitle', 'Ασθενής')
    })

    it('Load medical history', () => {
        cy.get('.nav-link').contains('Ιατρικό ιστορικό').click()
        cy.contains('h1', 'Ιατρικό ιστορικό')
    })

    it('Load dental history', () => {
        cy.get('.nav-link').contains('Οδοντιατρικό ιστορικό').click()
        cy.contains('h1', 'Οδοντιατρικό ιστορικό')
    })

    it('Load dentalgram', () => {
        cy.get('.nav-link').contains('Οδοντόγραμμα').click()
        cy.contains('h1', 'Οδοντόγραμμα')
    })

    it('Load periodDentalgram', () => {
        cy.get('.nav-link').contains('Περιοδοντόγραμμα').click()
        cy.contains('h1', 'Περιοδοντόγραμμα')
    })

    it('Load treatment history', () => {
        cy.get('.nav-link').contains('Ιστορικό θεραπειών').click()
        cy.contains('h1', 'Ιστορικό θεραπειών')
    })

    it('Load denervation', () => {
        cy.get('.nav-link').contains('Απονεύρωση').click()
        cy.contains('h1', 'Απονεύρωση')
    })

    it('Load files', () => {
        cy.get('.nav-link').contains('Αρχεία').click()
        cy.contains('h1', 'Αρχεία')
    })

})
