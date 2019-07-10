<template>
    <div class="container-fluid my-3">
        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οικονομικά</h1>
            </div>

            <div class="container row">

                <div class="col-lg-6 col-12">

                    <div class="col-12 text-center">
                        <h3>Έσοδα</h3>

                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Ημ/νία</th>
                                <th scope="col">Κίνηση</th>
                                <th scope="col">Ποσό</th>
                            </tr>
                            </thead>

                            <tbody v-for="transaction in transactions">
                            <tr v-if="transaction.kind === 'income'">
                                <th scope="row">{{ transaction.date }}</th>
                                <td>
                                    {{ transaction.text }}
                                </td>
                                <td>
                                    {{ transaction.value }}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                </div>

                <div class="col-lg-6 col-12">

                    <div class="col-12 text-center">
                        <h3>Έξοδα</h3>

                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Ημ/νία</th>
                                <th scope="col">Κίνηση</th>
                                <th scope="col">Ποσό</th>
                            </tr>
                            </thead>

                            <tbody v-for="transaction in transactions">
                            <tr v-if="transaction.kind === 'expense'">
                                <th scope="row">{{ transaction.date }}</th>
                                <td>
                                    {{ transaction.text }}
                                </td>
                                <td>
                                    {{ transaction.value }}
                                </td>
                            </tr>
                            </tbody>
                        </table>

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
                transactions: [
                    {
                        date: '12/01/2019',
                        text: 'Θεραπεία',
                        patient: 1,
                        value: 50,
                        kind: 'income'
                    },
                    {
                        date: '15/01/2019',
                        text: 'Εξοπλισμός',
                        patient: 0,
                        value: 150,
                        kind: 'expense'
                    },
                    {
                        date: '12/02/2019',
                        text: 'Θεραπεία',
                        patient: 2,
                        value: 250,
                        kind: 'income'
                    },
                    {
                        date: '14/01/2019',
                        text: 'Θεραπεία',
                        patient: 4,
                        value: 30,
                        kind: 'income'
                    },
                    {
                        date: '18/01/2019',
                        text: 'Θεραπεία',
                        patient: 3,
                        value: 80,
                        kind: 'income'
                    },
                    {
                        date: '14/02/2019',
                        text: 'Εξοπλισμός',
                        patient: 0,
                        value: 350,
                        kind: 'expense'
                    },
                    {
                        date: '12/01/2019',
                        text: 'Θεραπεία',
                        patient: 0,
                        value: 400,
                        kind: 'expense'
                    },
                    {
                        date: '14/02/2019',
                        text: 'Θεραπεία',
                        patient: 1,
                        value: 50,
                        kind: 'income'
                    },
                    {
                        date: '12/03/2019',
                        text: 'Εξοπλισμός',
                        patient: 0,
                        value: 500,
                        kind: 'expense'
                    },
                    {
                        date: '27/03/2019',
                        text: 'Θεραπεία',
                        patient: 5,
                        value: 75,
                        kind: 'income'
                    },
                    {
                        date: '12/05/2019',
                        text: 'Θεραπεία',
                        patient: 6,
                        value: 50,
                        kind: 'income'
                    },
                    {
                        date: '13/01/2019',
                        text: 'Εξοπλισμός',
                        patient: 0,
                        value: 100,
                        kind: 'expense'
                    },
                    {
                        date: '22/01/2019',
                        text: 'Θεραπεία',
                        patient: 0,
                        value: 150,
                        kind: 'expense'
                    }
                ]
            }
        },

        methods: {
            //
        }
    }
</script>