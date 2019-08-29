<template>
    <div class="my-3 mx-3">

		<div class="col-lg col-12 row fixed-bottom mb-5">
			<Loading class="mx-auto" :loading="loading"/>
		</div>

        <div class="card">
            <div class="card-header">
                <span id="username">{{ userInfo.name }}</span>
            </div>

            <div class="card-body">

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
                               v-model="userInfo.password" data-lpignore="true"
                               readonly onfocus="this.removeAttribute('readonly');">
                        <form-error v-if="response.errors.password" :error="response.errors.password[0]"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm
                        Password</label>
                    <div class="col-md-6">
                        <input id="password-confirm" type="password" class="form-control"
                               v-model="password_confirmation" data-lpignore="true" autocomplete="off">
                    </div>
                </div>

                <div class="form-group mb-3">
                    <div class="col-md-8 mx-auto">
                        <button type="submit" class="btn btn-info btn-block" @click.prevent="updateUser">
                            Update user
                        </button>
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
            id: null,
            name: null,
            email: null,
            password: null,
            role_id: 2,
            api_key: null
        },
        password_confirmation: '',
        progressMax: 100,
		loading: false
    }),

    computed: {
        userToken: function () {
            return localStorage.accessToken ? localStorage.accessToken : null
        }
    },

    created: function () {
        this.getCurrentUser()
    },

    methods: {
        /**
             * Get current user info
             */
        getCurrentUser () {
            this.loading = true

            api.getCurrentUser()
                .then(response => {
                    this.userInfo = response
					this.loading = false
                })
                .catch(error => {
                    this.response.message = error.respone.message
                    this.response.status = false
					this.loading = false
                })
        },

        /**
             * Update user's info
             */
        updateUser () {
            if (this.userInfo.password === undefined || this.userInfo.password === this.password_confirmation) {
                let args = {
                    id: this.userInfo.id,
                    email: this.userInfo.email,
                    password: this.userInfo.password
                }

				this.loading = true

                api.updateUser(args)
                    .then(response => {
                        this.response.message = `User ${response.name} updated`
                        this.response.status = true

						this.loading = false
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
