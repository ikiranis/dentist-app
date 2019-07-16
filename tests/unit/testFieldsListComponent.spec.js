import { shallowMount, createLocalVue } from '@vue/test-utils'
import FieldsList from '@/components/patients/FieldsList.vue'
import BootstrapVue from 'bootstrap-vue'
import router from '@/router.js'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(router)

describe('FieldsList.vue', () => {
    let fields = [
        {
            label: 'Field 1'
        },
        {
            label: 'Field 2'
        },
        {
            label: 'Field 3'
        },
        {
            label: 'Field 4'
        }
    ]
    const propsData = { fields }

    it('Test FieldsList component', () => {
        const wrapper = shallowMount(FieldsList, {
            localVue, propsData
        })

        const fieldItems = wrapper.findAll('.field')

        expect(fieldItems.at(0).text()).toMatch('Field 1')
        expect(fieldItems.at(1).text()).toMatch('Field 2')
        expect(fieldItems.at(2).text()).toMatch('Field 3')
        expect(fieldItems.at(3).text()).toMatch('Field 4')
    })
})
