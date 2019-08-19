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

        <div class="col-12 text-center">
            <h1>Ενδοδοντική θεραπεία</h1>
        </div>

        <FieldsList :fields="fields"/>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!fieldSelected">
            Επιλογή πεδίων
        </div>

        <form @submit.prevent class="container col-lg-7 col-12 mt-3">

            <div class="input-group row mb-2 mx-auto">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chozenRoot" class="my-auto">Ρίζες</label>
                    </div>
                </div>

                <select class="form-control" id="chozenRoot" v-model="endoTreatment.root_id">
                    <option v-for="root in endoTreatment.roots"
                            :key="root.id"
                            :value="root.id"
							:selected="(root.id === endoTreatment.root_id) ? 'selected' : ''">{{ root.name }}</option>
                </select>
            </div>

            <div class="card mb-2 w-100 mx-auto" v-if="fields.counter.display">
                <div class="card-header">
                    <span>Μήκος εργαλείου</span>

                    <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                          @click="removeField(fields.counter)"/>
                </div>

                <div class="card-body">

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <label for="counter" class="my-auto">Μετρητής</label>
                            </div>
                        </div>

                        <input id="counter" type="text" class="form-control"
                               v-model="endoTreatment.counter" maxlength="10">
                        <form-error v-if="response.errors.counter"
                                    :error="response.errors.counter[0]"/>
                    </div>

                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <label for="radiography" class="my-auto">Ακτινογραφία</label>
                            </div>
                        </div>

                        <input id="radiography" type="text" class="form-control"
                               v-model="endoTreatment.radiography" maxlength="10">
                        <form-error v-if="response.errors.radiography"
                                    :error="response.errors.radiography[0]"/>
                    </div>
                </div>

            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.workingLength.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="workingLength" class="my-auto">Μήκος εργασίας</label>
                    </div>
                </div>

                <input id="workingLength" type="text" class="form-control"
                       v-model="endoTreatment.workingLength" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.workingLength)"/>
                <form-error v-if="response.errors.workingLength"
                            :error="response.errors.workingLength[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.benchmark.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="benchmark" class="my-auto">Σημείο αναφοράς</label>
                    </div>
                </div>

                <input id="benchmark" type="text" class="form-control"
                       v-model="endoTreatment.benchmark" maxlength="20">

                <select class="form-control" id="chozenBenchmark" v-model="endoTreatment.benchmark_id">
                    <option v-for="benchmark in endoTreatment.benchmarks"
                            :key="benchmark.id"
                            :value="benchmark.id"
							:selected="(benchmark.id === endoTreatment.benchmark_id) ? 'selected' : ''">{{ benchmark.name }}
                    </option>
                </select>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.benchmark)"/>
                <form-error v-if="response.errors.benchmark"
                            :error="response.errors.benchmark[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.MAF.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="MAF" class="my-auto">MAF</label>
                    </div>
                </div>

                <input id="MAF" type="text" class="form-control"
                       v-model="endoTreatment.MAF" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.MAF)"/>
                <form-error v-if="response.errors.MAF"
                            :error="response.errors.MAF[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.chemicalMechanicalTreatment.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chemicalMechanicalTreatment" class="my-auto">Χημικομηχανική επεξεργασία</label>
                    </div>
                </div>

                <input id="chemicalMechanicalTreatment" type="text" class="form-control"
                       v-model="endoTreatment.chemicalMechanicalTreatment" maxlength="10">
                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.chemicalMechanicalTreatment)"/>
                <form-error v-if="response.errors.chemicalMechanicalTreatment"
                            :error="response.errors.chemicalMechanicalTreatment[0]"/>
            </div>

            <div class="input-group row mb-2 mx-auto" v-if="fields.blockingTechnique.display">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <label for="chozenBlockingTechnique" class="my-auto">Τεχνική έφραξης</label>
                    </div>
                </div>

                <select class="form-control" id="chozenBlockingTechnique" v-model="endoTreatment.blocking_technique_id">
					<option v-for="blockingTechnique in endoTreatment.blockingTechniques"
							:key="blockingTechnique.id"
							:value="blockingTechnique.id"
							:selected="(blockingTechnique.id === endoTreatment.blocking_technique_id) ? 'selected' : ''">{{ blockingTechnique.name }}
					</option>
                </select>

                <minus-circle-outline class="removeItem my-auto ml-2" title="Αφαίρεση πεδίου"
                                      @click="removeField(fields.blockingTechnique)"/>
            </div>

            <div v-if="fields.notes.display">

                <notes-list :notes="endoTreatment.notes"
							@clickDelete="deleteTreatmentNote"
							@clickUpdate="getTreatmentNote" />

                <div class="row" v-if="!loading">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="newNote" value="Εισαγωγή σημείωσης">
                </div>

            </div>

        </form>

        <div class="row" v-if="fieldSelected">
            <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                   @click="updateEndoTreatment" value="Αποθήκευση">
        </div>

        <display-error v-if="response.message" :response="response"/>

    </div>

