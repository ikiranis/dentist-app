<template>

    <div>

        <b-modal ref="noteModal" size="md" centered hide-footer :title="noteTitle">
            <div class="form-group row">
                <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                <div class="col-md-8">
                    <input id="description" type="text" class="form-control"
                           v-model="note.description" required>
                    <form-error v-if="response.errors.description"
                                :error="response.errors.description[0]"/>
                </div>
            </div>

            <div class="row">
                <input type="submit"
                       class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                       @click="saveNote" value="Αποθήκευση">
            </div>
        </b-modal>

        <table class="table">
            <tbody>
                <endo-treatment-labels />

                <endo-treatment-form v-for="treatment in endoTreatments"
                                     :key="treatment.id"
                                     :treatment="treatment"
                                     :response="response"
                                     :roots="roots"
                                     :teeth="teeth"
                                     :deleteEndoTreatment="deleteEndoTreatment"
                                     :saveData="saveData"/>
            </tbody>
        </table>

        <div v-if="!loading">

            <notes-list :notes="notes"
                        @clickDelete="deleteTreatmentNote"
                        @clickUpdate="getTreatmentNote" />

            <div class="row">
                <input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                       @click="newNote" value="Εισαγωγή σημείωσης">
            </div>

        </div>

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
import FormError from '@/components/basic/FormError'
import TeethList from '@/components/patients/TeethList'
import EndoTreatmentForm from '@/components/patients/EndoTreatmentForm'
import EndoTreatmentLabels from '@/components/patients/EndoTreatmentLabels'
import NotesList from '@/components/patients/NotesList'
import moment from 'moment'

export default {
    components: { DisplayError, FormError, TeethList, EndoTreatmentForm, EndoTreatmentLabels, NotesList },

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
                this.getTreatmentNotes()
            }
        }
    },

    created: function () {
        this.getRoots()
        this.getEndoTreatments()
        this.getTreatmentNotes()
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
        },

        /**
         * Get all treatment notes for patientId
         */
        getTreatmentNotes () {
            this.loading = true

            api.getTreatmentNotes(this.patientId, this.selectedTooth.number)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.notes = response.data

                        return
                    }

                    this.notes = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Display note for edit
         */
        getTreatmentNote (treatmentNoteId) {
            this.note = this.notes.find((note) => {
                return note.id === treatmentNoteId
            })

            this.noteTitle = 'Ενημέρωση σημείωσης'
            this.$refs.noteModal.show()
        },

        /**
         * Create a note
         */
        createTreatmentNote () {
            this.loading = true

            api.createTreatmentNote(this.note)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getTreatmentNotes()
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
         * Update a note
         */
        updateTreatmentNote () {
            this.loading = true

            api.updateTreatmentNote(this.note, this.note.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση ενημερώθηκε'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getTreatmentNotes()
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
         * Delete a transaction
         */
        deleteTreatmentNote (treatmentNoteId) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις την σημείωση με id: ' + treatmentNoteId + ';')

            if (choise) {
                this.loading = true

                api.deleteTreatmentNote(treatmentNoteId)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Η σημείωση διαγράφηκε'
                        this.response.status = true

                        this.getTreatmentNotes()
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
         * Run the appropriate save action
         */
        saveNote () {
            if (this.note.id === 0) {
                this.createTreatmentNote()
                return
            }

            this.updateTreatmentNote()
        },

        /**
         * Display note modal
         */
        newNote () {
            this.note = {
                id: 0,
                patient_id: this.patientId,
                date: moment(new Date()).format('YYYY-MM-DD')
            }

            this.noteTitle = 'Εισαγωγή σημείωσης'
            this.$refs.noteModal.show()
        }
    }
}
</script>
