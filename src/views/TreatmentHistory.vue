<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

        <b-modal ref="treatmentModal" size="md" centered hide-footer :title="treatmentTitle">

            <form @submit.prevent class="container-fluid">

                <div class="form-group row">
                    <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                    <div class="col-md-8">
                        <input id="date" type="date" class="form-control"
                               v-model="treatment.date">
                        <form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Θεραπεία</label>
                    <div class="col-md-8">
                        <textarea id="description" class="form-control"
                                  v-model="treatment.description" required> </textarea>
                        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="value" class="col-md-4 col-form-label text-md-right">Ποσό</label>
                    <div class="col-md-8">
                        <input id="value" type="number" class="form-control"
                               v-model="treatment.value" required>
                        <form-error v-if="response.errors.value" :error="response.errors.value[0]"/>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                            @click="saveTreatment">Αποθήκευση</button>
                </div>

            </form>

        </b-modal>

		<menu-bar v-if="!readOnly"
                  brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="md"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                 v-if="!treatments.length && !loading">
                Δεν βρέθηκαν θεραπείες
            </div>

            <div class="container" v-if="treatments.length">

                <treatments-list :treatments="treatments"
                            @clickDelete="deleteTreatment"
                            @clickUpdate="getTreatment"/>

            </div>

            <div class="row w-100" v-if="!loading && !readOnly">
                <input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                       @click="newTreatment()" value="Εισαγωγή θεραπείας">
            </div>

        </div>

        <div class="row fixed-bottom mb-2">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>

    <no-access-page v-else
                    message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
</template>

<script>
import FormError from '@/components/basic/FormError'
import MenuBar from '@/components/basic/MenuBar'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import TreatmentsList from '@/components/patients/TreatmentsList'
import moment from 'moment'
import utility from '../library/utility'
import api from '../api'
import { mapState } from 'vuex'
import NoAccessPage from '@/components/basic/NoAccessPage'

export default {
    components: { MenuBar, FormError, DisplayError, Loading, TreatmentsList, NoAccessPage },

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
                    active: true
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

            treatment: {
                id: 0,
                patient_id: 0,
                date: '',
                description: '',
                value: 0
            },

            treatments: [],

            treatmentTitle: ''
        }
    },

    props: {
        readOnly: {
            required: false,
            type: Boolean
        }
    },

    computed: {
        ...mapState(['userIsAdmin']),

        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getTreatments()
    },

    methods: {
        moment,

        /**
         * Get all the treatments
         */
        getTreatments () {
            this.loading = true

            api.getTreatments(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.treatments = response.data

                        return
                    }

                    this.treatments = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Display treatment for edit
         */
        getTreatment (treatmentId) {
            this.treatment = this.treatments.find((treatment) => {
                return treatment.id === treatmentId
            })

            this.treatmentTitle = 'Ενημέρωση θεραπείας'
            this.$refs.treatmentModal.show()
        },

        /**
         * Display treatment modal
         */
        newTreatment () {
            this.treatment = {
                id: 0,
                patient_id: this.patientId,
                date: moment(new Date()).format('YYYY-MM-DD')
            }

            this.treatmentTitle = 'Εισαγωγή θεραπείας'
            this.$refs.treatmentModal.show()
        },

        /**
         * Run the appropriate save action
         */
        saveTreatment () {
            if (this.treatment.id === 0) {
                this.createTreatment()
                return
            }

            this.updateTreatment()
        },

        /**
         * Create a treatment
         */
        createTreatment () {
            this.loading = true

            api.createTreatment(this.treatment)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η θεραπεία αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.treatmentModal.hide()

                    this.getTreatments(null)
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    if (error.response.data.errors) {
                        this.response.errors = error.response.data.errors
                    }

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Update the treatment
         */
        updateTreatment () {
            this.loading = true

            api.updateTreatment(this.treatment, this.treatment.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η θεραπεία ενημερώθηκε'
                    this.response.status = true

                    this.$refs.treatmentModal.hide()

                    this.getTreatments(null)
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    if (error.response.data.errors) {
                        this.response.errors = error.response.data.errors
                    }

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Delete a treatment
         */
        deleteTreatment (treatmentId) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις την θεραπεία με id: ' + treatmentId + ';')

            if (choise) {
                this.loading = true

                api.deleteTreatment(treatmentId)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Η θεραπεία διαγράφηκε'
                        this.response.status = true

                        this.getTreatments(null)
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            }
        }
    }
}
</script>
