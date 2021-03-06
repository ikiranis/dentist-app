<template>

    <div>

        <b-modal ref="noteModal" size="md" centered hide-footer :title="noteTitle">

			<div class="form-group row">
				<label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
				<div class="col-md-8">
					<input id="date" type="date" class="form-control"
						   v-model="note.date">
					<form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
				</div>
			</div>

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

		<div v-if="readOnly" class="row text-light">
			<h3 class="mx-auto bg-secondary px-3">Δόντι {{ selectedTooth.number }}</h3>
		</div>

        <div v-if="!loading">

            <notes-list :notes="notes" v-if="notes.length"
                        @clickDelete="deleteTreatmentNote"
                        @clickUpdate="getTreatmentNote"/>

            <div class="row" v-if="!readOnly">
                <input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                       @click="newNote" value="Εισαγωγή σημείωσης">
            </div>

        </div>

		<p class="page-break"></p>

        <div class="row fixed-bottom mb-2">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>

</template>

<script>
import FormError from '@/components/basic/FormError'
import NotesList from '@/components/patients/NotesList'
import utility from '../../library/utility'
import api from '../../api'
import DisplayError from '@/components/basic/DisplayError'
import moment from 'moment'

export default {
    components: { FormError, DisplayError, NotesList },

    data () {
        return {
            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

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
            required: false,
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

        // When selected tooth change, load the data
        selectedTooth () {
            if (this.selectedTooth) {
                this.getTreatmentNotes()
            }
        }
    },

    created: function () {
        this.getTreatmentNotes()
    },

    methods: {

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

            this.note.tooth_number = this.selectedTooth.number

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
