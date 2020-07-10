<template>
	<div class="container-fluid my-3">
		<div class="row justify-content-center">

			<div class="col-12">
				<h1>Backup</h1>
			</div>

			<div class="col-lg col-12 row fixed-bottom mb-5">
				<Loading class="mx-auto" :loading="loading"/>
			</div>

			<div class="container">

				<div class="col-12">
					<div class="row">
						<input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
							   @click="startBackup" value="Εναρξη backup">
					</div>
				</div>

				<div class="col-12 mt-5">
					<div class="row">
						<div class="custom-file form-group my-3 col-lg-6 col-12 mx-auto">
							<input type="file" class="custom-file-input"
								   name="uploadFile" id="uploadFile"
								   accept=".zip" @change="getFile">
							<label class="custom-file-label"
								   for="uploadFile">Αρχείο zip</label>

							<form-error v-if="response.errors.file"
										:error="response.errors.file[0]"/>
						</div>
					</div>
				</div>

				<div class="col-12">
					<div class="row">
						<input type="submit" class="btn btn-danger col-md-6 col-12 my-3 mx-auto"
							   @click="startRestore" value="Εναρξη restore">
					</div>
				</div>

				<div class="row fixed-bottom mb-2">
					<display-error class="mx-auto"
								   v-if="response.message"
								   :response="response"/>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import DisplayError from '@/components/basic/DisplayError'
	import Loading from '@/components/basic/Loading'
	import api from '../api'
	import utility from '../library/utility'
	import {base64StringToBlob} from 'blob-util'

	export default {
		components: {DisplayError, Loading},

		data() {
			return {
				loading: false,

				response: {
					message: ' ',
					status: '',
					errors: []
				},

				file: ''
			}
		},

		methods: {
			startBackup() {
				this.loading = true

				api.startBackup()
					.then(response => {
						this.loading = false

						const url = window.URL.createObjectURL(new Blob([
							base64StringToBlob(response.data.content, response.headers['content-type'])
						]))

						const link = document.createElement('a')

						link.href = url
						link.setAttribute('download', response.data.filename)
						document.body.appendChild(link)

						link.click()
					})
					.catch(error => {
						this.loading = false

						this.response.message = error.response.data.message
						this.response.status = false

						utility.debug(error.response.data.debug)
					})
			},

			getFile(event) {
				this.file = event.target.files[0]

				console.log('File uploaded')
			},

			startRestore(event) {
				let formData = new FormData()
				formData.append('file', this.file)
				this.loading = true
				api.startRestore(formData)
					.then(response => {
						console.log(response)
						this.response.message = "Η ανάκτηση δεδομένων ολοκληρώθηκε..."
						this.response.status = true
						this.loading = false
					})
					.catch(error => {
						this.response.message = 'Υπάρχει πρόβλημα'

						console.log(error.response)
						this.response.status = false
						this.response.errors = error.response.data.errors
						this.loading = false
					})
			}
		}
	}
</script>
