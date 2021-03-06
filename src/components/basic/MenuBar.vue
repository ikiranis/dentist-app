<template>
	<b-navbar :toggleable="toggle" :type="type" :variant="variant" :fixed="fixed">

		<b-navbar-toggle :target="navCollapseText"></b-navbar-toggle>

		<b-navbar-brand>
			<router-link class="navbar-brand" id="brandTitle" :to="brandRoute">{{ brand }}</router-link>
		</b-navbar-brand>

		<b-collapse is-nav :id="navCollapseText">

			<b-navbar-nav :class="valign">

				<!-- User LoggedIn items -->
				<b-nav-item class="my-auto"
							v-for="item in getAdminLoggedInMenuItems()" :key="item.name"
							:disabled="!!item.disabled">
					<router-link :to="item.route"
								 class="nav-link px-1"
								 :class="item.active ? 'bg-secondary text-light' : ''">
						<span :class="item.disabled ? 'disabled' : ''">{{ item.name }}</span>
					</router-link>
				</b-nav-item>

				<!-- All users items -->
				<b-nav-item class="my-auto"
							v-for="item in getLoggedOutMenuItems()" :key="item.name">
					<router-link :to="item.route" class="nav-link">{{ item.name }}</router-link>
				</b-nav-item>

				<b-nav-item class="my-auto"
							v-if="userInfo === 'true'">
					<CurrentUser/>
				</b-nav-item>

				<b-nav-item class="my-auto"
							v-if="username && userInfo === 'true'">
					<a class="nav-link" id="logout" @click="logout()">Αποσύνδεση</a>
				</b-nav-item>

			</b-navbar-nav>

		</b-collapse>
	</b-navbar>
</template>

<script>

import CurrentUser from '@/components/users/CurrentUser'
import { mapState, mapMutations } from 'vuex'
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
        toggle: String,
        navCollapseText: String
    },

    computed: {
        ...mapState(['userId', 'username', 'userIsAdmin'])
    },

    methods: {
        ...mapMutations(['setUsername']),

        // Get the menu items when admin user is logged in
        getAdminLoggedInMenuItems () {
            return this.menuItems.filter(item => {
                return (this.userId !== 0 && item.loggedIn && this.checkAdminRights(item))
            })
        },

        // Get the menu items when user is not logged in
        getLoggedOutMenuItems () {
            return this.menuItems.filter(item => {
                return (!item.loggedIn)
            })
        },

        /**
         * Check if user have rights to see the item
         *
         * @param item
         * @return boolean
         */
        checkAdminRights (item) {
            if (!item.isForAdmin) {
                return true
            }

            return this.userIsAdmin
        },

        /**
         * Do the logout
         */
        logout () {
            user.logout()
            this.$store.dispatch('getCurrentUser')
            /*
             * Hack Alert!!!
             * Force to empty the username, because it need some time to run getCurrentUser and do it
             */
            this.setUsername(null)
            this.$router.push({ name: 'home' }) // Force to load home page
        }

    }
}
</script>

<style scoped>
	.disabled {
		color: lightgray;
	}
</style>
