<template>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            <router-link class="navbar-brand" to="/">{{ brand }}</router-link>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <!--TODO fix cursor pointer after choose a menu-->
            <b-navbar-nav class="ml-auto">

                <b-nav-item href="#" v-if="userId !== 0">
                    <router-link to="/patients" class="nav-link">Ασθενείς</router-link>
                </b-nav-item>

                <b-nav-item href="#" v-if="userId !== 0">
                    <router-link to="/economy" class="nav-link">Οικονομικά</router-link>
                </b-nav-item>

                <b-nav-item href="#" v-if="userId !== 0">
                    <router-link to="/calendar" class="nav-link">Ημερολόγιο</router-link>
                </b-nav-item>

                <b-nav-item href="#" v-if="userId !== 0">
                    <router-link to="/tools" class="nav-link">Εργαλεία</router-link>
                </b-nav-item>

                <b-nav-item href="#">
                    <CurrentUser/>
                </b-nav-item>

                <b-nav-item href="#">
                    <router-link to="/about" class="nav-link">About</router-link>
                </b-nav-item>

                <b-nav-item href="#" v-if="username">
                    <a class="nav-link" id="logout" @click="logout()">Αποσύνδεση</a>
                </b-nav-item>

            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>

    import CurrentUser from "@/components/users/CurrentUser";
    import { mapState, mapMutations } from 'vuex';
    import user from '@/library/user'

    export default {
        components: { CurrentUser },

        data() {
            return {
                //
            }
        },

        props: {
            brand: String
        },

        computed: {
            ...mapState(['userId', 'username'])
        },

        methods: {
            ...mapMutations(['setUsername']),

            /**
             * Do the logout
             */
            logout() {
                user.logout();
                this.$store.dispatch('getCurrentUser');
                // Hack Alert!!!
                // Force to empty the username, because it need some time to run getCurrentUser and do it
                this.setUsername(null);
                this.$router.push({name: 'home'}); // Force to load home page
            }

        }
    }
</script>