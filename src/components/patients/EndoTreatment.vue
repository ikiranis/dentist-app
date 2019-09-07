<template>

	<div>

		<div class="row">
			<teeth-list class="mb-2 mx-auto"
						:teeth="haveTeeth"
						:newEndoTreatmentCard="newEndoTreatment" />
		</div>

		<div class="container col-lg-7 col-12 mt-3"
			 v-for="treatment in selectedEndoTreatments" :key="treatment.id"
			 v-if="!displayInsertNew">

			<endo-treatment-form :treatment="treatment"
								 :response="response"
								 :roots="roots"
								 :teeth="teeth"
								 :saveData="saveData" />

		</div>

		<div class="container col-lg-7 col-12 mt-3"
			 v-if="displayInsertNew">

			<endo-treatment-form :treatment="endoTreatment"
								 :response="response"
								 :roots="roots"
								 :teeth="teeth"
								 :saveData="saveData" />
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
import utility from '../../library/utility'
import api from '../../api'
import DisplayError from '@/components/basic/DisplayError'
import TeethList from '@/components/patients/TeethList'
import EndoTreatmentForm from '@/components/patients/EndoTreatmentForm'

export default {
    components: { FormError, DisplayError, TeethList, EndoTreatmentForm },

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

			teeth: [],

			haveTeeth: {},

			displayInsertNew: false
        }
    },

    computed: {
        patientId: function () {
            return this.$route.params.id
        },

		// Find the tooth with display (true)
		selectedTooth: function () {
			return Object.values(this.haveTeeth).find((tooth) => {
				return tooth.display
			})
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
				this.displayInsertNew = false
				this.getEndoTreatmentsForTooth()
			}
		}
    },

    created: function () {
		this.getTeeth()
        this.getRoots()
		this.getEndoTreatments()
    },

    methods: {
		/**
		 * Create or update data
		 */
		saveData (endoTreatment) {
			console.log(endoTreatment)
			if (endoTreatment.id === 0) {
				this.createEndoTreatment(endoTreatment)
				console.log('insert')
				return
			}

			console.log('update')
			this.updateEndoTreatment(endoTreatment)
		},

		// Filter endo treatments and get only those with chosen tooth number
		getEndoTreatmentsForTooth() {
			this.selectedEndoTreatments = this.endoTreatments.filter(item => {
				return item.tooth_number === this.selectedTooth.number
			})
		},

		/**
		 * Get all endo treatments for patientId
		 */
		getEndoTreatments () {
			this.loading = true

			api.getEndoTreatments(this.patientId)
				.then(response => {
					this.loading = false

					if (response.status === 200) {
						this.endoTreatments = response.data
						this.endoTreatment = {}

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

					this.endoTreatment = {}
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
		deleteEndoTreatment () {
			let choise = confirm('Θέλεις σίγουρα να σβήσεις τα δεδομένα;')

			if (choise) {
				this.loading = true

				api.deleteEndoTreatment(this.endoTreatment.id)
					.then(response => {
						this.loading = false

						this.response.message = 'Τα δεδομένα διαγράφηκαν'
						this.response.status = true

						this.getEndoTreatments()
						this.newEndoTreatment()
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

		// Reset all values for new card
		newEndoTreatment () {
			this.resetEndoTreatment()
			this.displayInsertNew = true
		},

		// Reset values of endoTreatment
		resetEndoTreatment () {
			this.endoTreatment = {
				id: 0,
				root_id: 0,
				tooth_number: 18,
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
