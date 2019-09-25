<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

        <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                  :menuItems="menuItems" userInfo="false" fixed=""
                  variant="" type="light" valign="mx-auto" toggle="md"
                  navCollapseText="patientBar"/>

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <div class="row">
                <teeth-list class="mb-2 mx-auto"
                            :teeth="haveTeeth"
                            :newEndoTreatmentCard="newCard" />
            </div>

            <div class="row col-12 mb-3">
                <tabs :tabs="tabs" class="mx-auto"/>
            </div>

            <div class="container">

                <endo-treatment-card
                        :selectedTooth="selectedTooth"
                        @loading="getLoading"
                        v-if="tabs.endoTreatmentCard.display" />

                <endo-treatment
                        :selectedTooth="selectedTooth"
                        @loading="getLoading"
                        v-if="tabs.endoTreatment.display"/>

            </div>

        </div>
    </div>

    <no-access-page v-else
                    message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import Tabs from '@/components/basic/Tabs'
import EndoTreatmentCard from '@/components/patients/EndoTreatmentCard'
import EndoTreatment from '@/components/patients/EndoTreatment'
import Loading from '@/components/basic/Loading'
import {mapState} from "vuex";
import NoAccessPage from '@/components/basic/NoAccessPage'
import TeethList from '@/components/patients/TeethList'
import api from "../api";
import utility from "../library/utility";

export default {
    components: { MenuBar, EndoTreatmentCard, EndoTreatment,
        Loading, Tabs, NoAccessPage, TeethList },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            haveTeeth: {},

            endoTreatmentCards: [],

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
                }
            }
        }
    },

    computed: {
        ...mapState(['userIsAdmin']),

        patientId: function () {
            return this.$route.params.id
        },

        // Find the tooth with display (true)
        selectedTooth: function () {
            let selected = Object.values(this.haveTeeth).find((tooth) => {
                return tooth.display
            })

            let tooth = {
                number: 0
            }

            return selected ? selected : tooth
        }
    },

    watch: {
        endoTreatmentCards () {
            this.haveTeeth = {}

            this.endoTreatmentCards.forEach((card, index) => {
                let tooth = {
                    endoTreatmentIndex: index,
                    number: card.tooth_number,
                    display: false
                }

                this.$set(this.haveTeeth, card.id, tooth)
            })
        }
    },

    created: function () {
        this.getSimpleEndoTreatmentCards()
    },

    methods: {
        /**
         * Get all simple endo treatment cards for patientId
         */
        getSimpleEndoTreatmentCards () {
            this.loading = true

            api.getSimpleEndoTreatmentCards(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatmentCards = response.data

                        return
                    }

                    this.endoTreatmentCards = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
             * Get loading value from components
             *
             * @param loading
             */
        getLoading (loading) {
            this.loading = loading
        },

        newCard () {
            Object.values(this.haveTeeth).forEach(tooth => {
                tooth.display = false
            })
        }
    }
}
</script>
