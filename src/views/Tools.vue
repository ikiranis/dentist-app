<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Εργαλεία</h1>
            </div>

            <div class="container mb-3 col-12 col-lg-4 mx-auto">
                <router-link to="/backup">
                    <b-button variant="secondary" class="w-100 mt-3">Backup</b-button>
                </router-link>
            </div>

        </div>
    </div>

    <no-access-page v-else
                    message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
</template>

<script>
import NoAccessPage from '@/components/basic/NoAccessPage'
import { mapState } from 'vuex'

export default {
    components: { NoAccessPage },

    data () {
        return {
            //
        }
    },

    computed: {
        ...mapState(['userIsAdmin'])
    },

    methods: {
    //
    }
}
</script>
