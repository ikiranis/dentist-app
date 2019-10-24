<template>
    <div>
        <div class="row bg-secondary">
            <div class="col text-center text-light py-1" v-for="day in days" :key="day">
                <span>{{ day }}</span>
            </div>
        </div>

        <div class="mt-1">
            <div class="row" v-for="week in weeks" :key="week">
                <div class="col card text-center" v-for="weekDay in 7" :key="weekDay">
                    <div v-if="getMonthsDay(weekDay, week)">
                        <div class="card-head row px-2"
							 :class="checkCurrentDate(getMonthsDay(weekDay, week)) ? 'bg-warning' : ''">
                            <span class="mr-auto day align-middle">{{ getMonthsDay(weekDay, week) }}</span>

                            <plus-circle-outline fillColor="green" :size="15"
                                                 class="btn-icon ml-auto my-1"
                                                 title="Εισαγωγή ραντεβού"
                                                 @click="newEvent(getDate(getMonthsDay(weekDay, week)))" />
                        </div>
                        <div class="card-body px-0">
                            <day-events :updateEvent="updateEvent"
                                        :deleteEvent="deleteEvent"
                                        :dates="getDayEvents(getMonthsDay(weekDay, week))" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import DayEvents from './DayEvents'

export default {
    components: { DayEvents },

    data () {
        return {
            days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
            daysOfMonth: [],
            weeks: 5,
			currentMonth: null,
			currentDay: null
        }
    },

    props: {
        month: {
            required: true,
            type: String
        },
        events: {
            required: true,
            type: Array
        },
        updateEvent: {
            required: true,
            type: Function
        },
        deleteEvent: {
            required: true,
            type: Function
        },
        newEvent: {
            required: true,
            type: Function
        }
    },

    watch: {
        month () {
            this.init()
        }
    },

    created () {
        this.init()
    },

    methods: {
        // Init all needed variables
        init () {
            this.daysOfMonth = []
			this.currentMonth = moment().format('MMMM, YYYY')
			this.currentDay = parseInt(moment().format('DD'))

            let startOfMonth = parseInt(moment(this.month, 'MMMM, YYYY').startOf('month').format('d'))
            let daysInMonth = parseInt(moment(this.month, 'MMMM, YYYY').daysInMonth())
            let counter = 1

            let addWeek = (daysInMonth + startOfMonth > 35) ? 1 : 0
            this.weeks += addWeek

            for (let i = startOfMonth; i < daysInMonth + startOfMonth; i++) {
                this.daysOfMonth[i] = counter++
            }
        },

        /**
         *
         * @param day
         * @returns {*}
         */
        getDayEvents (day) {
            let date = this.getDate(day)

            return this.events.filter(event => {
                return event.date === date
            })
        },

        /**
         *
         * @param weekDay
         * @param week
         * @returns {*}
         */
        getMonthsDay (weekDay, week) {
            return this.daysOfMonth[((week - 1) * 7 + weekDay) - 1]
        },

        getDate (day) {
            return moment(day + ' ' + this.month, 'D MMMM, YYYY').format('YYYY-MM-DD')
        },

		// Check if current date is equal with displayed date
        checkCurrentDate(day) {
			return (this.month === this.currentMonth && day === this.currentDay)
		}
    }
}
</script>

<style scoped>
    .day {
        font-size: 1.3em;
    }
</style>
