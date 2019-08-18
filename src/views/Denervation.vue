<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="row col-12">
                <div class="col-lg col-12 my-auto">
                    <h1>Απονεύρωση</h1>
                </div>
                <div class="col-lg col-12 row my-auto">
                    <Loading class="ml-auto" :loading="loading"/>
                </div>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"
                      navCollapseText="patientBar" />

            <div class="container">

                <endo-treatment-card @loading="getLoading"/>

                <diagnosis @loading="getLoading"/>

<!--                <endo-treatment @loading="getLoading"/>-->

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import EndoTreatmentCard from '@/components/patients/EndoTreatmentCard'
import Diagnosis from '@/components/patients/Diagnosis'
import EndoTreatment from '@/components/patients/EndoTreatment'
import Loading from '@/components/basic/Loading'

export default {
    components: { MenuBar, EndoTreatmentCard, Diagnosis, EndoTreatment, Loading },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true
                }
            ]

        }
    },

    computed: {
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
