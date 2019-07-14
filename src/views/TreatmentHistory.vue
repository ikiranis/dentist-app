<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ιστορικό θεραπειών</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"/>

            <div class="container">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col" class="text-center">Ημ/νία</th>
                        <th scope="col" class="text-center">θεραπεία</th>
                        <th scope="col" class="text-center">Κόστος</th>
                    </tr>
                    </thead>

                    <tbody v-for="treatment in treatments" :key="treatment.id">
                    <tr>
                        <th scope="row">{{ treatment.date }}</th>
                        <td>
                            {{ treatment.description }}
                        </td>
                        <td class="text-center">
                            {{ treatment.value }}
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="row">
                    <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                           @click="newTreatment()" value="Εισαγωγή θεραπείας">
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import MenuBar from '@/components/basic/MenuBar'

    export default {
        components: {MenuBar},

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

                treatments: [
                    {
                        id: 1,
                        date: '12/01/2019',
                        description: 'Θεραπεία',
                        value: 50
                    },
                    {
                        id: 2,
                        date: '12/02/2019',
                        description: 'Θεραπεία 2',
                        value: 150
                    },
                    {
                        id: 3,
                        date: '12/03/2019',
                        description: 'Θεραπεία 3',
                        value: 75
                    },
                    {
                        id: 4,
                        date: '12/04/2019',
                        description: 'Θεραπεία 4',
                        value: 30
                    },
                    {
                        id: 5,
                        date: '12/05/2019',
                        description: 'Θεραπεία 5',
                        value: 250
                    },
                ]
            }
        },

        methods: {
            //
        }
    }
</script>
