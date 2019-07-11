// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'Login app': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .waitForElementVisible('#app', 5000)
            .assert.elementPresent('.card-header')
            .assert.containsText('div', 'Login')
            // .setValue('input[id=email]', 'rocean@error.gr')
            // .setValue('input[id=password]', '123456')
            .click('input[id=login]')
            .waitForElementVisible('.container-fluid', 5000)
            .assert.containsText('h1', 'Επιλογές')
            // .assert.elementCount('img', 1)
            .end()
    }
}
