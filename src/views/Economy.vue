<template>
	<div class="container-fluid my-3">

		<b-modal ref="transactionModal" size="md" centered hide-footer :title="transactionTitle">

			<form class="container-fluid">

				<div class="form-group row">
					<label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
					<div class="col-md-8">
						<input id="date" type="date" class="form-control"
							   v-model="transaction.date">
						<form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
					</div>
				</div>

				<div class="form-group row">
					<label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
					<div class="col-md-8">
						<input id="description" type="text" class="form-control"
							   v-model="transaction.description" required>
						<form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
					</div>
				</div>

				<div class="form-group row">
					<label for="value" class="col-md-4 col-form-label text-md-right">Ποσό</label>
					<div class="col-md-8">
						<input id="value" type="number" class="form-control"
							   v-model="transaction.value" required>
						<form-error v-if="response.errors.value" :error="response.errors.value[0]"/>
					</div>
				</div>

				<div class="form-group row">
					<label for="patient" class="col-md-4 col-form-label text-md-right">Ασθενής</label>
					<div class="col-md-8">
						<select class="form-control" id="patient" v-model="transaction.patient_id">
							<option v-for="patient in patients"
									:key="patient.id"
									:value="patient.id"
									:selected="(transaction.patient_id === patient.id) ? 'selected' : ''">
								{{ patient.fullName }}
							</option>
						</select>
					</div>
				</div>

				<div class="row">
					<button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveTransaction">Εισαγωγή
					</button>
				</div>

			</form>

		</b-modal>

		<div class="row justify-content-center">

			<div class="col-12">
				<h1>Οικονομικά</h1>
			</div>

			<!-- Αναζήτηση -->
			<div class="row col-12 mx-auto">
				<div class="form-group row col-md-4 col-12">
					<label for="dateFrom" class="col-md-4 col-form-label text-md-right">Από</label>
					<div class="col-md-8">
						<input id="dateFrom" type="date" class="form-control"
							   v-model="dateFrom">
						<form-error v-if="response.errors.dateFrom" :error="response.errors.dateFrom[0]"/>
					</div>
				</div>

				<div class="form-group row col-md-4 col-12">
					<label for="dateTo" class="col-md-4 col-form-label text-md-right">Μέχρι</label>
					<div class="col-md-8">
						<input id="dateTo" type="date" class="form-control"
							   v-model="dateTo">
						<form-error v-if="response.errors.dateTo" :error="response.errors.dateTo[0]"/>
					</div>
				</div>

				<div class="col-md-4 col-12 ">
					<input type="submit" class="btn btn-small btn-success w-100" value="Αναζήτηση">
				</div>
			</div>

			<div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!transactions.length">
				Δεν βρέθηκαν οικονομικές κινήσεις
			</div>

			<div class="w-100">
				<paginate :pagination="pagination" @click="getTransactions"/>
			</div>

			<!-- Λίστες εσόδων/εξόδων -->
			<div class="container row" v-if="transactions.length">

				<div class="col-lg-6 col-12">

					<div class="col-12 text-center">
						<h3>Έσοδα</h3>

						<financial-list :transactions="income"
										@clickDelete="deleteTransaction"
										@clickUpdate="getTransaction" />

					</div>

				</div>

				<div class="col-lg-6 col-12">

					<div class="col-12 text-center">
						<h3>Έξοδα</h3>

						<financial-list :transactions="expenses"
										@clickDelete="deleteTransaction"
										@clickUpdate="getTransaction" />

					</div>

				</div>

			</div>

			<!-- Κουμπιά εισαγωγής -->
			<div class="container row">

				<div class="col-lg-6 col-12">
					<div class="row">
						<input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
							   @click="newTransaction(0)" value="Εισαγωγή εσόδου">
					</div>
				</div>

				<div class="col-lg-6 col-12">
					<div class="row">
						<input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
							   @click="newTransaction(1)" value="Εισαγωγή εξόδου">
					</div>
				</div>

			</div>

			<div class="w-100">
				<paginate :pagination="pagination" @click="getTransactions"/>
			</div>

		</div>
	</div>
</template>

<script>
	import api from "../api";
	import FormError from '@/components/basic/FormError'
	import FinancialList from '@/components/economy/FinancialList.vue'
	import Paginate from '@/components/basic/Paginate'


	export default {
		components: { FormError, FinancialList, Paginate },

		data() {
			return {

				dateFrom: '',
				dateTo: '',

				response: {
					message: '',
					status: '',
					errors: []
				},

				pagination: {
					meta: {},
					links: {}
				},

				transaction: {
					id: 0,
					patient_id: 0,
					patient_name: '',
					date: '',
					description: '',
					value: 0,
					kind: 0
				},

				transactions: [],

				patients: [],

				transactionTitle: ''
			}
		},

		computed: {
			income() {
				return this.transactions.filter((transaction) => {
					return transaction.kind === 0
				})
			},

			expenses() {
				return this.transactions.filter((transaction) => {
					return transaction.kind === 1
				})
			}
		},

		created: function () {
			this.getTransactions(null)
			this.getSimplePatients()
		},

		methods: {

			/**
			 * Get all the transactions
			 *
			 * @param page
			 */
			getTransactions(page) {
				this.loading = true

				api.getTransactions(page, this.search)
					.then(response => {
						this.loading = false

						if (response.status === 200) {
							this.transactions = response.data.data
							this.pagination.meta = response.data.meta
							this.pagination.links = response.data.links

							window.scrollTo(0, 0)

							return
						}

						this.transactions = []
					})
					.catch(error => {
						this.loading = false

						console.log(error)
						this.response.message = error.response.data.message
						this.response.status = false

						utility.debug(error.response.data.debug)
					})
			},

			/**
			 * Display transaction for edit
			 */
			getTransaction (transactionId) {
				this.transaction = this.transactions.find((transaction) => {
					return transaction.id === transactionId
				})

				this.$refs.transactionModal.show()
			},

			/**
			 * Display transaction modal
			 *
			 * @param kind
			 */
			newTransaction(kind) {
				this.transaction = { id: 0, kind: kind }
				this.transactionTitle = (kind === 0) ? 'Εισαγωγή εσόδου' : 'Εισαγωγή εξόδου'
				this.$refs.transactionModal.show()
			},

			saveTransaction() {
				//
			},

			/**
			 * Delete a transaction
			 */
			deleteTransaction (transactionId) {
				let choise = confirm('Θέλεις σίγουρα να σβήσεις την κίνηση με id: ' + transactionId + ';')

				if (choise) {
					this.loading = true

					api.deleteTransaction(transactionId)
						.then(response => {
							this.loading = false

							this.getTransactions(null)
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
			 * Get the simple list of patients
			 */
			getSimplePatients () {
				api.getSimplePatients()
					.then(response => {
						if (response.status === 200) {
							this.patients = response.data

							return
						}

						this.patients = []
					})
					.catch(error => {
						this.loading = false

						this.response.message = error.response.data.message
						this.response.status = false

						utility.debug(error.response.data.debug)
					})
			},
		}
	}
</script>
