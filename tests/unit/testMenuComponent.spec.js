import { shallowMount, createLocalVue } from '@vue/test-utils'
import MenuBar from '@/components/basic/MenuBar.vue'
import BootstrapVue from 'bootstrap-vue'
import router from '@/router.js'
// import store from '@/store.js'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(router)

describe('MenuBar.vue', () => {
    it('Test MenuBar component', () => {
        const wrapper = shallowMount(MenuBar, {
            localVue,
            mocks: {
                $store: {
                    state: {
                        useId: 1,
                        username: 'user'
                    }
                }
            },

            // stubs: ['router-link'],

            propsData: {
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
                userInfo: 'false',
                fixed: '',
                variant: '',
                type: 'light',
                valign: 'mx-auto',
                toggle: 'lg'
            }
        })

        expect(wrapper.find('#brandTitle').text()).toMatch('Brand')
    })
})