</template>

<script>
import FormError from '@/components/basic/FormError'
import FieldsList from '@/components/patients/FieldsList'
import NotesList from '@/components/patients/NotesList'
import utility from "../../library/utility";
import api from "../../api";
import DisplayError from '@/components/basic/DisplayError'
import moment from 'moment'

export default {
    components: { FormError, FieldsList, DisplayError, NotesList },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            fields: {
                counter: {
                    label: 'Μήκος εργαλείου',
                    display: false
                },
                workingLength: {
                    label: 'Μήκος εργασίας',
                    display: false
                },
                benchmark: {
                    label: 'Σημείο αναφοράς',
                    display: false
                },
                MAF: {
                    label: 'MAF',
                    display: false
                },
                chemicalMechanicalTreatment: {
                    label: 'Χημικομηχανική επεξεργασία',
                    display: false
                },
                blockingTechnique: {
                    label: 'Τεχνική έμφραξης',
                    display: false
                },
                notes: {
                    label: 'Σημειώσεις',
                    display: false
                }
            },

            endoTreatment: {
            	root_id: 0,
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
				blockingTechniques: [],
                notes: []
            },

            note: {
                id: 0,
                patient_id: 0,
                date: null,
                description: null
            },

			noteTitle: ''

        }
    },

    computed: {
        // Find if any field is selected. True if any
        fieldSelected () {
            return Object.values(this.fields).find((field) => {
                return field.display
            })
        },

        patientId: function () {
            return this.$route.params.id
        }
    },

    watch: {
        loading() {
            this.$emit('loading', this.loading)
        }
    },

    created: function () {
        this.getEndoTreatment()
    },

    methods: {
        /**
         * Get Endo Treatment info
         */
        getEndoTreatment ()
        {
            this.loading = true

            api.getEndoTreatment(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatment = response.data

                        this.checkFields()
                    }
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Update the Endo Treatment info
         */
        updateEndoTreatment ()
        {
            this.loading = true

            api.updateEndoTreatment(this.endoTreatment, this.patientId)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Τα δεδομένα αποθηκεύτηκαν'
                    this.response.status = true
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
         * Check for fields. If not empty, display it
         */
        checkFields ()
        {
            Object.keys(this.endoTreatment).forEach(key => {
                if (this.endoTreatment[key] === null || this.endoTreatment[key].length<1) {
                    return
                }

                if (this.fields[key] === undefined) {
                    return
                }

                this.fields[key].display = true
            })
        },

        /**
         * Εξαφάνιση του πεδίου
         *
         * @param field
         */
        removeField (field)
        {
            field.display = false
        },

        /**
         * Get all treatment notes for patientId
         */
        getTreatmentNotes()
        {
            this.loading = true

            api.getTreatmentNotes(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.endoTreatment.notes = response.data

                        return
                    }

                    this.endoTreatment.notes = []
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
			this.note = this.endoTreatment.notes.find((note) => {
				return note.id === treatmentNoteId
			})

			this.noteTitle = 'Ενημέρωση σημείωσης'
			this.$refs.noteModal.show()
		},

        /**
         * Create a note
         */
        createTreatmentNote ()
        {
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
        updateTreatmentNote ()
        {
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
        saveNote ()
        {
            if (this.note.id === 0) {
                this.createTreatmentNote()
                return
            }

            this.updateTreatmentNote()
        },

        /**
         * Display note modal
         */
        newNote ()
        {
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
