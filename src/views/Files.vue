<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Αρχεία</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" align="mx-auto" toggle="lg" />


            <div class="container">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Μικρογραφία</th>
                        <th scope="col">Αρχείο</th>
                        <th scope="col">Περιγραφή</th>
                        <th scope="col">Ημ/νία</th>
                        <th scope="col">Μέγεθος</th>
                    </tr>
                    </thead>

                    <tbody v-for="file in files">
                    <tr>
                        <th scope="row" class="text-center">
                            <img :src="file.thumbnail">
                        </th>
                        <td>
                            {{ file.filename }}
                        </td>
                        <td>
                            {{ file.description }}
                        </td>
                        <td>
                            {{ file.date }}
                        </td>
                        <td>
                            {{ file.size }} kb
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="newFile()">
                        Εισαγωγή αρχείου
                    </button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from "@/components/basic/MenuBar";

    export default {
        components: { MenuBar },

        data() {
            return {

                menuItems: [
                    {
                        route: '/medicalHistory',
                        name: 'Ιατρικό ιστορικό',
                        loggedIn: true
                    },
                    {
                        route: '/dentalHistory',
                        name: 'Οδοντιατρικό ιστορικό',
                        loggedIn: true
                    },
                    {
                        route: '/dentalGram',
                        name: 'Οδοντόγραμμα',
                        loggedIn: true
                    },
                    {
                        route: '/periodDentalGram',
                        name: 'Περιοδοντόγραμμα',
                        loggedIn: true
                    },
                    {
                        route: '/treatmentHistory',
                        name: 'Ιστορικό θεραπειών',
                        loggedIn: true
                    },
                    {
                        route: '/denervation',
                        name: 'Απονεύρωση',
                        loggedIn: true
                    },
                    {
                        route: '/files',
                        name: 'Αρχεία',
                        loggedIn: true
                    }
                ],

                files: [
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    },
                    {
                        thumbnail: 'https://picsum.photos/50',
                        filename: 'something',
                        description: 'something about something else',
                        date: '01/10/2018',
                        size: '156'
                    }
                ]

            }
        },

        methods: {

            newFile() {
            //
            }
        }
    }
</script>

