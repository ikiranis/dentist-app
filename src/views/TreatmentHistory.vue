<template>
    <div class="container-fluid my-3">

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
                        <input id="description" type="text" class="form-control"
                               v-model="treatment.description" required>
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
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                            @click="saveTreatment">Αποθήκευση</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="row col-12">
                <div class="col-lg col-12 my-auto">
                    <h1>Ιστορικό θεραπειών</h1>
                </div>
                <div class="col-lg col-12 row my-auto">
                    <Loading class="ml-auto" :loading="loading"/>
                </div>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"
                      navCollapseText="patientBar" />

            <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                 v-if="!treatments.length && !loading">
                Δεν βρέθηκαν θεραπείες
            </div>

            <div class="container" v-if="treatments.length">

                <div class="w-100">
                    <paginate :pagination="pagination" @click="getTreatments"/>
                </div>

                <treatments-list :treatments="treatments"
                            @clickDelete="deleteTreatment"
                            @clickUpdate="getTreatment"/>

                <div class="w-100">
                    <paginate :pagination="pagination" @click="getTreatments"/>
                </div>

            </div>

            <div class="row w-100">
                <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="newTreatment()" value="Εισαγωγή θεραπείας">
            </div>

        </div>

        <div class="row">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'
import MenuBar from '@/components/basic/MenuBar'
import Paginate from '@/components/basic/Paginate'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import TreatmentsList from '@/components/patients/TreatmentsList'
import moment from 'moment'
import utility from '../library/utility'
import api from '../api'

export default {
    components: { MenuBar, FormError, Paginate, DisplayError, Loading, TreatmentsList },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            pagination: {
                meta: {},
                links: {}
            },

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

    computed: {
        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getTreatments(null)
    },

    methods: {
        moment,

        /**
         * Get all the treatments
         *
         * @param page
         */
        getTreatments (page) {
            this.loading = true

            api.getTreatments(page, this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.treatments = response.data.data
                        this.pagination.meta = response.data.meta
                        this.pagination.links = response.data.links

                        window.scrollTo(0, 0)

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
