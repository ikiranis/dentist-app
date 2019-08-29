<template>
    <div id="app">

        <div v-if="apiWorks">

            <menu-bar brand="Dentist" :brandRoute="{ name: 'home' }" :menuItems="menuItems" userInfo="true" fixed="top"
                      variant="dark" type="dark" valign="ml-auto" toggle="md" navCollapseText="mainBar"/>

            <router-view class="mt-5 pt-5"/>

        </div>

        <div v-else>
            Api OFFLINE
        </div>

    </div>

</template>

<script>
import api from '@/api'
import MenuBar from '@/components/basic/MenuBar'
import utility from './library/utility'

export default {
    components: { MenuBar },

    data: () => ({
        apiWorks: true,

        menuItems: [
            {
                route: '/patients',
                name: 'Ασθενείς',
                loggedIn: true,
                active: false,
                disabled: false
            },
            {
                route: '/economy',
                name: 'Οικονομικά',
                loggedIn: true,
                active: false,
                disabled: false
            },
            {
                route: '/calendar',
                name: 'Ημερολόγιο',
                loggedIn: true,
                active: false,
                disabled: false
            },
            {
                route: '/tools',
                name: 'Εργαλεία',
                loggedIn: true,
                active: false,
                disabled: false
            },
            {
                route: '/about',
                name: 'About',
                loggedIn: false,
                active: false,
                disabled: false
            }
        ]

    }),

    created: function () {
        this.getApiWorks()
    },

    methods: {

        getApiWorks () {
            api.getApiWorks()
                .then(() => {
                    this.apiWorks = true
                })
                .catch(error => {
                    this.apiWorks = false

                    utility.debug(error)
                })
        }

    }
}
</script>

<style lang="scss">
	body {
		overflow-y: scroll;
	}

    #app {
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        color: #2c3e50;
        font-family: 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #logout {
        cursor: pointer;
    }

    .btn-icon {
        cursor: pointer;
    }
</style>
