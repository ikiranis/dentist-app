<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="row col-12">
                <div class="col-lg col-12 row my-auto">
                    <Loading class="ml-auto" :loading="loading"/>
                </div>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"
                      navCollapseText="patientBar" />

			<tabs :tabs="tabs" class="mb-3" />

            <div class="container">

                <endo-treatment-card @loading="getLoading" v-if="tabs.endoTreatmentCard.display" />

                <diagnosis @loading="getLoading" v-if="tabs.diagnosis.display" />

                <endo-treatment @loading="getLoading" v-if="tabs.endoTreatment.display" />

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import Tabs from '@/components/basic/Tabs'
import EndoTreatmentCard from '@/components/patients/EndoTreatmentCard'
import Diagnosis from '@/components/patients/Diagnosis'
import EndoTreatment from '@/components/patients/EndoTreatment'
import Loading from '@/components/basic/Loading'

export default {
    components: { MenuBar, EndoTreatmentCard, Diagnosis, EndoTreatment, Loading, Tabs },

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
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true,
                    active: false
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
                    active: true
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
                    active: false
                }
            ],

            tabs: {
                endoTreatmentCard: {
                    display: true,
                    label: 'Δελτίο ενδοδοντικής θεραπείας'
                },
                diagnosis: {
                    display: false,
                    label: 'Διάγνωση'
                },
                endoTreatment: {
                    display: false,
                    label: 'Ενδοδοντική θεραπεία'
                }
            }

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
