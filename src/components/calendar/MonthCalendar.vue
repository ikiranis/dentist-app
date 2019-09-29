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
                    <div v-if="daysOfMonth[((week-1)*7 + day) - 1]">
                        <div class="card-head text-left"> {{ daysOfMonth[((week-1)*7 + day) - 1] }}</div>
                        <div class="card-body px-0">
                            <day-events :dates="getDayEvents(daysOfMonth[((week-1)*7 + day) - 1])" />
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

            getDayEvents(day) {
                let date = moment(day + ' ' + this.month, 'D MMMM, YYYY').format('YYYY-MM-DD')

                let events = this.events.filter(event => {
                    return event.date === date
                })

                return events
            }
        },
    }
</script>
