<template>
    <div class="container-fluid my-3">

        <b-modal ref="fileModal" size="md" centered hide-footer title="Εισαγωγή αρχείου">

            <form class="container-fluid">

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
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveFile">Αποθήκευση</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Αρχεία</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <form @submit.prevent="searchText" class="row col-lg-8 col-12 mx-auto">

                <label for="search" class="sr-only">Search</label>
                <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                       id="search" name="search" v-model="search">

                <input type="submit" class="btn btn-small btn-success col-md-3 col-12 my-1 mx-auto" value="Αναζήτηση">
                <input type="submit" class="btn btn-small btn-danger col-md-3 col-12 my-1" @click="clearSearch()" value="Καθαρισμός">

            </form>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!files.length">
                Δεν βρέθηκαν αρχεία
            </div>

            <div class="container mt-4" v-if="files.length">

                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Μικρογραφία</th>
                        <th scope="col">Αρχείο</th>
                        <th scope="col">Περιγραφή</th>
                        <th scope="col">Ημ/νία</th>
                        <th scope="col">Μέγεθος</th>
                    </tr>
                    </thead>

                    <tbody v-for="file in files" :key="file.id">
                    <tr>
                        <th scope="row" class="text-center">
                            <img :src="file.thumbnail">
                        </th>
                        <td class="align-middle">
                            {{ file.filename }}
                        </td>
                        <td class="align-middle">
                            {{ file.description }}
                        </td>
                        <td class="align-middle">
                            {{ file.date }}
                        </td>
                        <td class="align-middle">
                            {{ file.size }} kb
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div class="row w-100">
                <input type="button" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="newFile()" value="Εισαγωγή αρχείου">
            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'

export default {
    components: { MenuBar, FormError },

    data () {
        return {

            search: '',

            response: {
                message: '',
                status: '',
                errors: []
            },

            file: {
                id: 0,
                thumbnail: '',
                filename: '',
                description: '',
                date: '',
                size: ''
            },

            menuItems: [
                {
                    route: '/medicalHistory/' + this.$route.params.id,
                    name: 'Ιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalHistory/' + this.$route.params.id,
                    name: 'Οδοντιατρικό ιστορικό',
                    loggedIn: true
                },
                {
                    route: '/dentalGram/' + this.$route.params.id,
                    name: 'Οδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/periodontalChart/' + this.$route.params.id,
                    name: 'Περιοδοντόγραμμα',
                    loggedIn: true
                },
                {
                    route: '/treatmentHistory/' + this.$route.params.id,
                    name: 'Ιστορικό θεραπειών',
                    loggedIn: true
                },
                {
                    route: '/denervation/' + this.$route.params.id,
                    name: 'Απονεύρωση',
                    loggedIn: true
                },
                {
                    route: '/files/' + this.$route.params.id,
                    name: 'Αρχεία',
                    loggedIn: true
                }
            ],

            files: [
                {
                    id: 0,
                    thumbnail: 'https://picsum.photos/50',
                    filename: 'something',
                    description: 'something about something else',
                    date: '01/10/2018',
                    size: '156'
                },
                {
                    id: 1,
                    thumbnail: 'https://picsum.photos/50',
                    filename: 'something',
                    description: 'something about something else',
                    date: '01/10/2018',
                    size: '156'
                },
                {
                    id: 2,
                    thumbnail: 'https://picsum.photos/50',
                    filename: 'something',
                    description: 'something about something else',
                    date: '01/10/2018',
                    size: '156'
                },
                {
                    id: 3,
                    thumbnail: 'https://picsum.photos/50',
                    filename: 'something',
                    description: 'something about something else',
                    date: '01/10/2018',
                    size: '156'
                }
            ]

        }
    },

    computed: {
        // ...mapState(['loading']),

        patientId: function () {
            return this.$route.params.id
        }
    },

    methods: {

        newFile () {
            this.$refs.fileModal.show()
        },

        uploadFile () {
            //
        },

        saveFile () {
            //
        },

        searchText () {

        },

        clearSearch () {

        }
    }
}
</script>
