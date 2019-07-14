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
        cy.wait(2000)
    })

    it('Click Ασθενείς', () => {
        cy.get('.navbar-nav > li').contains('Ασθενείς').click()
    })

})
