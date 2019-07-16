import { shallowMount } from '@vue/test-utils'
import FieldsList from '@/components/patients/FieldsList.vue'

describe('FieldsList.vue', () => {
    let fields = [
        {
            id: 1,
            label: 'Field 1',
            display: false
        },
        {
            id: 2,
            label: 'Field 2',
            display: false
        },
        {
            id: 3,
            label: 'Field 3',
            display: true
        },
        {
            id: 4,
            label: 'Field 4',
            display: false
        }
    ]
    const propsData = { fields }

    it('Test FieldsList component', () => {
        const wrapper = shallowMount(FieldsList, {
            propsData
        })

        const fieldItems = wrapper.findAll('.field')

        expect(fieldItems.at(0).text()).toMatch('Field 1')
        expect(fieldItems.at(1).text()).toMatch('Field 2')
        expect(fieldItems.at(2).text()).toMatch('Field 4')
    })
})
