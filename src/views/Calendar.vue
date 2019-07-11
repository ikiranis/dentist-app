<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ημερολόγιο</h1>
            </div>

            <div class="container row">
                <div v-for="event in events" class="col-4 mb-3">
                    <div class="card">
                        <div class="card-header">
                            {{ event.date }} {{ event.time }}
                        </div>

                        <div class="card-body">
                            {{ event.description }}
                        </div>

                        <div class="card-footer">
                            {{ event.patient }}
                        </div>
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
                events: [
                    {
                        date: '12/01/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 1
                    },
                    {
                        date: '15/01/2019',
                        time: '12:00',
                        description: 'Εξοπλισμός',
                        patient: 5
                    },
                    {
                        date: '12/02/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 2
                    },
                    {
                        date: '14/01/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 4
                    },
                    {
                        date: '18/01/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 3
                    },
                    {
                        date: '14/02/2019',
                        time: '12:00',
                        description: 'Εξοπλισμός',
                        patient: 2
                    },
                    {
                        date: '12/01/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 3
                    },
                    {
                        date: '14/02/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 1
                    },
                    {
                        date: '12/03/2019',
                        time: '12:00',
                        description: 'Εξοπλισμός',
                        patient: 4
                    },
                    {
                        date: '27/03/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 5
                    },
                    {
                        date: '12/05/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 6
                    },
                    {
                        date: '13/01/2019',
                        time: '12:00',
                        description: 'Εξοπλισμός',
                        patient: 5
                    },
                    {
                        date: '22/01/2019',
                        time: '12:00',
                        description: 'Θεραπεία',
                        patient: 7
                    }
                ]
            }
        },

        methods: {
            //
        }
    }
</script>