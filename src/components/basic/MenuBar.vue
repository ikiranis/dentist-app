<template>
    <b-navbar :toggleable="toggle" :type="type" :variant="variant" :fixed="fixed">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand>
            <router-link class="navbar-brand" :to="brandRoute">{{ brand }}</router-link>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <!--TODO fix cursor pointer after choose a menu-->
            <b-navbar-nav :class="valign">

                <!-- User LoggedIn items -->
                <b-nav-item href="#" v-for="item in menuItems" v-if="userId !== 0 && item.loggedIn">
                    <router-link :to="item.route" class="nav-link">{{ item.name }}</router-link>
                </b-nav-item>

                <!-- All users items -->
                <b-nav-item href="#" v-for="item in menuItems" v-if="!item.loggedIn">
                    <router-link to="/about" class="nav-link">About</router-link>
                </b-nav-item>

                <!-- User info items -->
                <b-nav-item href="#" v-if="userInfo === 'true'">
                    <CurrentUser/>
                </b-nav-item>

                <b-nav-item href="#" v-if="username && userInfo === 'true'">
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

        props: {
            brand: String,
            brandRoute: Object,
            menuItems: Array,
            userInfo: String,
            fixed: String,
            variant: String,
            type: String,
            valign: String,
            toggle: String
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