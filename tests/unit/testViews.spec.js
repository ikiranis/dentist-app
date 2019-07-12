import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'
// import Patients from '@/views/Patients.vue'

describe('About.vue', () => {
    it('Display about page', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.text()).toMatch('About')
    })
})

// describe('Patients.vue', () => {
//     it('Display patients page', () => {
//         const wrapper = shallowMount(Patients, {
//             stubs: ['router-link', 'eye-icon', 'pencil-icon', 'file-hidden-icon']
//         });
//         expect(wrapper.text()).toMatch('Ασθενείς');
//     })
// });
