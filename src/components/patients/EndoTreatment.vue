<template>

	<div>

		<div class="row">
			<teeth-list class="mb-2 mx-auto"
						:teeth="haveTeeth"
						:newEndoTreatmentCard="newEndoTreatment" />
		</div>

		<div class="input-group row mb-2 mx-auto col-lg-7 col-12">
			<div class="col-12">
				<div class="input-group-text row">
					<label for="chozenRoot" class="my-auto">Ρίζες</label>
				</div>
			</div>

			<select class="form-control col-12" id="chozenRoot"
					multiple
					v-model="chozenRoots"
					@change="getEndoTreatment">
				<option v-for="root in roots"
						:key="root.id"
						:value="root.id">
					{{ root.name }}
				</option>
			</select>

			<div class="col-12 text-center">
				<small class="text-info mx-auto">Με πατημένο το ctrl, γίνεται πολλαπλή επιλογή</small>
			</div>
		</div>

		<div class="container col-lg-7 col-12 mt-3"
			 v-for="chozenRoot in chozenRoots" :key="chozenRoot">

			<div class="card mb-2 w-100 mx-auto" v-if="endoTreatments[chozenRoot]">
				<div class="card-header text-center">
					<h3>{{ roots[chozenRoot-1].name }}</h3>
				</div>

				<div class="card-body">

					<div class="card mb-2 w-100 mx-auto">
						<div class="card-header">
							<span>Μήκος εργαλείου</span>
						</div>

						<div class="card-body">

							<div class="container">
								<div class="input-group row mb-2 mx-auto col-lg-4 col-12">
									<div class="input-group-prepend">
										<div class="input-group-text ">
											<label for="tooth_number" class="my-auto">Επιλογή δοντιού</label>
										</div>
									</div>

									<select class="form-control" id="tooth_number"
											v-model="endoTreatments[chozenRoot].tooth_number">
										<option v-for="tooth in teeth"
												:key="tooth.id"
												:value="tooth.number"
												:selected="(tooth.number === endoTreatments[chozenRoot].tooth_number) ? 'selected' : ''">
											{{ tooth.number }}
										</option>
									</select>
								</div>
							</div>

							<div class="input-group mb-2">
								<div class="input-group-prepend">
									<div class="input-group-text">
										<label for="counter" class="my-auto">Μετρητής</label>
									</div>
								</div>
								<input id="counter" type="text" class="form-control"
									   v-model="endoTreatments[chozenRoot].counter" maxlength="10">
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
									   v-model="endoTreatments[chozenRoot].radiography" maxlength="10">
								<form-error v-if="response.errors.radiography"
											:error="response.errors.radiography[0]"/>
							</div>
						</div>

					</div>

					<div class="input-group row mb-2 mx-auto">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label for="workingLength" class="my-auto">Μήκος εργασίας</label>
							</div>
						</div>

						<input id="workingLength" type="text" class="form-control"
							   v-model="endoTreatments[chozenRoot].workingLength" maxlength="10">
						<form-error v-if="response.errors.workingLength"
									:error="response.errors.workingLength[0]"/>
					</div>

					<div class="input-group row mb-2 mx-auto">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label for="benchmark" class="my-auto">Σημείο αναφοράς</label>
							</div>
						</div>

						<input id="benchmark" type="text" class="form-control"
							   v-model="endoTreatments[chozenRoot].benchmark" maxlength="20">

						<select class="form-control" id="chozenBenchmark"
								v-model="endoTreatments[chozenRoot].benchmark_id">
							<option v-for="benchmark in endoTreatments[chozenRoot].benchmarks"
									:key="benchmark.id"
									:value="benchmark.id"
									:selected="(benchmark.id === endoTreatments[chozenRoot].benchmark_id) ? 'selected' : ''">
								{{ benchmark.name }}
							</option>
						</select>

						<form-error v-if="response.errors.benchmark"
									:error="response.errors.benchmark[0]"/>
					</div>

					<div class="input-group row mb-2 mx-auto">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label for="MAF" class="my-auto">MAF</label>
							</div>
						</div>

						<input id="MAF" type="text" class="form-control"
							   v-model="endoTreatments[chozenRoot].MAF" maxlength="10">
						<form-error v-if="response.errors.MAF"
									:error="response.errors.MAF[0]"/>
					</div>

					<div class="input-group row mb-2 mx-auto">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label for="chemicalMechanicalTreatment"
									   class="my-auto">Χημικομηχανική επεξεργασία</label>
							</div>
						</div>

						<input id="chemicalMechanicalTreatment" type="text" class="form-control"
							   v-model="endoTreatments[chozenRoot].chemicalMechanicalTreatment" maxlength="10">
						<form-error v-if="response.errors.chemicalMechanicalTreatment"
									:error="response.errors.chemicalMechanicalTreatment[0]"/>
					</div>

					<div class="input-group row mb-2 mx-auto">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<label for="chozenBlockingTechnique" class="my-auto">Τεχνική έφραξης</label>
							</div>
						</div>

						<select class="form-control" id="chozenBlockingTechnique"
								v-model="endoTreatments[chozenRoot].blocking_technique_id">
							<option v-for="blockingTechnique in endoTreatments[chozenRoot].blockingTechniques"
									:key="blockingTechnique.id"
									:value="blockingTechnique.id"
									:selected="(blockingTechnique.id === endoTreatments[chozenRoot].blocking_technique_id) ? 'selected' : ''">
								{{ blockingTechnique.name }}
							</option>
						</select>
					</div>

					<div class="row">
						<input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
							   @click="updateEndoTreatment(chozenRoot)" value="Αποθήκευση">
					</div>

				</div>
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
import utility from '../../library/utility'
import api from '../../api'
import DisplayError from '@/components/basic/DisplayError'
import TeethList from '@/components/patients/TeethList'

export default {
    components: { FormError, DisplayError, TeethList },

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

            endoTreatment: {
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
			},

            chozenRoots: [],

			teeth: [],

			haveTeeth: {}
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
				// TODO εδώ φορτώνει τα roots για το συγκεκριμένο δόντι
				this.endoTreatment = this.endoTreatments[this.selectedTooth.endoTreatmentIndex]
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
		saveData () {
			if (this.endoTreatment.id === 0) {
				this.createEndoTreatment()

				return
			}

			this.updateEndoTreatment()
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
			 * Get Endo Treatment info
			 */
        getEndoTreatment () {
			this.loading = true

			this.endoTreatments = {}

			this.chozenRoots.forEach(async chozenRoot => {
				await api.getEndoTreatment(this.patientId, chozenRoot)
					.then(response => {
						if (response.status === 200) {
							this.loading = false

							this.$set(this.endoTreatments, chozenRoot, response.data)
						}
					})
					.catch(error => {
						this.loading = false

						this.response.message = error.response.data.message
						this.response.status = false

						utility.debug(error.response.data.debug)
					})
			})
        },

		/**
		 * Create an endo treatment
		 */
		createEndoTreatment () {
			this.loading = true

			this.endoTreatment.patient_id = this.patientId

			api.createEndoTreatment(this.endoTreatment)
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
			 */
        updateEndoTreatment (chozenRoot) {
            this.loading = true

            api.updateEndoTreatment(this.endoTreatments[chozenRoot], this.endoTreatments[chozenRoot].id)
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
