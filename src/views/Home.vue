<template>
    <div class="container-fluid mt-3">

        <div class="container mb-3 col-12 col-lg-4 mx-auto" v-if="isUserLoggedIn">
            <h1 class="text-center">Επιλογές</h1>

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

<!--        <div v-if="!isUserLoggedIn">-->

<!--            <div class="row">-->
<!--                <span class="btn btn-info my-3 ml-auto mr-auto" v-if="!displayRegister && !username"-->
<!--                      @click="displayRegisterComponent">Register User</span>-->
<!--            </div>-->

<!--        </div>-->

<!--        <Register v-if="displayRegister"/>-->




    </div>
</template>

<script>
    // @ is an alias to /src
    import api from '@/api';
    import {mapState} from 'vuex';

    // TODO delete localStorage.accessToken if not valid
    export default {
        name: 'home',

        data: () => ({
            isUserLoggedIn: false
        }),

        computed: {
            ...mapState(['username']),

            routeName: function () {
                return this.$route.name;
            }
        },

        watch: {
            username() {
                // We make sure to take new value of localStorage.accessToken when username is changed
                this.isUserLoggedIn = !!localStorage.accessToken;

                if(!this.isUserLoggedIn) {
                    this.$router.push({name: 'login'}); // Force to load Login page
                }
            }
        },

        mounted: function() {
            this.isUserLoggedIn = !!localStorage.accessToken;

            if(!this.isUserLoggedIn) {
                this.$router.push({name: 'login'}); // Force to load Login page
            }
        },

        beforeCreate: function () {
            api.getUsersCount()
                .then(response => {
                    if (response.count === 0) {
                        this.$router.push({name: 'register'}); // Force to load register page
                    }
                })
                .catch(error => console.log(error.response));
        },

        methods: {
        //
        }
    }
</script>