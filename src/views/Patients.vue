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

            <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                 v-if="!patients.length && !loading">
                Δεν βρέθηκαν ασθενείς
            </div>

            <div v-if="!loading">

                <div class="container mt-4" v-if="patients.length && !loading">

                    <paginate :pagination="pagination" @click="getPatients"/>

                    <patients-table :patients="patients" @click="deletePatient"/>

                    <paginate :pagination="pagination" @click="getPatients"/>

                </div>

                <div class="row">
                    <input type="submit" id="insertPatient" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
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
import Paginate from '@/components/basic/Paginate'
import PatientsTable from '@/components/patients/PatientsTable'
import Loading from '@/components/basic/Loading'
import utility from "../library/utility";

export default {
    components: { DisplayError, Paginate, PatientsTable, Loading },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

            loading: false,

            pagination: {
                meta: {},
                links: {}
            },

            search: null,

            patients: []

        }
    },

    created: function () {
        this.getPatients(null)
    },

    methods: {
        /**
		 * Get all the patients
		 *
		 * @param page
		 */
        getPatients (page) {
            this.loading = true

            api.getPatients(page, this.search)
                .then(response => {
                    this.loading = false

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
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
		 * Delete a patient
		 */
        deletePatient (patientId) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις τον ασθενή με id: ' + patientId + ';')

            this.loading = true

            if (choise) {
                api.deletePatient(patientId)
                    .then(response => {
                        this.loading = false

                        this.getPatients(null)
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
		 * Clear the search text and get the bookmarks
		 */
        clearSearch () {
            this.search = null
            this.getPatients(null)
        },

        /**
		 *  Create ne patient
		 */
        newPatient () {
            this.$router.push({ name: 'patient', params: { id: 0 } })
        }
    }
}
</script>
