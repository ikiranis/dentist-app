<template>
    <div class="container">
        <div class="row bg-secondary">
            <div class="col text-center text-light" v-for="day in days">
                <span>{{day}}</span>
            </div>
        </div>

        <div class="mt-1">
            <div class="row" v-for="week in weeks">
                <div class="col card text-center" v-for="day in 7">
                    <div v-if="getDay(day, week)">
                        <div class="card-head text-left"> {{ getDay(day, week) }}</div>
                        <div class="card-body px-0">
                            <day-events
                                    @clickUpdate="updateEvent"
                                    @clickDelete="deleteEvent"
                                    :dates="getDayEvents(getDay(day, week))" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";
    import DayEvents from "./DayEvents";

    export default {
        components: {DayEvents},
        data() {
            return {
                days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
                daysOfMonth: [],
                weeks: 5
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
            }
        },

        watch: {
            month() {
                this.init()
            }
        },

        created() {
            this.init()
        },

        methods: {
            // Init all needed variables
            init () {
                this.daysOfMonth = []

                let startOfMonth = parseInt(moment(this.month, "MMMM, YYYY").startOf('month').format('d'));
                let daysInMonth = parseInt(moment(this.month, "MMMM, YYYY").daysInMonth());
                let counter = 1;

                let addWeek = (daysInMonth + startOfMonth > 35) ? 1 : 0
                this.weeks += addWeek

                for(let i=startOfMonth; i<daysInMonth+startOfMonth; i++) {
                    this.daysOfMonth[i] = counter++
                }
            },

            /**
             *
             * @param day
             * @returns {*}
             */
            getDayEvents(day) {
                let date = moment(day + ' ' + this.month, 'D MMMM, YYYY').format('YYYY-MM-DD')

                return this.events.filter(event => {
                    return event.date === date
                })
            },

            /**
             *
             * @param day
             * @param week
             * @returns {*}
             */
            getDay(day, week) {
                return this.daysOfMonth[((week-1)*7 + day) - 1]
            }
        },
    }
</script>
