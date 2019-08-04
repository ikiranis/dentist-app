describe('Test patients route', () => {
    it('Load the app', () => {
        cy.visit('/')
        cy.contains('div', 'Login')
    })

    it('Login to app', () => {
        cy.get('#login').click()
        cy.contains('h1', 'Επιλογές')
        cy.wait(2000)
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
            cy.wait(2000)

            cy.get('input[id="fname"]').should('have.value', patient.text)
        })
    })

    it('Update patient', () => {
        const changelname = 'Change' + Math.floor(Math.random() * 100);

        cy.get('input[id="lname"]').clear().type(changelname)
        cy.get('#saveInfo').click()

        cy.get('.navbar-nav > li').contains('Ασθενείς').click()

        cy.get('.patientName').eq(1).contains(changelname)
    })

    it('Insert patient', () => {
        const patient = {
            fname: 'fname',
            lname: 'lname',
            fatherName: 'fatherName',
            birthday: '1974-11-12',
            phoneMobile: '0123456789',
            phoneLandline: '0123456789',
            address: 'address'
        }

        cy.get('#insertPatient').click()

        cy.get('input[id="fname"]').type(patient.fname)
        cy.get('input[id="lname"]').type(patient.lname)
        cy.get('input[id="fatherName"]').type(patient.fatherName)
        cy.get('input[id="birthday"]').type(patient.birthday)
        cy.get('input[id="phoneMobile"]').type(patient.phoneMobile)
        cy.get('input[id="phoneLandline"]').type(patient.phoneLandline)
        cy.get('input[id="address"]').type(patient.address)

        cy.get('#saveInfo').click()

        cy.get('.patientName').eq(0).contains(patient.fname)
        cy.get('.patientName').eq(1).contains(patient.lname)
    })
})
