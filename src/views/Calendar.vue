<template>
    <div class="container-fluid my-3">

        <b-modal ref="eventModal" size="md" centered hide-footer title="Εισαγωγή ραντεβού">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                    <div class="col-md-8">
                        <input id="date" type="date" class="form-control"
                               v-model="event.date" required>
                        <form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="time" class="col-md-4 col-form-label text-md-right">Ώρα</label>
                    <div class="col-md-8">
                        <input id="time" type="datetime-local" class="form-control"
                               v-model="event.time" required>
                        <form-error v-if="response.errors.time" :error="response.errors.time[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control"
                               v-model="event.description" required>
                        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="patient" class="col-md-4 col-form-label text-md-right">Ασθενής</label>
                    <div class="col-md-8">
                        <input id="patient" type="text" class="form-control"
                               v-model="event.patient" required>
                        <form-error v-if="response.errors.patient" :error="response.errors.patient[0]"/>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveEvent">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Ημερολόγιο</h1>
            </div>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!events.length">
                Δεν βρέθηκαν ραντεβού
            </div>

            <div class="container" v-if="events.length">

                <div class="row">

                    <div v-for="event in events" :key="event.id" class="col-4 mb-3">
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

            <div class="row w-100">
                <input class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="newEvent()" value="Εισαγωγή ραντεβού">
            </div>
        </div>
    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'

export default {
    components: { FormError },

    data () {
        return {

            response: {
                message: '',
                status: '',
                errors: []
            },

            event: {
                date: '',
                time: '',
                description: '',
                patient: 0
            },

            events: [
                {
                    id: 0,
                    date: '12/01/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 1
                },
                {
                    id: 1,
                    date: '15/01/2019',
                    time: '12:00',
                    description: 'Εξοπλισμός',
                    patient: 5
                },
                {
                    id: 2,
                    date: '12/02/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 2
                },
                {
                    id: 3,
                    date: '14/01/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 4
                },
                {
                    id: 4,
                    date: '18/01/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 3
                },
                {
                    id: 5,
                    date: '14/02/2019',
                    time: '12:00',
                    description: 'Εξοπλισμός',
                    patient: 2
                },
                {
                    id: 6,
                    date: '12/01/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 3
                },
                {
                    id: 7,
                    date: '14/02/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 1
                },
                {
                    id: 8,
                    date: '12/03/2019',
                    time: '12:00',
                    description: 'Εξοπλισμός',
                    patient: 4
                },
                {
                    id: 9,
                    date: '27/03/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 5
                },
                {
                    id: 10,
                    date: '12/05/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 6
                },
                {
                    id: 11,
                    date: '13/01/2019',
                    time: '12:00',
                    description: 'Εξοπλισμός',
                    patient: 5
                },
                {
                    id: 12,
                    date: '22/01/2019',
                    time: '12:00',
                    description: 'Θεραπεία',
                    patient: 7
                }
            ]
        }
    },

    methods: {

        /**
             * Display event modal
             */
        newEvent () {
            this.$refs.eventModal.show()
        },

        saveEvent () {
            alert('Saving...')
        }
    }
}
</script>
