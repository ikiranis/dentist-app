<template>
    <div class="container-fluid my-3">

        <b-modal ref="noteModal" size="md" centered hide-footer :title="noteTitle">

            <form @submit.prevent class="container-fluid">

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control" maxlength="10"
                               v-model="note.description" required>

                        <form-error v-if="response.errors.description"
                                    :error="response.errors.description[0]" />
                    </div>
                </div>

                <div class="row">
                    <input type="button" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
						   @click="saveNote" value="Αποθήκευση">

					<input v-if="note.id !== 0" type="button" class="btn btn-danger col-lg-5 col-12 my-3 mx-auto"
						   @click="deleteDentalGramNote" value="Διαγραφή">
                </div>

            </form>

        </b-modal>

		<b-modal ref="originNoteModal" size="md" centered hide-footer :title="noteTitle">

			<form @submit.prevent class="container-fluid">

				<div class="form-group row">
					<label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
					<div class="col-md-8">
						<input id="originDescription" type="text" class="form-control" maxlength="10"
							   v-model="originNote.description" required>

						<form-error v-if="response.errors.description"
									:error="response.errors.description[0]" />
					</div>
				</div>

				<div class="row">
					<input type="button" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
						   @click="saveOriginNote" value="Αποθήκευση">

					<input v-if="note.id !== 0" type="button" class="btn btn-danger col-lg-5 col-12 my-3 mx-auto"
						   @click="deleteOriginDentalNote" value="Διαγραφή">
				</div>

			</form>

		</b-modal>

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="lg"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

			<div class="col-lg col-12 row fixed-bottom mb-5">
				<Loading class="mx-auto" :loading="loading"/>
			</div>

            <div class="row">

                <dental-gram-teeth-table v-if="upperNotes.length"
										 class="mx-auto"
										 :teeth="upperTeeth"
										 :notes="upperNotes"
										 :originNotes="upperOriginNotes"
										 :newNote="newNote"
										 :updateNote="getNote"
										 :deleteNote="deleteDentalGramNote"
										 :newOriginNote="newOriginNote"
										 :updateOriginNote="getOriginNote"
										 :deleteOriginNote="deleteOriginDentalNote" />

                <dental-gram-teeth-table v-if="downNotes.length"
										 class="mx-auto"
										 :teeth="downTeeth"
										 :notes="downNotes"
										 :originNotes="downOriginNotes"
										 :newNote="newNote"
										 :updateNote="getNote"
										 :deleteNote="deleteDentalGramNote"
										 :newOriginNote="newOriginNote"
										 :updateOriginNote="getOriginNote"
										 :deleteOriginNote="deleteOriginDentalNote" />

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
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'
import DentalGramTeethTable from '@/components/patients/DentalGramTeethTable'
import api from '../api'
import utility from '../library/utility'
import moment from 'moment'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'

