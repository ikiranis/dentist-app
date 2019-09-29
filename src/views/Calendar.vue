<template>
    <div class="container-fluid my-3" v-if="userIsAdmin">

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
                        <input id="time" type="time" class="form-control"
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
                        <select class="form-control" id="patient" v-model="event.patient_id">
                            <option v-for="patient in patients"
                                    :key="patient.id"
                                    :value="patient.id"
                                    :selected="(event.patient_id === patient.id) ? 'selected' : ''">
                                        {{ patient.fullName }}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <input class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                           @click="saveEvent" value="Εισαγωγή">
                </div>

            </form>

        </b-modal>

        <div class="justify-content-center">

			<div class="col-lg col-12 row fixed-bottom mb-5">
				<Loading class="mx-auto" :loading="loading"/>
			</div>

            <!-- Αναζήτηση -->
            <div class="row col-12 mx-auto">
                <div class="form-group row col-md-4 col-12">
                    <label for="dateFrom" class="col-md-4 col-form-label text-md-right">Από</label>
                    <div class="col-md-8">
                        <input id="dateFrom" type="date" class="form-control"
                               v-model="search.dateFrom">
                    </div>
                </div>

                <div class="form-group row col-md-4 col-12">
                    <label for="dateTo" class="col-md-4 col-form-label text-md-right">Μέχρι</label>
                    <div class="col-md-8">
                        <input id="dateTo" type="date" class="form-control"
                               v-model="search.dateTo">
                    </div>
                </div>

                <div class="col-md-4 col-12 ">
                    <input type="submit"
                           class="btn btn-small btn-success w-100"
                           value="Αναζήτηση"
                           @click="getEvents(null)">
                </div>
            </div>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto"
                 v-if="!events.length && !loading">
                Δεν βρέθηκαν ραντεβού
            </div>

            <!-- Περιεχόμενα -->
            <div>

                <div class="container" v-if="events.length">

                    <paginate :pagination="pagination" @click="getEvents"/>

                    <div class="row col-12">
                        <h2 class="mx-auto">{{ pagination.meta.month_text }}</h2>
                    </div>

                    <month-calendar :month="pagination.meta.month_text"
                                    :events="events"
                                    :updateEvent="getEvent"
                                    :deleteEvent="deleteEvent" />

                    <paginate :pagination="pagination" @click="getEvents"/>

                </div>

            </div>

            <div class="row" v-if="!loading">
                <input type="submit" class="btn btn-success col-md-6 col-12 my-3 mx-auto"
                       @click="newEvent()" value="Εισαγωγή ραντεβού">
            </div>
        </div>

        <div class="row fixed-bottom mb-2">
            <display-error class="mx-auto"
                           v-if="response.message"
                           :response="response"/>
        </div>

    </div>

    <no-access-page v-else
                    message="Ο χρήστης δεν έχει δικαίωμα να δει αυτό το περιεχόμενο" />
</template>

<script>
import api from '@/api'
import FormError from '@/components/basic/FormError'
import DisplayError from '@/components/basic/DisplayError'
import Loading from '@/components/basic/Loading'
import utility from '../library/utility'
import Paginate from '@/components/basic/Paginate'
import MonthCalendar from '@/components/calendar/MonthCalendar'
import NoAccessPage from '@/components/basic/NoAccessPage'
import { mapState } from 'vuex'

export default {
    components: { FormError, Loading, DisplayError, Paginate, NoAccessPage, MonthCalendar },

    data () {
        return {

            response: {
                message: ' ',
                status: '',
                errors: []
            },

            loading: false,

            search: {
                dateFrom: '',
                dateTo: ''
            },

            event: {
                id: 0,
                date: '',
                formated_date: '',
                time: '',
                description: '',
                patient_id: 0,
                patient_name: ''
            },

            pagination: {
                meta: {},
                links: {}
            },

            events: [],

            patients: []
        }
    },

    computed: {
        ...mapState(['userIsAdmin'])
    },

    created: function () {
        this.getEvents(null)
        this.getSimplePatients()
    },

    methods: {

        /**
         * Run the appropriate save action
         */
        saveEvent () {
            if (this.event.id === 0) {
                this.createEvent()
                return
            }

            this.updateEvent()
        },

        /**
         * Display event for edit
         */
        getEvent (eventId) {
            this.event = this.events.find((event) => {
                return event.id === eventId
            })

            this.$refs.eventModal.show()
        },

        /**
         * Get all the events
         *
         * @param page
         */
        getEvents (page) {
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
        deleteEvent (eventId) {
            let choise = confirm('Θέλεις σίγουρα να σβήσεις το ραντεβού με id: ' + eventId + ';')

            if (choise) {
                this.loading = true

                api.deleteEvent(eventId)
                    .then(response => {
                        this.loading = false

                        this.response.message = 'Το ραντεβού διαγράφηκε'
                        this.response.status = true

                        this.getEvents(this.pagination.links.current)
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
        createEvent () {
            this.loading = true

            api.createEvent(this.event)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Το ραντεβού αποθηκεύτηκε'
                    this.response.status = true

                    this.$refs.eventModal.hide()

                    this.getEvents(this.pagination.meta.current_page)
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
        updateEvent () {
            this.loading = true

            api.updateEvent(this.event, this.event.id)
                .then(response => {
                    this.loading = false

                    this.response.message = 'Το ραντεβού ενημερώθηκε'
                    this.response.status = true

                    this.$refs.eventModal.hide()

                    this.getEvents(this.pagination.links.current)
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
         * Get the simple list of patients
         */
        getSimplePatients () {
            api.getSimplePatients()
                .then(response => {
                    if (response.status === 200) {
                        this.patients = response.data

                        return
                    }

                    this.patients = []
                })
                .catch(error => {
                    this.loading = false

                    this.response.message = error.response.data.message
                    this.response.status = false

                    utility.debug(error.response.data.debug)
                })
        },

        /**
         * Display event modal
         */
        newEvent () {
            this.event = { id: 0 }
            this.$refs.eventModal.show()
        }
    }
}
</script>
