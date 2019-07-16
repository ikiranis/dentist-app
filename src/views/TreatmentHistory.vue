<template>
    <div class="container-fluid my-3">

        <b-modal ref="treatmentModal" size="md" centered hide-footer title="Εισαγωγή θεραπείας">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                    <div class="col-md-8">
                        <input id="date" type="date" class="form-control"
                               v-model="treatment.date">
                        <form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Θεραπεία</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control"
                               v-model="treatment.description" required>
                        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="value" class="col-md-4 col-form-label text-md-right">Ποσό</label>
                    <div class="col-md-8">
                        <input id="value" type="number" class="form-control"
                               v-model="treatment.value" required>
                        <form-error v-if="response.errors.value" :error="response.errors.value[0]"/>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveTreatment">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

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
import FormError from '@/components/basic/FormError'
import MenuBar from '@/components/basic/MenuBar'

export default {
    components: { MenuBar, FormError },

    data () {
        return {
            response: {
                message: '',
                status: '',
                errors: []
            },

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

            treatment: {
                id: 0,
                date: '',
                description: '',
                value: 0
            },

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
                }
            ]
        }
    },

    methods: {

        /**
             * Display treatment modal
             */
        newTreatment () {
            this.$refs.treatmentModal.show()
        },

        saveTreatment () {
            //
        }
    }
}
</script>
