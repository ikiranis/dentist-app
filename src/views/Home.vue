<template>
    <div class="container-fluid mt-3 row" v-if="isUserLoggedIn">

		<div class="col-lg-6 col-12 text-center">
			<img src="/images/tooth_logo.png" height="300">
		</div>

		<div class="col-lg-6 col-12 row">
			<div class="mb-3 col-12 mx-auto" v-if="userIsAdmin">
				<h1 class="text-center">Επιλογές</h1>

				<router-link to="/patients">
					<b-button id="patients" variant="secondary" class="w-100 mt-3">Ασθενείς</b-button>
				</router-link>

				<router-link to="/economy">
					<b-button id="economy" variant="secondary" class="w-100 mt-3">Οικονομικά</b-button>
				</router-link>

				<router-link to="/calendar">
					<b-button id="calendar" variant="secondary" class="w-100 mt-3">Ημερολόγιο</b-button>
				</router-link>

				<router-link to="/tools">
					<b-button id="tools" variant="secondary" class="w-100 mt-3">Εργαλεία</b-button>
				</router-link>
			</div>

			<no-access-page v-else
							message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
		</div>

    </div>
</template>

<script>
// @ is an alias to /src
import api from '@/api'
import { mapState } from 'vuex'
import NoAccessPage from '@/components/basic/NoAccessPage'

// TODO delete localStorage.accessToken if not valid
export default {
    name: 'home',

    components: { NoAccessPage },

    data: () => ({
        isUserLoggedIn: false
    }),

    computed: {
        ...mapState(['username', 'userIsAdmin']),

        routeName: function () {
            return this.$route.name
        }
    },

    watch: {
        username () {
            // We make sure to take new value of localStorage.accessToken when username is changed
            this.isUserLoggedIn = !!localStorage.accessToken

            if (!this.isUserLoggedIn) {
                this.$router.push({ name: 'login' }) // Force to load Login page
            }
        }
    },

    mounted: function () {
        this.isUserLoggedIn = !!localStorage.accessToken

        if (!this.isUserLoggedIn) {
            this.$router.push({ name: 'login' }) // Force to load Login page
        }
    },

    beforeCreate: function () {
        api.getUsersCount()
            .then(response => {
                if (response.count === 0) {
                    this.$router.push({ name: 'register' }) // Force to load register page
                }
            })
            .catch(error => console.log(error.response))
    }
}
</script>
