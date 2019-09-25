<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

        <b-modal ref="noteModal" size="md" centered hide-footer :title="noteTitle">

            <form @submit.prevent class="container-fluid">

                <div class="form-group row">
                    <label for="number1" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number1" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure1" required>
                    </div>

                    <label for="number2" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number2" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure2" required>
                    </div>

                    <label for="number3" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number3" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure3" required>
                    </div>

                    <label for="number4" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number4" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure4" required>
                    </div>

                    <label for="number5" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number5" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure5" required>
                    </div>

                    <label for="number6" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number6" type="number" min="0" max="99" class="form-control"
                               v-model="note.measure6" required>
                    </div>
                </div>

                <div class="row">
                    <input type="button" class="btn btn-success col-md-5 col-12 my-3 mx-auto"
                            @click="saveNote" value="Αποθήκευση">

					<input v-if="note.id !== 0" type="button" class="btn btn-danger col-md-5 col-12 my-3 mx-auto"
						   @click="deletePeriodontalChartNote" value="Διαγραφή">
                </div>

            </form>

        </b-modal>

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="md"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

			<div class="container row">
					<periodontal-chart-tooths-table v-if="!loading"
													class="mx-auto"
													:teeth="upperTeeth"
													:notes="upperNotes"
													:newNote="newNote"
													:updateNote="getNote"
													:deleteNote="deletePeriodontalChartNote" />

					<periodontal-chart-tooths-table v-if="!loading"
													class="mx-auto"
													:teeth="downTeeth"
													:notes="downNotes"
													:newNote="newNote"
													:updateNote="getNote"
													:deleteNote="deletePeriodontalChartNote" />
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
import MenuBar from '@/components/basic/MenuBar'
import PeriodontalChartToothsTable from '@/components/patients/PeriodontalChartToothsTable'
import api from '../api'
import utility from '../library/utility'
import moment from 'moment'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import { mapState } from 'vuex'
import NoAccessPage from '@/components/basic/NoAccessPage'

export default {
    components: { MenuBar, PeriodontalChartToothsTable, DisplayError, Loading, NoAccessPage },

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
                    active: true
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
                id: 0,
                tooth_number: 0,
                patient_id: 0,
                measure1: 0,
                measure2: 0,
                measure3: 0,
                measure4: 0,
                measure5: 0,
                measure6: 0,
                created_at: null
            },

            notes: [],

            teeth: [],

            noteTitle: ''
        }
    },

    computed: {
        ...mapState(['userIsAdmin']),

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

        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getTeeth()
        this.getPeriodontalChartNotes()
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
                measure1: 0,
                measure2: 0,
                measure3: 0,
                measure4: 0,
                measure5: 0,
                measure6: 0,
                created_at: moment(new Date()).format('YYYY-MM-DD')
            }

            this.noteTitle = 'Εισαγωγή μετρήσεων'

            this.$refs.noteModal.show()
        },

        /**
		 * Save note
		 */
        saveNote (note) {
            if (this.note.id === 0) {
                this.createPeriodontalChartNote()
                return
            }

            this.updatePeriodontalChartNote()
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

            this.noteTitle = 'Ενημέρωση μετρήσεων'
            this.$refs.noteModal.show()
        },

        /**
         * Get all Periodontal Chart Notes
         */
        getPeriodontalChartNotes () {
            this.loading = true

            api.getPeriodontalChartNotes(this.patientId)
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
		 * Create a periodontal chart note
		 */
        createPeriodontalChartNote () {
            this.loading = true

            api.createPeriodontalChartNote(this.note)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Οι μετρήσεις αποθηκεύτηκαν'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getPeriodontalChartNotes()
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
		 * Update the Periodontal Chart Note
		 */
        updatePeriodontalChartNote () {
            this.loading = true

            api.updatePeriodontalChartNote(this.note, this.note.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Οι μετρήσεις ενημερώθηκαν'
                    this.response.status = true

                    this.$refs.noteModal.hide()

                    this.getPeriodontalChartNotes()
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
		 * Delete a Periodontal Chart Note
		 */
        deletePeriodontalChartNote () {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις τις μετρήσεις;')

            if (choise) {
                this.loading = true

                api.deletePeriodontalChartNote(this.note.id)
                    .then(response => {
                        this.loading = false

                        this.$refs.noteModal.hide()

                        this.response.message = 'Οι μετρήσεις διαγράφηκαν'
                        this.response.status = true

                        this.getPeriodontalChartNotes()
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
