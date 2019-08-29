<template>
    <div class="container-fluid my-3">

        <b-modal ref="fileModal" size="md" centered hide-footer :title="fileTitle">

            <form @submit.prevent class="container-fluid">

                <div class="custom-file col-12 mb-3">
                    <label class="custom-file-label" for="file">Επιλογή αρχείου</label>
                    <input type="file" class="custom-file-input" name="file" id="file"
                           accept="*" @change="uploadFile">
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control"
                               v-model="file.description" required>
                        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="row">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                            @click="saveFile" value="Αποθήκευση">
                </div>

            </form>

        </b-modal>

		<menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
				  :menuItems="menuItems" userInfo="false" fixed=""
				  variant="" type="light" valign="mx-auto" toggle="lg"
				  navCollapseText="patientBar" />

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <form @submit.prevent="searchText" class="row col-lg-8 col-12 mx-auto">

                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                       id="search" name="search" v-model="search">

                <input type="submit" class="btn btn-small btn-success col-md-3 col-12 my-1 mx-auto" value="Αναζήτηση">
                <input type="submit" class="btn btn-small btn-danger col-md-3 col-12 my-1" @click="clearSearch()" value="Καθαρισμός">

            </form>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!files.length && !loading">
                Δεν βρέθηκαν αρχεία
            </div>

            <div class="container mt-4" v-if="files.length">

                <files-list :files="files"
                        @clickDelete="deleteFile"
                        @clickUpdate="getFile" />

            </div>

            <div class="row w-100">
                <input type="button" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="newFile" value="Εισαγωγή αρχείου">
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
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import FilesList from '@/components/patients/FilesList'
import utility from '../library/utility'
import api from '../api'

export default {
    components: { MenuBar, FormError, DisplayError, Loading, FilesList },

    data () {
        return {

            search: '',

            loading: false,

            response: {
                message: ' ',
                status: '',
                errors: []
            },

            file: {
                id: 0,
                patient_id: 0,
                thumbnail: null,
                filename: null,
                description: null,
                size: 0
            },

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true,
                    active: false
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true,
                    active: true
                }
            ],

            files: [],

            fileTitle: ''

        }
    },

    computed: {
        patientId: function () {
            return this.$route.params.id
        }
    },

    created: function () {
        this.getFiles(null)
    },

    methods: {

        /**
         * Get all the files
         *
         * @param page
         */
        getFiles (page) {
            this.loading = true

            api.getFiles(this.patientId)
                .then(response => {
                    this.loading = false

                    if (response.status === 200) {
                        this.files = response.data

                        window.scrollTo(0, 0)

                        return
                    }

                    this.files = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Display file for edit
         */
        getFile (fileId) {
            this.file = this.files.find((file) => {
                return file.id === fileId
            })

            this.fileTitle = 'Ενημέρωση αρχείου'
            this.$refs.fileModal.show()
        },

        /**
         * Display file modal
         */
        newFile () {
            this.file = {
                id: 0,
                patient_id: this.patientId
            }

            this.fileTitle = 'Εισαγωγή αρχείου'
            this.$refs.fileModal.show()
        },

        /**
         * Run the appropriate save action
         */
        saveFile () {
            if (this.file.id === 0) {
                this.createFile()
                return
            }

            this.updateFile()
        },

        /**
         * Create a file
         */
        createFile () {
            this.loading = true

            api.createFile(this.file)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Το αρχείο αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.fileModal.hide()

                    this.getFiles(null)
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
         * Update the file
         */
        updateFile () {
            this.loading = true

            api.updateFile(this.file, this.file.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Το αρχείο ενημερώθηκε'
                    this.response.status = true

                    this.$refs.fileModal.hide()

                    this.getFiles(null)
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
         * Delete a file
         */
        deleteFile (fileId) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις το αρχείο με id: ' + fileId + ';')

            if (choise) {
                this.loading = true

                api.deleteFile(fileId)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Το αρχείο διαγράφηκε'
                        this.response.status = true

                        this.getFiles(null)
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            }
        },

        uploadFile () {
            //
        }
    }
}
</script>
