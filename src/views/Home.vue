<template>
    <div class="container-fluid mt-3">

        <div class="container mb-3 col-12 col-lg-4 mx-auto" v-if="isUserLoggedIn">
            <h1 class="text-center">Βασικές Επιλογές</h1>

            <router-link to="/patients">
                <b-button variant="secondary" class="w-100 mt-3">Ασθενείς</b-button>
            </router-link>

            <router-link to="/economy">
                <b-button variant="secondary" class="w-100 mt-3">Οικονομικά</b-button>
            </router-link>

            <router-link to="/calendar">
                <b-button variant="secondary" class="w-100 mt-3">Ημερολόγιο</b-button>
            </router-link>

            <router-link to="/tools">
                <b-button variant="secondary" class="w-100 mt-3">Εργαλεία</b-button>
            </router-link>
        </div>

        <div v-if="!isUserLoggedIn">

            <Login v-if="!displayRegister && !username"/>

            <div class="row">
                <span class="btn btn-info my-3 ml-auto mr-auto" v-if="!displayRegister && !username"
                      @click="displayRegisterComponent">Register User</span>
            </div>

        </div>

        <Register v-if="displayRegister"/>


        <div class="row">
            <span class="btn btn-info my-3 ml-auto mr-auto" v-if="displayRegister" @click="displayLoginComponent">Login User</span>
        </div>

    </div>
</template>

<script>
    // @ is an alias to /src
    import api from '@/api';
    import Login from '@/components/users/Login.vue'
    import Register from '@/components/users/Register.vue'
    import {mapState, mapMutations} from 'vuex';

    // TODO delete localStorage.accessToken if not valid
    export default {
        name: 'home',

        components: {
            Login,
            Register
        },

        data: () => ({
            isUserLoggedIn: false
        }),

        computed: {
            ...mapState(['displayRegister', 'username']),

            routeName: function () {
                return this.$route.name;
            }
        },

        watch: {
            username() {
                // We make sure to take new value of localStorage.accessToken when username is changed
                this.isUserLoggedIn = !!localStorage.accessToken;
            }
        },

        mounted: function() {
            this.isUserLoggedIn = !!localStorage.accessToken;
        },

        beforeCreate: function () {
            api.getUsersCount()
                .then(response => {
                    if (response.count === 0) {
                        this.setDisplayRegister(true);
                    }
                })
                .catch(error => console.log(error.response));
        },

        methods: {
            ...mapMutations(['setDisplayRegister']),

            displayRegisterComponent() {
                this.setDisplayRegister(true);
            },

            displayLoginComponent() {
                this.setDisplayRegister(false);
            }
        }
    }
</script>