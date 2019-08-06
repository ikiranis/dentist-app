<template>
    <div class="container-fluid my-3">

        <b-modal ref="eventModal" size="md" centered hide-footer title="Εισαγωγή ραντεβού">

            <form @submit.prevent class="container-fluid">

                <div class="form-group row">
                    <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                    <div class="col-md-8">
                        <input id="date" type="date" class="form-control"
                               v-model="event.date" required>
                        <form-error v-if="response.errors.date"
                                    :error="response.errors.date[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="time" class="col-md-4 col-form-label text-md-right">Ώρα</label>
                    <div class="col-md-8">
                        <input id="time" type="datetime-local" class="form-control"
                               v-model="event.time" required>
                        <form-error v-if="response.errors.time"
                                    :error="response.errors.time[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control"
                               v-model="event.description" required>
                        <form-error v-if="response.errors.description"
                                    :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="patient" class="col-md-4 col-form-label text-md-right">Ασθενής</label>
                    <div class="col-md-8">
                        <input id="patient" type="text" class="form-control"
                               v-model="event.patient_id"
                               required> {{event.patient_name}}
                        <form-error v-if="response.errors.patient_id"
                                    :error="response.errors.patient_id[0]"/>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveEvent">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="justify-content-center">

            <div class="col-12">
                <h1>Ημερολόγιο</h1>
            </div>

            <Loading :loading="loading"/>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                 v-if="!events.length && !loading">
                Δεν βρέθηκαν ραντεβού
            </div>

            <div>

                <div class="container" v-if="events.length">

                    <paginate :pagination="pagination" @click="getEvents"/>

                    <calendar-table :events="events"
                                    @clickDelete="deleteEvent"
                                    @clickUpdate="getEvent"/>

                    <paginate :pagination="pagination" @click="getEvents"/>

                </div>

            </div>

            <div class="row w-100">
                <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                       @click="newEvent()" value="Εισαγωγή ραντεβού">
            </div>
        </div>

        <display-error v-if="response.message" :response="response"/>

    </div>
</template>

<script>
    import api from '@/api'
    import FormError from '@/components/basic/FormError'
    import DisplayError from '@/components/basic/DisplayError'
    import Loading from '@/components/basic/Loading'
    import utility from "../library/utility";
    import Paginate from '@/components/basic/Paginate'
    import CalendarTable from '@/components/calendar/CalendarTable'

    export default {
        components: { FormError, Loading, DisplayError, Paginate, CalendarTable },

        data() {
            return {

                response: {
                    message: '',
                    status: '',
                    errors: []
                },

                loading: false,

                search: '',

                event: {
                    id: 0,
                    date: '',
                    time: '',
                    description: '',
                    patient_id: 0,
                    patient_name: ''
                },

                pagination: {
                    meta: {},
                    links: {}
                },

                events: []
            }
        },

        created: function () {
            this.getEvents(null)
        },

        methods: {

            /**
             * Run the appropriate save action
             */
            saveEvent()
            {
                if (this.event.id === 0) {
                    this.createEvent()
                    return
                }

                this.updateEvent()
            },

            /**
             * Display event for edit
             */
            getEvent(eventId)
            {
                api.getEvent(eventId)
                    .then(response => {
                        if (response.status === 200) {
                            this.event = response.data

                            this.$refs.eventModal.show()
                        }
                    })
                    .catch(error => {
                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            },

            /**
             * Get all the events
             *
             * @param page
             */
            getEvents(page)
            {
                this.loading = true

                api.getEvents(page, this.search)
                    .then(response => {
                        this.loading = false

                        if (response.status === 200) {
                            this.events = response.data.data
                            this.pagination.meta = response.data.meta
                            this.pagination.links = response.data.links

                            window.scrollTo(0, 0)

                            return
                        }

                        this.events = []
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        utility.debug(error.response.data.debug)
                    })
            },

            /**
             * Delete an event
             */
            deleteEvent(eventId)
            {
                let choise = confirm('Θέλεις σίγουρα να σβήσεις το ραντεβού με id: ' + eventId + ';')

                if (choise) {
                    this.loading = true

                    api.deleteEvent(eventId)
                        .then(response => {
                            this.loading = false

                            this.getEvents(null)
                        })
                        .catch(error => {
                            this.loading = false

                            this.response.message = error.response.data.message
                            this.response.status = false

                            utility.debug(error.response.data.debug)
                        })
                }
            },

            /**
             * Create an event
             */
            createEvent ()
            {
                this.loading = true

                api.createEvent(this.event)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Το ραντεβού αποθηκεύτηκε'
                        this.response.status = true

                        this.$refs.eventModal.hide()

                        this.getEvents(null)
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors
                        }

                        utility.debug(error.response.data.debug)
                    })
            },

            /**
             * Update the event
             */
            updateEvent ()
            {
                this.loading = true

                api.updateEvent(this.event, this.event.id)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Ο ασθενής ενημερώθηκε'
                        this.response.status = true

                        this.$refs.eventModal.hide()

                        this.getEvents(null)
                    })
                    .catch(error => {
                        this.loading = false

                        this.response.message = error.response.data.message
                        this.response.status = false

                        if (error.response.data.errors) {
                            this.response.errors = error.response.data.errors
                        }

                        utility.debug(error.response.data.debug)
                    })
            },

            /**
             * Display event modal
             */
            newEvent()
            {
                this.$refs.eventModal.show()
            }
        }
    }
</script>
