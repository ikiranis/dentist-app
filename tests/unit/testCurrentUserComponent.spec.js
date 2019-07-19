import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CurrentUser from '@/components/users/CurrentUser.vue'
import router from '@/router.js'

const localVue = createLocalVue()
localVue.use(router)
localVue.use(Vuex)

describe('CurrentUser.vue', () => {
    let actions
    let store
    let state

    beforeEach(() => {
        actions = {
            getCurrentUser: jest.fn()
        }
        store = new Vuex.Store({
            state,
            actions
        })
    })

    it('Test CurrentUser component when user not logged in', () => {
        const wrapper = shallowMount(CurrentUser, {
            localVue,
            store
        })

        expect(actions.getCurrentUser).toHaveBeenCalled()

        const navItem = wrapper.find('.nav-item')

        expect(navItem.text()).toMatch('Σύνδεση')

        state = {
            userId: 1,
            username: 'rocean'
        }
    })

    it('Test CurrentUser component when user is logged in', () => {
        const wrapper = shallowMount(CurrentUser, {
            localVue,
            store
        })

        expect(actions.getCurrentUser).toHaveBeenCalled()

        const navItem = wrapper.find('.nav-item')

        expect(navItem.text()).toMatch('rocean')
    })
})
