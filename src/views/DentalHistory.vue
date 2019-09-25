<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="md"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <div class="row col-12 mb-3">
                <tabs :tabs="tabs" class="mx-auto"/>
            </div>

            <div class="container">

                <dental-history @loading="getLoading" v-if="tabs.dentalHistory.display" />

                <clinical-examination @loading="getLoading" v-if="tabs.clinicalExamination.display" />

            </div>

        </div>
    </div>

    <no-access-page v-else
                    message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import Tabs from '@/components/basic/Tabs'
import ClinicalExamination from '@/components/patients/ClinicalExamination'
import DentalHistory from '@/components/patients/DentalHistoryCompo'
import Loading from '@/components/basic/Loading'
import { mapState } from 'vuex'
import NoAccessPage from '@/components/basic/NoAccessPage'

export default {
    components: { MenuBar, ClinicalExamination, DentalHistory, Loading, Tabs, NoAccessPage },

    data () {
        return {
            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true,
                    active: true
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
                    active: false
                }
            ],

            tabs: {
                dentalHistory: {
                    display: true,
                    label: 'Οδοντιατρικό ιστορικό'
                },
                clinicalExamination: {
                    display: false,
                    label: 'Κλινική εξέταση'
                }
            }

        }
    },

    computed: {
        ...mapState(['userIsAdmin']),

        patientId: function () {
            return this.$route.params.id
        }
    },

    methods: {
        /**
         * Get loading value from components
         *
         * @param loading
         */
        getLoading (loading) {
            this.loading = loading
        }
    }
}
</script>
