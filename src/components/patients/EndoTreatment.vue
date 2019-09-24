<template>

    <div>

        <table class="table">

            <tbody>
                <endo-treatment-labels />

                <endo-treatment-form v-for="treatment in selectedEndoTreatments"
                                     :key="treatment.id"
                                     :treatment="treatment"
                                     :response="response"
                                     :roots="roots"
                                     :teeth="teeth"
                                     :deleteEndoTreatment="deleteEndoTreatment"
                                     :saveData="saveData"/>
            </tbody>
        </table>

        <div class="row fixed-bottom mb-2">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>

</template>

<script>
import utility from '../../library/utility'
import api from '../../api'
import DisplayError from '@/components/basic/DisplayError'
import TeethList from '@/components/patients/TeethList'
import EndoTreatmentForm from '@/components/patients/EndoTreatmentForm'
import EndoTreatmentLabels from '@/components/patients/EndoTreatmentLabels'

export default {
    components: { DisplayError, TeethList, EndoTreatmentForm, EndoTreatmentLabels },

    data () {
        return {
            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

            roots: [],

            endoTreatments: [],

            selectedEndoTreatments: [],

            endoTreatment: {},

            chozenRoots: [],
        }
    },

    props: {
        selectedTooth: {
            required: true,
            type: Object
        }
    },

    computed: {
        patientId: function () {
            return this.$route.params.id
        }
    },

    watch: {
        loading () {
            this.$emit('loading', this.loading)
        },

        endoTreatments () {
            let toothNumbers = []
            this.haveTeeth = {}

            this.endoTreatments.forEach((data, index) => {
                let tooth = {
                    endoTreatmentIndex: index,
                    number: data.tooth_number,
                    display: false
                }

                // Check for duplicate entry
                if (!toothNumbers.includes(data.tooth_number)) {
                    this.$set(this.haveTeeth, data.id, tooth)
                    toothNumbers.push(data.tooth_number)
                }
            })
        },

        // When selected tooth change, load the data
        selectedTooth () {
            if (this.selectedTooth) {
                this.getEndoTreatments()
            }
        }
    },

    created: function () {
        this.getRoots()
        this.getEndoTreatments()
    },

    methods: {
        /**
             * Create or update data
             */
        saveData (endoTreatment) {
            if (endoTreatment.id === 0) {
                this.createEndoTreatment(endoTreatment)

                return
            }

            this.updateEndoTreatment(endoTreatment)
        },

        /**
             * Get all endo treatments for patientId
             */
        getEndoTreatments () {
            this.loading = true

            api.getEndoTreatments(this.patientId, this.selectedTooth.number)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatments = response.data

                        return
                    }

                    this.endoTreatments = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
             * Create an endo treatment
             */
        createEndoTreatment (endoTreatment) {
            this.loading = true

            endoTreatment.patient_id = this.patientId

            api.createEndoTreatment(endoTreatment)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Τα δεδομένα αποθηκεύτηκαν'
                    this.response.status = true

                    this.getEndoTreatments()
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
             * Update the Endo Treatment info
             *
             * @param endoTreatment
             */
        updateEndoTreatment (endoTreatment) {
            this.loading = true

            api.updateEndoTreatment(endoTreatment, endoTreatment.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Τα δεδομένα αποθηκεύτηκαν'
                    this.response.status = true

                    this.getEndoTreatments()
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
             * Delete an endo treatment
             */
        deleteEndoTreatment (id) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις τα δεδομένα;')

            if (choise) {
                this.loading = true

                api.deleteEndoTreatment(id)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Τα δεδομένα διαγράφηκαν'
                        this.response.status = true

                        this.newEndoTreatment()
                        this.getEndoTreatments()
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            }
        },

        /**
             * Get all roots
             */
        getRoots () {
            this.loading = true

            api.getRoots()
                .then(response => {
                    if (response.status === 200) {
                        this.loading = false

                        this.roots = response.data

                        return
                    }

                    this.roots = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        // Reset all values for new card
        newEndoTreatment () {
            this.resetEndoTreatment()

            this.endoTreatments.push(this.endoTreatment)

            this.getEndoTreatmentsForTooth()
        },

        // Reset values of endoTreatment
        resetEndoTreatment () {
            this.endoTreatment = {
                id: 0,
                root_id: 0,
                tooth_number: this.selectedTooth,
                roots: [],
                counter: null,
                radiography: null,
                workingLength: null,
                benchmark: null,
                benchmark_id: 0,
                benchmarks: [],
                MAF: null,
                chemicalMechanicalTreatment: null,
                blocking_technique_id: 0,
                blockingTechniques: []
            }
        }
    }
}
</script>
