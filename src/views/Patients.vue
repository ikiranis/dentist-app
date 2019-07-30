<template>
    <div class="container-fluid my-3">

        <div class="justify-content-center">

            <div class="col-12"><h1>Ασθενείς</h1></div>

            <form @submit.prevent="getPatients(null)" class="row col-lg-8 col-12 mx-auto">

                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                       id="search" name="search" v-model="search">

                <input type="submit" class="btn btn-small btn-success col-md-3 col-12 my-1 mx-auto"
                       value="Αναζήτηση" @click="getPatients(null)">
                <input type="submit" class="btn btn-small btn-danger col-md-3 col-12 my-1"
                       @click="clearSearch" value="Καθαρισμός">

            </form>

            <Loading :loading="loading"/>

            <div v-if="!loading">

                <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                     v-if="!patients.length && !loading">
                    Δεν βρέθηκαν ασθενείς
                </div>

                <div class="container mt-4" v-if="patients.length && !loading">

                    <paginate :pagination="pagination" @click="getPatients"/>

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Όνομα</th>
                            <th scope="col">Επώνυμο</th>
                            <th scope="col">Σημειώσεις</th>
                        </tr>
                        </thead>
                        <tbody v-for="patient in patients" :key="patient.id">
                        <tr>
                            <th scope="row">{{ patient.id }}</th>
                            <td>
                                <router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
                                    {{ patient.fname }}
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
                                    {{ patient.lname }}
                                </router-link>
                            </td>
                            <td class="text-center">
								<span v-for="icon in patient.icons" :key="icon.id">
								   <biohazard-icon v-if="icon.id === 1" :title="icon.label"/>
								   <medical-bag-icon v-if="icon.id === 2" :title="icon.label"/>
								   <currency-eur-icon v-if="icon.id === 3" :title="icon.label"/>
								</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <paginate :pagination="pagination" @click="getPatients"/>

                </div>

                <div class="row">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="newPatient" value="Εισαγωγή νέου ασθενή">
                </div>
            </div>

        </div>

        <display-error v-if="response.message" :response="response"/>

    </div>
</template>

<script>
    import api from '@/api'
    import DisplayError from '@/components/basic/DisplayError'
    import Loading from '@/components/basic/Loading'
    import Paginate from '@/components/basic/Paginate'
    import {mapState, mapMutations} from 'vuex'

    export default {
        components: {Loading, DisplayError, Paginate},

        data() {
            return {
                response: {
                    message: '',
                    status: '',
                    errors: []
                },

                pagination: {
                    meta: {},
                    links: {}
                },

                search: null,

                patients: []

                // patients: [
                // 	{
                // 		id: 1,
                // 		lname: 'Lundquist',
                // 		fname: 'Rosana',
                // 		icons: [
                // 			{id: 1, label: 'Ασθένεια'},
                // 			{id: 2, label: 'Εκρεμείς θεραπείες'},
                // 			{id: 3, label: 'Χρέος'}
                // 		]
                // 	},

            }
        },

        computed: {
            ...mapState(['loading'])
        },

        created: function () {
            this.getPatients(null)
        },

        methods: {
            ...mapMutations(['setLoading']),

            /**
             * Get all the patients
             *
             * @param page
             */
            getPatients(page) {
                this.setLoading(true)

                api.getPatients(page, this.search)
                    .then(response => {
                        this.setLoading(false)

                        if (response.status === 200) {
                            this.patients = response.data.data
                            this.pagination.meta = response.data.meta
                            this.pagination.links = response.data.links

                            window.scrollTo(0, 0)

                            return
                        }

                        this.patients = []
                    })
                    .catch(error => {
                        this.setLoading(false)

                        this.response.message = error.response.data.message
                        this.response.status = false
                    })
            },

            /**
             * Clear the search text and get the bookmarks
             */
            clearSearch() {
                this.search = null
                this.getPatients(null);
            },

            /**
             *  Create ne patient
             *  */
            newPatient() {
                this.$router.push({name: 'patient', params: {id: 0}})
            }
        }

    }
</script>
