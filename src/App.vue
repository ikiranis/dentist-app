<template>
    <div id="app">

        <div v-if="apiWorks">

            <menu-bar brand="Dentist" :brandRoute="{ name: 'home' }" :menuItems="menuItems" userInfo="true" fixed="top"
                      variant="dark" type="dark" valign="ml-auto" toggle="md" />

            <router-view class="mt-5 pt-5"/>

        </div>

        <div v-else>
            Api not works
        </div>

    </div>

</template>

<script>
import api from '@/api'
import MenuBar from '@/components/basic/MenuBar'

export default {
    components: { MenuBar },

    data: () => ({
        apiWorks: true,

        menuItems: [
            {
                route: '/patients',
                name: 'Ασθενείς',
                loggedIn: true
            },
            {
                route: '/economy',
                name: 'Οικονομικά',
                loggedIn: true
            },
            {
                route: '/calendar',
                name: 'Ημερολόγιο',
                loggedIn: true
            },
            {
                route: '/tools',
                name: 'Εργαλεία',
                loggedIn: true
            },
            {
                route: '/about',
                name: 'About',
                loggedIn: false
            }
        ]

    }),

    created: function () {
        console.log(process.env.VUE_APP_CLIENT_SECRET)
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
                    console.log(error)
                })
        }

    }
}
</script>

<style lang="scss">
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
