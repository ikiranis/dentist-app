<template>
    <div class="container">
        <div class="row bg-secondary">
            <div class="col text-center text-light" v-for="day in days">
                <span>{{day}}</span>
            </div>
        </div>

        <div class="mt-1">
            <div class="row" v-for="week in 6">
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
                month: '2019-04'
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
                let startOfMonth = moment(this.month, "YYYY-MM").startOf('month').format('d');
                let daysInMonth = moment(this.month, "YYYY-MM").daysInMonth();
                let counter = 1;

                for(let i=startOfMonth; i<(parseInt(daysInMonth)+parseInt(startOfMonth)); i++) {
                    this.daysOfMonth[i] = counter++
                }

                console.log(daysInMonth)
                console.log(this.daysOfMonth)
            }
        },
    }
</script>
