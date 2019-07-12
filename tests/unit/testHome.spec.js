import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import router from '@/router.js'
import store from '@/store.js'

describe('Home.vue', () => {
    it('Display Home page', () => {
        const wrapper = shallowMount(Home, {
            router,
            store,
            stubs: ['b-button']
        })
        wrapper.setData({ isUserLoggedIn: true })

        expect(wrapper.find('#patients').text()).toMatch('Ασθενείς')
        expect(wrapper.find('#economy').text()).toMatch('Οικονομικά')
        expect(wrapper.find('#calendar').text()).toMatch('Ημερολόγιο')
        expect(wrapper.find('#tools').text()).toMatch('Εργαλεία')
    })
})
