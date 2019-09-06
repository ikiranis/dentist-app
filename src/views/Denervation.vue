<template>
    <div class="container-fluid my-3">

        <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                  :menuItems="menuItems" userInfo="false" fixed=""
                  variant="" type="light" valign="mx-auto" toggle="lg"
                  navCollapseText="patientBar"/>

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <tabs :tabs="tabs" class="mb-3"/>

            <div class="container">

                <endo-treatment-card
                        @loading="getLoading"
                        v-if="tabs.endoTreatmentCard.display" />

                <endo-treatment-notes
                        @loading="getLoading"
                        v-if="tabs.endoTreatmentNotes.display"/>

                <endo-treatment
                        @loading="getLoading"
                        v-if="tabs.endoTreatment.display"/>

            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from '@/components/basic/MenuBar'
    import Tabs from '@/components/basic/Tabs'
    import EndoTreatmentCard from '@/components/patients/EndoTreatmentCard'
    import EndoTreatment from '@/components/patients/EndoTreatment'
    import EndoTreatmentNotes from '@/components/patients/EndoTreatmentNotes'
    import Loading from '@/components/basic/Loading'
    import api from "../api";
    import utility from "../library/utility";

    export default {
        components: { MenuBar, EndoTreatmentCard, EndoTreatment, EndoTreatmentNotes, Loading, Tabs },

        data() {
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
                    endoTreatment: {
                        display: false,
                        label: 'Ενδοδοντική θεραπεία'
                    },
                    endoTreatmentNotes: {
                        display: false,
                        label: 'Σημειώσεις'
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
            getLoading(loading) {
                this.loading = loading
            }
        }
    }
</script>
