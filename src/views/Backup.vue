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
						<div class="custom-file col-md-6 col-12 mb-1 mx-auto">
							<label class="custom-file-label" for="file">Επιλογή αρχείου</label>
							<input type="file" class="custom-file-input" name="file" id="file"
								   accept="zip" required @change="uploadFile">

							<form-error v-if="response.errors.filename" :error="response.errors.filename[0]"/>
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
				}
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

			startRestore() {
				alert('RESTORE')
			}
		}
	}
</script>
