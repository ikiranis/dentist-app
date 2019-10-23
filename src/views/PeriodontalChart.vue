<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

        <b-modal ref="noteModal" size="md" centered hide-footer :title="noteTitle">

            <form @submit.prevent class="container-fluid">

				<div class="form-group row">
					<label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
					<div class="col-md-8">
						<input id="date" type="date" class="form-control"
							   v-model="note.created_at">
						<form-error v-if="response.errors.created_at" :error="response.errors.created_at[0]"/>
					</div>
				</div>

				<div class="form-group row">
					<label for="data1" class="col-md-4 col-form-label text-md-right">Μέτρηση</label>
					<div class="col-md-8">
						<input id="data1" type="text" maxlength="10" class="form-control"
							   v-model="note.data1">
						<form-error v-if="response.errors.data1" :error="response.errors.data1[0]"/>
					</div>
				</div>

				<div class="form-group row">
					<label for="data2" class="col-md-4 col-form-label text-md-right">Μέτρηση</label>
					<div class="col-md-8">
						<input id="data2" type="text" maxlength="10" class="form-control"
							   v-model="note.data2">
						<form-error v-if="response.errors.data2" :error="response.errors.data2[0]"/>
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

		<menu-bar v-if="!readOnly"
                  brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="md"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

			<div class="container row" v-for="kind in 2" :key="kind">
					<div class="row col-12">
						<h3 class="mx-auto">{{ kind === 1 ? 'Προστομιακά' : 'Γλωσσικά-υπερώρια' }}</h3>
					</div>

					<periodontal-chart-tooths-table v-if="!loading"
													class="mx-auto"
													:kind="kind-1"
													:teeth="upperTeeth"
													:notes="upperNotes"
													:newNote="newNote"
													:updateNote="getNote"
													:deleteNote="deletePeriodontalChartNote" />

					<periodontal-chart-tooths-table v-if="!loading"
													class="mx-auto"
													:kind="kind-1"
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
import FormError from '@/components/basic/FormError'
import api from '../api'
import utility from '../library/utility'
import moment from 'moment'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import { mapState } from 'vuex'
import NoAccessPage from '@/components/basic/NoAccessPage'

export default {
    components: { MenuBar, FormError, PeriodontalChartToothsTable, DisplayError, Loading, NoAccessPage },

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
                created_at: null,
                kind: null,
                data1: null,
                data2: null
            },

            notes: [],

            teeth: [],

            noteTitle: ''
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
        newNote (tooth, kind) {
            this.note = {
                id: 0,
                tooth_number: tooth.number,
                patient_id: this.patientId,
                created_at: moment(new Date()).format('YYYY-MM-DD'),
                kind: kind,
                data1: null,
                data2: null
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
            note.created_at = moment(note.created_at).format('YYYY-MM-DD')
            this.note = note

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
