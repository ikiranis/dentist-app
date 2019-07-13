// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage


describe('Test Login and logout', () => {

  it('Load the app', () => {
    cy.visit('/')
    cy.contains('div', 'Login')
  })

  it('Login to app', () => {
    cy.get('#login').click()
    cy.contains('h1', 'Επιλογές')
  })

  it('Logout', () => {
    cy.get('#logout').click();
    cy.contains('div', 'Login1')
  })

})
