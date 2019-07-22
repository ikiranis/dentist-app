<template>
    <div class="container-fluid my-3">

        <b-modal ref="noteModal" size="md" centered hide-footer title="Εισαγωγή μετρήσεων">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="number1" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number1" type="number" class="form-control"
                               v-model="note.measurements[0].number" required>
                    </div>

                    <label for="number2" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number2" type="number" class="form-control"
                               v-model="note.measurements[1].number" required>
                    </div>

                    <label for="number3" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number3" type="number" class="form-control"
                               v-model="note.measurements[2].number" required>
                    </div>

                    <label for="number4" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number4" type="number" class="form-control"
                               v-model="note.measurements[3].number" required>
                    </div>

                    <label for="number5" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number5" type="number" class="form-control"
                               v-model="note.measurements[4].number" required>
                    </div>

                    <label for="number6" class="sr-only">Number</label>
                    <div class="col-md-4 mb-2">
                        <input id="number6" type="number" class="form-control"
                               v-model="note.measurements[5].number" required>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveNote">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Περιοδοντόγραμμα</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container row no-gutters">

                <periodontal-chart-tooths-table :tooths="upperTooths" @click="newNote" @mouseover="displayNote"/>

                <div class="alert alert-primary w-50 mx-auto" role="alert" v-if="chozenNote.measurements">
                    <div class="row col-lg-3 col-12 mx-auto">
                        <span v-for="measurement in chozenNote.measurements" :key="measurement.id"
                              class="col-4 text-center">
                            {{ measurement.number }}
                        </span>
                    </div>
                </div>

                <periodontal-chart-tooths-table :tooths="downTooths" @click="newNote" @mouseover="displayNote"/>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import PeriodontalChartToothsTable from '@/components/patients/PeriodontalChartToothsTable'

export default {
    components: { MenuBar, PeriodontalChartToothsTable },

    data () {
        return {
            chozenNote: {},

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
                    route: '/periodontalChart',
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

            note: {
                toothId: 0,
                date: '',
                measurements: [
                    { id: 0, number: 0 },
                    { id: 1, number: 0 },
                    { id: 2, number: 0 },
                    { id: 3, number: 0 },
                    { id: 4, number: 0 },
                    { id: 5, number: 0 }
                ]
            },

            tooths: [
                {
                    id: 18,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 17,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 16,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 15,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 14,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 13,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 12,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 11,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 21,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 22,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 23,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 24,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 25,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 26,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 27,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 28,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 48,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 47,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 46,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 45,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 44,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 43,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 42,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 41,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 31,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 32,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 33,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 34,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 35,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 36,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 37,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: 38,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            measurements: [
                                { id: 0, number: 0 },
                                { id: 1, number: 0 },
                                { id: 2, number: 0 },
                                { id: 3, number: 0 },
                                { id: 4, number: 0 },
                                { id: 5, number: 0 }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    computed: {
        upperTooths () {
            return this.tooths.filter((tooth) => {
                return tooth.id <= 28
            })
        },

        downTooths () {
            return this.tooths.filter((tooth) => {
                return tooth.id > 28
            })
        }
    },

    methods: {

        /**
         * Display note modal
         */
        newNote () {
            this.$refs.noteModal.show()
        },

        saveNote () {
            alert('Saving measurements...')
        },

        /**
         * Display note's description on alert box
         * @param obj
         */
        displayNote (obj) {
            let tooth = this.tooths.find((tooth) => tooth.id === obj.toothId)
            this.chozenNote = tooth.notes.find((note) => note.id === obj.noteId)
        }
    }
}
</script>
