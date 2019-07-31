<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οδοντιατρικό ιστορικό</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"/>

            <div class="container">

                <dental-history/>

                <clinical-examination/>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import ClinicalExamination from '@/components/patients/ClinicalExamination'
import DentalHistory from '@/components/patients/DentalHistoryCompo'

export default {
    components: { MenuBar, ClinicalExamination, DentalHistory },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

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
        // ...mapState(['loading']),

        patientId: function () {
            return this.$route.params.id
        }
    },

    methods: {
    //
    }
}
</script>
