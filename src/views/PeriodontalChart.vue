<template>
    <div class="container-fluid my-3">

        <b-modal ref="noteModal" size="md" centered hide-footer title="Εισαγωγή μετρήσεων">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="number1" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number1" type="number" class="form-control"
                               v-model="note.measurements[0].number" required>
                    </div>

                    <label for="number2" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number2" type="number" class="form-control"
                               v-model="note.measurements[1].number" required>
                    </div>

                    <label for="number3" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number3" type="number" class="form-control"
                               v-model="note.measurements[2].number" required>
                    </div>

                    <label for="number4" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number4" type="number" class="form-control"
                               v-model="note.measurements[3].number" required>
                    </div>

                    <label for="number5" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number5" type="number" class="form-control"
                               v-model="note.measurements[4].number" required>
                    </div>

                    <label for="number6" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number6" type="number" class="form-control"
                               v-model="note.measurements[5].number" required>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveNote">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Περιοδοντόγραμμα</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"
                      navCollapseText="patientBar" />


			<div>
				<div class="alert alert-warning w-100 mx-auto fixed-top" role="alert"
					 v-if="chozenNote.measurements">
					<div class="row col-lg-3 col-12 mx-auto">
						<span v-for="measurement in chozenNote.measurements" :key="measurement.id"
							  class="col-4 text-center">
							{{ measurement.number }}
						</span>
					</div>
				</div>

				<periodontal-chart-tooths-table :teeth="upperTeeth"
												:notes="notes"
												:newNoteFunction="newNote" />

				<periodontal-chart-tooths-table :teeth="downTeeth"
												:notes="notes"
												:newNoteFunction="newNote" />
			</div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import PeriodontalChartToothsTable from '@/components/patients/PeriodontalChartToothsTable'
import api from "../api";
import utility from "../library/utility";

export default {
    components: { MenuBar, PeriodontalChartToothsTable },

    data () {
        return {
            chozenNote: {},

            response: {
                message: '',
                status: '',
                errors: []
            },

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true
                }
            ],

            note: {
                toothId: 0,
                date: '',
                measurements: [
                    { id: 0, number: 0 },
                    { id: 1, number: 0 },
                    { id: 2, number: 0 },
                    { id: 3, number: 0 },
                    { id: 4, number: 0 },
                    { id: 5, number: 0 }
                ]
            },

			notes: [
				{
					id: 1,
					tooth_number: 18,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 2,
					tooth_number: 18,
					patient_id: 1,
					measure1: 1,
					measure2: 0,
					measure3: 0,
					measure4: 2,
					measure5: 3,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 3,
					tooth_number: 18,
					patient_id: 1,
					measure1: 0,
					measure2: 3,
					measure3: 0,
					measure4: 3,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 4,
					tooth_number: 17,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 5,
					tooth_number: 17,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 6,
					tooth_number: 17,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 7,
					tooth_number: 16,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 8,
					tooth_number: 16,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 9,
					tooth_number: 16,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 10,
					tooth_number: 15,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 11,
					tooth_number: 15,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 12,
					tooth_number: 14,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 13,
					tooth_number: 14,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 14,
					tooth_number: 13,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 15,
					tooth_number: 12,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 16,
					tooth_number: 11,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 17,
					tooth_number: 21,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 18,
					tooth_number: 21,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 19,
					tooth_number: 22,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 20,
					tooth_number: 23,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 21,
					tooth_number: 24,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 22,
					tooth_number: 25,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 23,
					tooth_number: 26,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 24,
					tooth_number: 26,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 25,
					tooth_number: 27,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 26,
					tooth_number: 28,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 27,
					tooth_number: 48,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 28,
					tooth_number: 47,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 29,
					tooth_number: 47,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 30,
					tooth_number: 46,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 31,
					tooth_number: 45,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 32,
					tooth_number: 44,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 33,
					tooth_number: 43,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 34,
					tooth_number: 42,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 35,
					tooth_number: 41,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 36,
					tooth_number: 41,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 37,
					tooth_number: 31,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 38,
					tooth_number: 32,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 39,
					tooth_number: 32,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 40,
					tooth_number: 33,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 41,
					tooth_number: 34,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 42,
					tooth_number: 35,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 43,
					tooth_number: 36,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 44,
					tooth_number: 36,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 45,
					tooth_number: 36,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 46,
					tooth_number: 37,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 47,
					tooth_number: 38,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				},
				{
					id: 48,
					tooth_number: 38,
					patient_id: 1,
					measure1: 0,
					measure2: 0,
					measure3: 0,
					measure4: 0,
					measure5: 0,
					measure6: 0,
					created_at: '21/01/2019'
				}
			],

            teeth: []
        }
    },

    computed: {
        upperTeeth () {
            return this.teeth.filter((tooth) => {
                return tooth.number <= 28
            })
        },

        downTeeth () {
            return this.teeth.filter((tooth) => {
                return tooth.number > 28
            })
        },

        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getTeeth()
    },

    methods: {

        /**
         * Display note modal
         */
        newNote (data) {
        	console.log(data)
            this.$refs.noteModal.show()
        },

        saveNote () {
            alert('Saving measurements...')
        },

        /**
         * Display note's description on alert box
         * @param obj
         */
        displayNote (obj) {
            let tooth = this.tooths.find((tooth) => tooth.id === obj.toothId)
            this.chozenNote = tooth.notes.find((note) => note.id === obj.noteId)
        },

        /**
         * Hide the note alert box
         */
        hideNote () {
            this.chozenNote = {}
        },

        /**
         * Get all teeth
         */
        getTeeth ()
        {
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
        }
    }
}
</script>
