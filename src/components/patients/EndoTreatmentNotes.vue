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
                       class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="saveNote" value="Αποθήκευση">
            </div>
        </b-modal>

        <div>

            <notes-list :notes="notes"
                        @clickDelete="deleteTreatmentNote"
                        @clickUpdate="getTreatmentNote" />

            <div class="row" v-if="!loading">
                <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
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

        computed: {
            patientId: function () {
                return this.$route.params.id
            }
        },

        watch: {
            loading () {
                this.$emit('loading', this.loading)
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

                api.getTreatmentNotes(this.patientId)
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

<style lang="scss" scoped>

    input[type=checkbox] {
        /* Double-sized Checkboxes */
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        padding: 10px;
    }

    .removeItem {
        cursor: pointer;
    }

</style>
