<template>
    <div class="container-fluid my-3">

        <dental-gram-notes-modal :note="note" :response="response" @click="saveNote"/>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οδοντόγραμμα</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg"/>

            <div class="container row no-gutters mx-auto">

                <dental-gram-tooths-table :tooths="upperTooths" @click="newNote" @mouseover="displayNote"/>

                <div class="alert alert-secondary w-50 mx-auto text-center" role="alert" v-if="textDisplayed !== ''">
                    {{ textDisplayed }}
                </div>

                <dental-gram-tooths-table :tooths="downTooths" @click="newNote" @mouseover="displayNote"/>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'
import DentalGramToothsTable from '@/components/patients/DentalGramToothsTable'
import DentalGramNotesModal from '@/components/patients/DentalGramNotesModal'

export default {
    components: { MenuBar, DentalGramToothsTable, DentalGramNotesModal },

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
        saveNote () {
            alert('Saving note!')
        },

        /**
         * Display note's description on alert box
         * @param obj
         */
        displayNote (obj) {
            let tooth = this.tooths.find((tooth) => tooth.id === obj.toothId)
            let note = tooth.notes.find((note) => note.id === obj.noteId)

            this.textDisplayed = note.description
        }
    }
}
</script>
