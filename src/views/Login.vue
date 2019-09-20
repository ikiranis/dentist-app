<template>
    <div class="container">

		<div class="col-lg col-12 row fixed-bottom mb-5">
			<Loading class="mx-auto" :loading="loading"/>
		</div>

        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="credentials.username"
                                           required autofocus data-lpignore="true">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control"
                                           v-model="credentials.password" required data-lpignore="true">
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <input id="login" type="submit" class="btn btn-primary w-100" @click.prevent="login" value="Login">
                                </div>
                            </div>

                            <div class="row">
                                <router-link to="/forgotPassword" class="nav-link mx-auto">Forgot Password</router-link>
                            </div>

                            <div class="row">
                                <span class="btn btn-info my-3 mx-auto" @click="displayRegister">Εγγραφή</span>
                            </div>

                        </form>
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
import api from '@/api'
import user from '@/library/user'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'

export default {
    components: { Loading, DisplayError },

    data: () => ({
        response: {
            message: ' ',
            status: '',
            errors: []
        },
        credentials: {
            username: '',
            password: ''
        },
        loading: false
    }),

    methods: {
        displayRegister () {
            this.$router.push({ name: 'register' })
        },

        /**
             * Do the login
             */
        login () {
            this.loading = true

            api.login(this.credentials.username, this.credentials.password)
                .then(response => {
                    // Store token to localStorage
                    user.login(response.data.access_token, response.data.token_type)
                    // Set the header for axios
                    user.setUserTokenHeader()
                    // Get the current username and store it
                    this.$store.dispatch('getCurrentUser')
                    this.loading = false
                    this.$router.push({ name: 'home' }) // Force to load Home page
                })
                .catch(error => {
                    this.response.message = error.response.data.message
                    this.response.status = false
                    this.loading = false
                })
        }
    }
}
</script>
