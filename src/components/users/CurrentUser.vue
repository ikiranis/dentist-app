<template>
    <li class="nav-item" v-if="username">
        <router-link to="/user" >
            <span class="nav-link">
                {{ username }}
            </span>
        </router-link>
    </li>
    <li v-else class="nav-item">
        <router-link to="/login">
            <span class="nav-link">Σύνδεση</span>
        </router-link>
    </li>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['username'])
    },

    beforeCreate: function () {
        this.$store.dispatch('getCurrentUser')
    },

    methods: {
        ...mapActions(['getCurrentUser'])
    }
}
</script>
