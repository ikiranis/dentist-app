<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <form>
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" v-model="userInfo.name" required
                                           autofocus>
                                    <form-error v-if="response.errors.name" :error="response.errors.name[0]"/>
                                </div>
                            </div>
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
                                    <button type="submit" class="btn btn-primary w-100" @click.prevent="register">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

				<div class="row fixed-bottom mb-2">
					<display-error class="mx-auto"
								   v-if="response.message"
								   :response="response"/>
				</div>

				<div class="col-lg col-12 row fixed-bottom mb-5">
					<Loading class="mx-auto" :loading="loading"/>
				</div>

            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import DisplayError from '@/components/basic/DisplayError'
import FormError from '@/components/basic/FormError'
import Loading from '@/components/basic/Loading'

export default {
    components: { Loading, DisplayError, FormError },

    data: () => ({
        response: {
            message: ' ',
            status: '',
            errors: []
        },
        userInfo: {
            name: '',
            email: '',
            password: '',
            role_id: 2
        },
        password_confirmation: '',

        loading: false
    }),

    beforeCreate: function () {
        api.getUsersCount()
            .then(response => {
                if (response.count === 0) {
                    this.userInfo.role_id = 1
                }
            })
            .catch(error => console.log(error.response))
    },

    methods: {
        /**
             * Register new user
             */
        register () {
            this.loading = true

            if (this.userInfo.password === this.password_confirmation) {
                api.register(this.userInfo)
                    .then(response => {
                        this.response.message = response.statusText
                        this.response.status = true

                        this.loading = false
                        this.$router.push({ name: 'login' })
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message
                        this.response.status = false

                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors
                        }

                        this.loading = false
                    })
            } else {
                this.response.message = 'Passwords not validated'
                this.response.status = false

                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
    input[readonly] {
        cursor: text;
        background-color: #fff;
    }
</style>
