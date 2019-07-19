<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οδοντόγραμμα</h1>
            </div>

            <menu-bar brand="Ασθενής" :brandRoute="{ name: 'patient', params: { id: 1 } }"
                      :menuItems="menuItems" userInfo="false" fixed=""
                      variant="" type="light" valign="mx-auto" toggle="lg" />

            <div class="container row no-gutters">

                <div v-for="tooth in tooths" :key="tooth.id" class="card mb-3 col-2 mx-auto">
                    <div class="card-header text-center">
                        {{ tooth.id }}
                    </div>

                    <div class="card-body">
                        <div v-for="note in tooth.notes" :key="note.id" class="mb-2">
                            <small>
                                <strong>{{ note.date }}</strong>
                            </small>
                            <p>
                                <small>
                                    {{ note.description }}
                                </small>
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import MenuBar from '@/components/basic/MenuBar'

export default {
    components: { MenuBar },

    data () {
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

            tooths: [
                {
                    id: 11,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 12,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 13,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 14,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 15,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 16,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 17,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 18,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 21,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 22,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 23,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 24,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 25,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 26,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 27,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 28,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 31,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 32,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 33,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 34,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 35,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 36,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 37,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 38,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 41,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 42,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 43,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 44,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 45,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 46,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 47,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                },
                {
                    id: 48,
                    notes: [
                        {
                            id: 0,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 1,
                            date: '21/01/2019',
                            description: 'something'
                        },
                        {
                            id: 2,
                            date: '21/01/2019',
                            description: 'something'
                        }
                    ]
                }
            ]
        }
    },

    methods: {
    //
    }
}
</script>
