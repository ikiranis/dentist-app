import { shallowMount, createLocalVue } from '@vue/test-utils'
import MenuBar from '@/components/basic/MenuBar.vue'
import BootstrapVue from 'bootstrap-vue'
import router from '@/router.js'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(router)

describe('MenuBar.vue', () => {
    let propsData = {
        brand: 'Brand',
        brandRoute: {},
        menuItems: [
            {
                route: '/route1',
                name: 'Route 1',
                loggedIn: true
            },
            {
                route: '/route2',
                name: 'Route 2',
                loggedIn: true
            },
            {
                route: '/route3',
                name: 'Route 3',
                loggedIn: false
            },
            {
                route: '/route4',
                name: 'Route 4',
                loggedIn: false
            }
        ],
        userInfo: 'true',
        fixed: '',
        variant: '',
        type: 'light',
        valign: 'mx-auto',
        toggle: 'lg'
    }
    let mocks = {
        $store: {
            state: {
                userId: 1,
                username: 'user'
            }
        }
    }

    it('Test MenuBar component', () => {
        const wrapper = shallowMount(MenuBar, {
            localVue, propsData, mocks
        })

        expect(wrapper.find('#brandTitle').text()).toMatch('Brand')

        const navItems = wrapper.findAll('.nav-link')

        expect(navItems.at(0).text()).toMatch('Route 1')
        expect(navItems.at(1).text()).toMatch('Route 2')
        expect(navItems.at(2).text()).toMatch('Route 3')
        expect(navItems.at(3).text()).toMatch('Route 4')
        expect(navItems.at(4).text()).toMatch('Αποσύνδεση')
    })
})