export default {
    components: { MenuBar, FormError, DentalGramTeethTable, DisplayError, Loading },

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
					active: true
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
					active: false
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
					active: false
                }
            ],

            note: {
                toothId: 0,
                date: '',
                description: ''
            },

            originNote: {
                toothId: 0,
                date: '',
                description: ''
            },

            teeth: [],

            notes: [],

            originDentalNotes: [],

            noteTitle: ''
        }
    },

    computed: {
        /**
		 * Filter upper teeth
		 */
        upperTeeth () {
            return this.teeth.filter((tooth) => {
                return tooth.number <= 28
            })
        },

        /**
		 * Filter down teeth
		 */
        downTeeth () {
            return this.teeth.filter((tooth) => {
                return tooth.number > 28
            })
        },

        /**
		 * Filter upper notes
		 */
        upperNotes () {
            return this.notes.filter((note) => {
                return note.tooth_number <= 28
            })
        },

        /**
		 * Filter down notes
		 */
        downNotes () {
            return this.notes.filter((note) => {
                return note.tooth_number > 28
            })
        },

        /**
		 * Filter upper origin notes
		 */
        upperOriginNotes () {
            return this.originDentalNotes.filter((note) => {
                return note.tooth_number <= 28
            })
        },

        /**
		 * Filter down origin notes
		 */
        downOriginNotes () {
            return this.originDentalNotes.filter((note) => {
                return note.tooth_number > 28
            })
        },

        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getTeeth()
        this.getDentalGramNotes()
        this.getOriginDentalNotes()
    },

    methods: {
        moment,

        /**
		 * Display note modal
		 */
        newNote (tooth) {
            this.note = {
                id: 0,
                tooth_number: tooth.number,
                patient_id: this.patientId,
                description: '',
                created_at: moment(new Date()).format('YYYY-MM-DD')
            }

            this.noteTitle = 'Εισαγωγή σημείωσης'

            this.$refs.noteModal.show()
        },

        /**
		 * Display Origin note modal
		 */
        newOriginNote (tooth) {
            this.originNote = {
                id: 0,
                tooth_number: tooth.number,
                patient_id: this.patientId,
                description: ''
            }

            this.noteTitle = 'Εισαγωγή σημείωσης'

            this.$refs.originNoteModal.show()
        },

        /**
		 * Save note
		 */
        saveNote () {
            if (this.note.id === 0) {
                this.createDentalGramNote()
                return
            }

            this.updateDentalGramNote()
        },

        /**
		 * Save origin note
		 */
        saveOriginNote () {
            if (this.originNote.id === 0) {
                this.createOriginDentalNote()
                return
            }

            this.updateOriginDentalNote()
        },

        /**
         * Get all teeth
         */
        getTeeth () {
            api.getTeeth()
                .then(response => {
                    if (response.status === 200) {
                        this.teeth = response.data

                        return
                    }

                    this.teeth = []
                })
                .catch(error => {
                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
		 * Display note for edit
		 */
        getNote (note) {
            this.note = note
            delete this.note.created_at // Remove created_at, because it trigger error

            this.noteTitle = 'Ενημέρωση σημείωσης'
            this.$refs.noteModal.show()
        },

        /**
		 * Display origin note for edit
		 */
        getOriginNote (note) {
            this.originNote = note
            delete this.originNote.created_at // Remove created_at, because it trigger error

            this.noteTitle = 'Ενημέρωση σημείωσης'
            this.$refs.originNoteModal.show()
        },

        /**
		 * Get all Dental Gram Notes
		 */
        getDentalGramNotes () {
            this.loading = true

            api.getDentalGramNotes(this.patientId)
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
		 * Create a Dental Gram note
		 */
        createDentalGramNote () {
            this.loading = true

            api.createDentalGramNote(this.note)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getDentalGramNotes()
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
		 * Update the Dental Gram Note
		 */
        updateDentalGramNote () {
            this.loading = true

            api.updateDentalGramNote(this.note, this.note.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση ενημερώθηκε'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getDentalGramNotes()
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
		 * Delete a Dental Gram Note
		 */
        deleteDentalGramNote () {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις σημείωση;')

            if (choise) {
                this.loading = true

                api.deleteDentalGramNote(this.note.id)
                    .then(response => {
                        this.loading = false

                        this.$refs.noteModal.hide()

						this.response.message = 'Η σημείωση διαγράφηκε'
						this.response.status = true

                        this.getDentalGramNotes()
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
		 * Get all Origin Dental Notes
		 */
        getOriginDentalNotes () {
            this.loading = true

            api.getOriginDentalNotes(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.originDentalNotes = response.data

                        return
                    }

                    this.originDentalNotes = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
		 * Create a Origin Dental note
		 */
        createOriginDentalNote () {
            this.loading = true

            api.createOriginDentalNote(this.originNote)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.originNoteModal.hide()

                    this.getOriginDentalNotes()
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
		 * Update the Origin Dental Note
		 */
        updateOriginDentalNote () {
            this.loading = true

            api.updateOriginDentalNote(this.originNote, this.originNote.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Η σημείωση ενημερώθηκε'
                    this.response.status = true

                    this.$refs.originNoteModal.hide()

                    this.getOriginDentalNotes()
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
		 * Delete an Origin Dental Note
		 */
        deleteOriginDentalNote () {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις σημείωση;')

            if (choise) {
                this.loading = true

                api.deleteOriginDentalNote(this.originNote.id)
                    .then(response => {
                        this.loading = false

                        this.$refs.originNoteModal.hide()

						this.response.message = 'Η σημείωση διαγράφηκε'
						this.response.status = true

                        this.getOriginDentalNotes()
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
