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
                    <div class="card-head text-left"> {{ daysOfMonth[((week-1)*7 + day) - 1] }}</div>
                    <div class="card-body">something</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        data() {
            return {
                days: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
                daysOfMonth: [],
                month: '2019-10',
                weeks: 0
            }
        },
        // props: {
        //     month: {
        //         required: true,
        //         type: String
        //     }
        // }
        created() {
            this.getDaysOfMonth()
        },

        methods: {
            getDaysOfMonth () {
                let startOfMonth = parseInt(moment(this.month, "YYYY-MM").startOf('month').format('d'));
                let daysInMonth = parseInt(moment(this.month, "YYYY-MM").daysInMonth());
                let counter = 1;

                let addWeek = (daysInMonth + startOfMonth > 35) ? 1 : 0
                this.weeks = 5 + addWeek

                for(let i=startOfMonth; i<daysInMonth+startOfMonth; i++) {
                    this.daysOfMonth[i] = counter++
                }

            }
        },
    }
</script>
