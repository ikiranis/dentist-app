<template>
	<div class="container">

		<div class="col-lg col-12 row fixed-bottom mb-5">
			<Loading class="mx-auto" :loading="loading"/>
		</div>

		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card card-default">
					<div class="card-header">Reset Password</div>
					<div class="card-body">
						<form>
							<div class="form-group row">
								<label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
								<div class="col-md-6">
									<input id="email" type="email" class="form-control" v-model="userInfo.email"
										   required data-lpignore="true" readonly onfocus="this.removeAttribute('readonly');">
									<form-error v-if="response.errors.email" :error="response.errors.email[0]"/>
								</div>
							</div>
							<div class="form-group row">
								<label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
								<div class="col-md-6">
									<input id="password" type="password" class="form-control"
										   v-model="userInfo.password" required data-lpignore="true"
										   readonly onfocus="this.removeAttribute('readonly');">
									<form-error v-if="response.errors.password" :error="response.errors.password[0]"/>
								</div>
							</div>
							<div class="form-group row">
								<label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm
									Password</label>
								<div class="col-md-6">
									<input id="password-confirm" type="password" class="form-control"
										   v-model="password_confirmation" required data-lpignore="true">
								</div>
							</div>
							<div class="form-group row mb-0">
								<div class="col-md-8 ml-auto mr-auto">
									<button type="submit" class="btn btn-primary w-100" @click.prevent="resetPassword">
										Reset Password
									</button>
								</div>
							</div>
						</form>
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
	import api from "../api";
	import DisplayError from "@/components/basic/DisplayError";
	import FormError from "@/components/basic/FormError";
	import Loading from "@/components/basic/Loading";

	export default {
		components: {Loading, DisplayError, FormError},
		data: () => ({
			loading: false,

			response: {
				message: ' ',
				status: '',
				errors: []
			},

			userInfo: {
				email: '',
				password: ''
			},

			password_confirmation: ''
		}),

		computed: {
			token: function() {
				return this.$route.params.token;
			}
		},

		methods: {
			/**
			 * Update user's info
			 */
			resetPassword() {
				if (this.userInfo.password === undefined || this.userInfo.password === this.password_confirmation) {
					let args = {
						email: this.userInfo.email,
						password: this.userInfo.password,
						password_confirmation: this.password_confirmation,
						token: this.token
					};

					this.loading = true

					api.resetPassword(args)
						.then((response) => {
							this.response.message = response.message;
							this.response.status = true;

							this.loading = false

							this.$router.push({name: 'home'});
						})
						.catch(error => {
							this.response.message = error.response.data.message;
							this.response.status = false;

							if (error.response.data.errors) {
								this.response.errors = error.response.data.errors;
							}

							this.loading = false
						});
				} else {
					this.response.message = 'Passwords not validated';
					this.response.status = false;

					this.loading = false
				}
			},
		}
	}
</script>
