import { shallowMount } from '@vue/test-utils'
import PatientsTable from '@/components/patients/PatientsTable.vue'

describe('PatientsTable.vue', () => {
    let patients = [
        {
            id: 0,
            fname: 'fname',
            lname: 'lname',
            fatherName: 'fatherName',
            icons: [
                { id: 1, label: 'Ασθένεια', name: 'something 1' },
                { id: 2, label: 'Εκρεμείς θεραπείες', name: 'something 2' },
                { id: 3, label: 'Χρέος', name: 'something 3' }
            ],
            birthday: '1974-11-12',
            phoneMobile: '0123456789',
            phoneLandline: '0123456789',
            address: 'address'
        }
    ]

    const propsData = { patients }

    it('Test PatientsTable component', () => {
        const mock = jest.fn()

        const wrapper = shallowMount(PatientsTable, {
            propsData,
            stubs: ['router-link', 'currency-eur-icon', 'delete', 'biohazard-icon', 'medical-bag-icon'],
            listeners: {
                'click': mock
            }

        })

        const patientsLabels = wrapper.findAll('.patient-label')

        expect(patientsLabels.at(0).text()).toMatch('')
        expect(patientsLabels.at(1).text()).toMatch('#')
        expect(patientsLabels.at(2).text()).toMatch('Όνομα')
        expect(patientsLabels.at(3).text()).toMatch('Επώνυμο')
        expect(patientsLabels.at(4).text()).toMatch('Σημειώσεις')

        const patientNames = wrapper.findAll('.patientName')

        expect(patientNames.at(0).text()).toMatch('fname')
        expect(patientNames.at(1).text()).toMatch('lname')

        const patientIcons = wrapper.findAll('.patient-icon')

        expect(patientIcons.at(0).exists()).toEqual(true)
        expect(patientIcons.at(1).exists()).toEqual(true)
        expect(patientIcons.at(2).exists()).toEqual(true)


    })
})
