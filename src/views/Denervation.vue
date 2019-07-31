<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Απονεύρωση</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container">

                <endo-treatment-card/>

                <diagnosis/>

                <endo-treatment/>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import EndoTreatmentCard from '@/components/patients/EndoTreatmentCard'
import Diagnosis from '@/components/patients/Diagnosis'
import EndoTreatment from '@/components/patients/EndoTreatment'

export default {
    components: { MenuBar, EndoTreatmentCard, Diagnosis, EndoTreatment },

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

    methods: {
    //
    }
}
</script>
