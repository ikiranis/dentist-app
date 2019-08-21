<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="row col-12">
                <div class="col-lg col-12 my-auto">
                    <h1>Οδοντιατρικό ιστορικό</h1>
                </div>
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

                <dental-history @loading="getLoading" v-if="tabs.dentalHistory.display" />

                <clinical-examination @loading="getLoading" v-if="tabs.clinicalExamination.display" />

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import Tabs from '@/components/basic/Tabs'
import ClinicalExamination from '@/components/patients/ClinicalExamination'
import DentalHistory from '@/components/patients/DentalHistoryCompo'
import Loading from '@/components/basic/Loading'

export default {
    components: { MenuBar, ClinicalExamination, DentalHistory, Loading, Tabs },

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
