<template>
    <div class="container-fluid my-3">

        <b-modal ref="attachmentModal" size="lg" centered hide-footer :title="image.filename">
            <div v-if="image.src"><img :src="image.src" width="100%"></div>
        </b-modal>

        <b-modal ref="fileModal" size="md" centered hide-footer :title="fileTitle">

            <form @submit.prevent class="container-fluid">

                <div class="custom-file col-12 mb-3">
                    <label class="custom-file-label" for="file">Επιλογή αρχείου</label>
                    <input type="file" class="custom-file-input" name="file" id="file"
                           accept="*" @change="uploadFile">
                </div>

                <div class="mt-3" v-if="progress > 0">
                    <b-progress height="2rem"
                                :value="parseInt(progress)"
                                :max="progressMax"
                                show-progress animated
                                variant="success"/>
                </div>

                <ul class="list-group mt-3">
                    <li class="list-group-item bg-success my-1"
                        v-for="file in files"
                        :key="file.id">
                        <div class="row">
                            <span class="col-8 text-white">{{ file.name }}</span>
                            <span class="col-4 text-right">
                                <button class="btn btn-sm btn-danger"
                                        @click="deleteFile(file.id)">Delete</button>
                            </span>
                        </div>
                    </li>
                </ul>

                <div v-if="rejectedFiles.length > 0" class="mt-3">
                    <div class="alert alert-warning w-100 text-center">Rejected files for size limit or file error</div>
                    <ul class="list-group mt-2">
                        <li class="list-group-item bg-danger text-white my-1"
                            v-for="file in rejectedFiles"
                            :key="file.id">
                            <span v-if="file.size">File Limit: ({{ file.size.toLocaleString() }} bytes) </span>
                            <span v-else>Uploaded file error: </span>
                            <span>{{ file.name }}</span>
                        </li>
                    </ul>
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
                    <input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                           @click="saveFile" value="Αποθήκευση">
                </div>

            </form>

        </b-modal>

        <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                  :menuItems="menuItems" userInfo="false" fixed=""
                  variant="" type="light" valign="mx-auto" toggle="md"
                  navCollapseText="patientBar"/>

        <div class="row justify-content-center">

            <div class="col-lg col-12 row fixed-bottom mb-5">
                <Loading class="mx-auto" :loading="loading"/>
            </div>

            <form @submit.prevent="searchText" class="row col-lg-8 col-12 mx-auto">

                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                       id="search" name="search" v-model="search">

                <input type="submit" class="btn btn-small btn-success col-md-3 col-12 my-1 mx-auto" value="Αναζήτηση">
                <input type="submit" class="btn btn-small btn-danger col-md-3 col-12 my-1" @click="clearSearch()"
                       value="Καθαρισμός">

            </form>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!filesList.length && !loading">
                Δεν βρέθηκαν αρχεία
            </div>

            <div class="container mt-4" v-if="filesList.length">

                <files-list :files="filesList"
                            :clickDelete="deleteFile"
                            :clickUpdate="getFileData"
                            :checkFileExtension="checkFileExtension"
                            :getImage="getImage"
                            :getFile="getFile"/>

            </div>

            <div class="row w-100" v-if="!loading">
                <input type="button" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
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
    import {mapState, mapMutations} from 'vuex'
    import uploadFiles from '@/library/uploadFiles'
    import {base64StringToBlob} from 'blob-util'

    export default {
        components: {MenuBar, FormError, DisplayError, Loading, FilesList},

        data() {
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
                    filename: null,
                    path: null,
                    description: null,
                    size: 0
                },

                progressMax: 100,

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

                filesList: [],

                fileTitle: '',

                image: {
                    src: null,
                    filename: null
                },

				sizeLimit: 30000000

            }
        },

        computed: {
            ...mapState(['files', 'progress', 'rejectedFiles']),

            patientId: function () {
                return this.$route.params.id
            }
        },

        created: function () {
            this.getFiles(null)
        },

        methods: {
            ...mapMutations(['setFiles', 'setProgress']),

            /**
             * Get all the files
             *
             * @param page
             */
            getFiles(page) {
                this.loading = true

                api.getFiles(this.patientId)
                    .then(response => {
                        this.loading = false

                        if (response.status === 200) {
                            this.filesList = response.data

                            this.findImages()

                            window.scrollTo(0, 0)

                            return
                        }

                        this.filesList = []
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
            getFileData(fileId) {
				this.setFiles([])

                this.file = this.filesList.find((file) => {
                    return file.id === fileId
                })

				let file = {
					id: this.file.id,
					name: this.file.filename,
					path: this.file.path,
					user_id: this.file.patient_id
				}

				this.files.push(file)

                this.fileTitle = 'Ενημέρωση αρχείου'
                this.$refs.fileModal.show()
            },

            /**
             * Display file modal
             */
            newFile() {
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
            saveFile() {
                if (this.file.id === 0) {
                    this.createFile()
                    return
                }

                this.updateFile()
            },

            /**
             * Create a file
             */
            createFile() {
                this.loading = true

                api.createFile(this.file)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Το αρχείο αποθηκεύτηκε'
                        this.response.status = true

                        this.$refs.fileModal.hide()

						this.setFiles([])

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
            updateFile() {
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
            deleteFile(fileId) {
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

            /**
             * Display the error on every error
             */
            handleError(error) {
                this.response.message = error
                this.response.status = false
            },

            uploadFile() {
                uploadFiles.startUpload(this.patientId, '#file', this.storeFile, this.removeFile, this.handleError, this.sizeLimit, false)
            },

            /**
             * Store file to database
             */
            storeFile(fileAdded) {
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = {
                            file_id: 1
                        }

                        this.file.patient_id = fileAdded.user_id
                        this.file.filename = fileAdded.name
                        this.file.path = fileAdded.path

                        resolve(response)
                    } catch (error) {
                        reject(error.response.data.message)
                    }
                })
            },

            /**
             * Remove file on file error
             */
            removeFile(file) {
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = await api.removeFile(file)
                        resolve(response)
                    } catch (error) {
                        reject(error)
                    }
                })
            },

            /**
             * Get the file and display images or download other files
             *
             * @param id
             */
            getFile(id) {
                api.getFile(id)
                    .then(response => {
                        if (response.headers["content-type"].includes('image')) { // If file is image
                            this.image = {
                                src: 'data: ${response.headers["content-type"]};base64,' + response.data.content,
                                filename: response.data.filename
                            };
                            this.$refs.attachmentModal.show();
                        } else { // If file is not image
                            const url = window.URL.createObjectURL(new Blob([
                                base64StringToBlob(response.data.content, response.headers["content-type"])
                            ]));

                            const link = document.createElement('a');

                            link.href = url;
                            link.setAttribute('download', response.data.filename);
                            document.body.appendChild(link);

                            link.click();
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    })
            },

            /**
             * Check files for images and read the image data
             */
            findImages() {
                this.filesList.forEach(file => {
                    if (this.checkFileExtension(file.filename)) {
                        this.getImage(file)
                    }
                })
            },

            /**
             * Get the image and set the image to display
             */
            getImage(file) {
                api.getFile(file.id)
                    .then(response => {
                        if (response.headers["content-type"].includes('image')) {
                            let image = `data: ${response.headers["content-type"]};base64,` + response.data.content
                            this.$set(file, 'image', image)
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message;
                        this.response.status = false;
                    })
            },

            /**
             * Check if file is image
             *
             * @param file
             * @returns {boolean}
             */
            checkFileExtension(file) {
                let imageExtensions = ['jpeg', 'jpg', 'tif', 'png', 'gif'];
                let fileExtension = file.substr(file.lastIndexOf('.') + 1);

                return imageExtensions.includes(fileExtension); // Return true if file is image
            },

        }
    }
</script>
