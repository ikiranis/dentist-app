<template>

    <div>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="selectedTooth.number === 0">
            Πρέπει να επιλέξεις δόντι
        </div>

		<div v-if="readOnly" class="row text-light">
			<h3 class="mx-auto bg-secondary px-3">Δόντι {{ selectedTooth.number }}</h3>
		</div>

        <table class="table" v-if="selectedTooth.number !== 0">
            <div class="row">
                <endo-treatment-labels class="col"/>

                <endo-treatment-form v-for="treatment in endoTreatments"
                                     :key="treatment.id"
                                     class="col"
                                     :treatment="treatment"
                                     :response="response"
                                     :roots="roots"
                                     :deleteEndoTreatment="deleteEndoTreatment"
                                     :saveData="saveData"/>

                <div class="my-auto" v-if="!readOnly">
                    <plus-circle-outline fillColor="black" :size="30"
                                         class="btn-icon" title="Εισαγωγή σημείωσης"
                                         @click="newEndoTreatment"/>
                </div>
            </div>
        </table>

        <endo-treatment-notes v-if="selectedTooth.number !== 0 && !readOnly"
                :selectedTooth="selectedTooth"
                @loading="getLoading" />

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
import EndoTreatmentForm from '@/components/patients/EndoTreatmentForm'
import EndoTreatmentLabels from '@/components/patients/EndoTreatmentLabels'
import EndoTreatmentNotes from '@/components/patients/EndoTreatmentNotes'

export default {
    components: { DisplayError, EndoTreatmentForm, EndoTreatmentLabels, EndoTreatmentNotes },

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

            endoTreatment: {},

            note: {
                id: 0,
                patient_id: 0,
                date: null,
                description: null
            },

            notes: [],

            noteTitle: ''
        }
    },

    props: {
        selectedTooth: {
            required: true,
            type: Object
        },
        readOnly: {
            required: false,
            type: Boolean
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
            if (this.checkEndoTreatmentSingularity()) {
                this.response.message = 'Μπορείς να προσθέσεις μόνο μία ρίζα την φορά'
                this.response.status = false

                return
            }

            this.resetEndoTreatment()

            this.endoTreatments.push(this.endoTreatment)
        },

        // Reset values of endoTreatment
        resetEndoTreatment () {
            this.endoTreatment = {
                id: 0,
                patient_id: this.patientId,
                root_id: 0,
                tooth_number: this.selectedTooth.number,
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
        },

        /**
         * Check if we have already item with id = 0
         * Return true if exist
         */
        checkEndoTreatmentSingularity () {
            return !!this.endoTreatments.find(item => {
                return item.id === 0
            })
        },

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

<style scoped>
    td {
        width: 2em;
    }
</style>
