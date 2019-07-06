<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header"><h1 class="text-center">Λίστα ασθενών</h1></div>

                    <div class="card-body">

                        <form @submit.prevent="searchText" class="row col-lg-8 col-12 mx-auto">

                            <label for="search" class="sr-only">Search</label>
                            <input type="text" max="100" class="form-control col-md-5 col-12 my-1"
                                   id="search" name="search" v-model="search">

                            <input type="submit" class="btn btn-small btn-success col-md-3 col-12 my-1 mx-auto" value="Αναζήτηση">
                            <button class="btn btn-small btn-danger col-md-3 col-12 my-1" @click="clearSearch()">Καθαρισμός</button>

                        </form>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Όνομα</th>
                                    <th scope="col">Επώνυμο</th>
                                    <th scope="col">Σημειώσεις</th>
                                </tr>
                            </thead>
                            <tbody v-for="patient in patients">
                                <tr>
                                    <th scope="row">{{ patient.id }}</th>
                                    <td>
                                        <router-link :to="{ name: 'patient', params: { id: patient.id } }"
                                                     :key="$route.fullPath">
                                            {{ patient.fname }}
                                        </router-link>
                                    </td>
                                    <td><router-link :to="{ name: 'patient', params: { id: patient.id } }"
                                                     :key="$route.fullPath">
                                        {{ patient.lname }}
                                    </router-link></td>
                                    <td>
                                        <span v-for="icon in patient.icons">
                                           <eye-icon v-if="icon.id === 1" :title="icon.label"/>
                                           <pencil-icon v-if="icon.id === 2" :title="icon.label"/>
                                           <file-hidden-icon v-if="icon.id === 3" :title="icon.label"/>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: '',

                patients: [
                    {
                        id: 1,
                        lname: 'Lundquist',
                        fname: 'Rosana',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    },
                    {
                        id: 2,
                        lname: 'Gulbranson',
                        fname: 'Kati',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    },
                    {
                        id: 3,
                        lname: 'Gamet',
                        fname: 'Dayle',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    },
                    {
                        id: 4,
                        lname: 'Henriquez',
                        fname: 'Luann',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    },
                    {
                        id: 5,
                        lname: 'Matas',
                        fname: 'Minnie',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    },
                    {
                        id: 6,
                        lname: 'Battle',
                        fname: 'Pedro',
                        icons: [
                            {id: 1, label: 'Ασθένεια'},
                            {id: 2, label: 'Θεραπείες'},
                            {id: 3, label: 'Χρέος'},
                        ]
                    }
                ]
            }
        },

        methods: {

            /**
             * Search for the text
             */
            searchText() {
                if(this.routeName === 'home') { // If you are at home just search the bookmarks
                    // this.getBookmarks(null);
                } else { // Else go to home and then search
                    // this.$router.push({name: 'home', params: {textSearch: this.search}});
                }
            },

            /**
             * Clear the search text and get the bookmarks
             */
            clearSearch() {
                this.search = '';
                // this.getBookmarks(null);
            },
        }

    }
</script>