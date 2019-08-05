<template>
    <div class="container-fluid my-3">

        <b-modal ref="noteModal" size="md" centered hide-footer title="Εισαγωγή σημείωσης">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control" maxlength="60"
                               v-model="note.description" required>

                        <form-error v-if="response.errors.description"
                                    :error="response.errors.description[0]" />
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveNote">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οδοντόγραμμα</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: patientId } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"
                      navCollapseText="patientBar" />

            <div class="container row no-gutters mx-auto">

                {{ note.description }}

                <div class="alert alert-warning w-100 mx-auto text-center fixed-top"
                     role="alert" v-if="textDisplayed !== ''">
                    {{ textDisplayed }}
                </div>

                <dental-gram-tooths-table :tooths="upperTooths"
                                          @click="newNote" @mouseover="displayNote" @mouseleave="hideNote"/>

                <dental-gram-tooths-table :tooths="downTooths"
                                          @click="newNote" @mouseover="displayNote" @mouseleave="hideNote"/>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import FormError from '@/components/basic/FormError'
import DentalGramToothsTable from '@/components/patients/DentalGramToothsTable'

export default {
    components: { MenuBar, FormError, DentalGramToothsTable },

    data () {
        return {
            textDisplayed: '',

            response: {
                message: '',
                status: '',
                errors: []
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

            note: {
                toothId: 0,
                date: '',
                description: ''
            },

            tooths: [
                {
                    id: 18,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 17,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 16,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 15,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 14,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 13,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 12,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 11,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 21,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 22,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 23,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 24,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 25,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 26,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 27,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 28,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 48,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 47,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 46,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 45,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 44,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 43,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 42,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 41,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 31,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 32,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 33,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 34,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 35,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 36,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 37,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
                        }
                    ]
                },
                {
                    id: 38,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something 1'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something 2'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something 3'
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
        },

        patientId: function () {
            return this.$route.params.id
        }
    },

    methods: {
        /**
         * Display note modal
         */
        newNote () {
            this.$refs.noteModal.show()
        },

        /**
         * Save the note
         */
        saveNote (note) {
            this.$refs.noteModal.hide()
            this.note = note
        },

        /**
         * Display note's description on alert box
         * @param obj
         */
        displayNote (obj) {
            let tooth = this.tooths.find((tooth) => tooth.id === obj.toothId)
            let note = tooth.notes.find((note) => note.id === obj.noteId)

            this.textDisplayed = note.description
        },

        /**
         * Hide the note's alert box
         */
        hideNote () {
            this.textDisplayed = ''
        }
    }
}
</script>
