<template>
    <div class="container-fluid my-3">

        <b-modal ref="transactionModal" size="md" centered hide-footer :title="transactionTitle">

            <form class="container-fluid">

                <div class="form-group row">
                    <label for="date" class="col-md-4 col-form-label text-md-right">Ημ/νία</label>
                    <div class="col-md-8">
                        <input id="date" type="date" class="form-control"
                               v-model="transaction.date">
                        <form-error v-if="response.errors.date" :error="response.errors.date[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="description" class="col-md-4 col-form-label text-md-right">Περιγραφή</label>
                    <div class="col-md-8">
                        <input id="description" type="text" class="form-control"
                               v-model="transaction.description" required>
                        <form-error v-if="response.errors.description" :error="response.errors.description[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="value" class="col-md-4 col-form-label text-md-right">Ποσό</label>
                    <div class="col-md-8">
                        <input id="value" type="number" class="form-control"
                               v-model="transaction.value" required>
                        <form-error v-if="response.errors.value" :error="response.errors.value[0]"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="patient" class="col-md-4 col-form-label text-md-right">Ασθενής</label>
                    <div class="col-md-8">
                        <input id="patient" type="text" class="form-control"
                               v-model="transaction.patient">
                        <form-error v-if="response.errors.patient" :error="response.errors.patient[0]"/>
                    </div>
                </div>

                <div class="row">
                    <button class="btn btn-success col-lg-6 col-12 my-3 mx-auto" @click="saveTransaction">Εισαγωγή</button>
                </div>

            </form>

        </b-modal>

        <div class="row justify-content-center">

            <div class="col-12">
                <h1>Οικονομικά</h1>
            </div>

            <!-- Αναζήτηση -->
            <div class="row col-12 mx-auto">
                <div class="form-group row col-md-4 col-12">
                    <label for="dateFrom" class="col-md-4 col-form-label text-md-right">Από</label>
                    <div class="col-md-8">
                        <input id="dateFrom" type="date" class="form-control"
                               v-model="dateFrom">
                        <form-error v-if="response.errors.dateFrom" :error="response.errors.dateFrom[0]"/>
                    </div>
                </div>

                <div class="form-group row col-md-4 col-12">
                    <label for="dateTo" class="col-md-4 col-form-label text-md-right">Μέχρι</label>
                    <div class="col-md-8">
                        <input id="dateTo" type="date" class="form-control"
                               v-model="dateTo">
                        <form-error v-if="response.errors.dateTo" :error="response.errors.dateTo[0]"/>
                    </div>
                </div>

                <div class="col-md-4 col-12 ">
                    <input type="submit" class="btn btn-small btn-success w-100" value="Αναζήτηση">
                </div>
            </div>

            <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!transactions.length">
                Δεν βρέθηκαν οικονομικές κινήσεις
            </div>

            <!-- Λίστες εσόδων/εξόδων -->
            <div class="container row" v-if="transactions.length">

                <div class="col-lg-6 col-12">

                    <div class="col-12 text-center">
                        <h3>Έσοδα</h3>

                        <financial-list :transactions="income"/>

                    </div>

                </div>

                <div class="col-lg-6 col-12">

                    <div class="col-12 text-center">
                        <h3>Έξοδα</h3>

                        <financial-list :transactions="expenses"/>

                    </div>

                </div>

            </div>

            <!-- Κουμπιά εισαγωγής -->
            <div class="container row">

                <div class="col-lg-6 col-12">
                    <div class="row">
                        <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                               @click="newTransaction('income')" value="Εισαγωγή εσόδου">
                    </div>
                </div>

                <div class="col-lg-6 col-12">
                    <div class="row">
                        <input type="submit" class="btn btn-success col-lg-6 col-12 my-3 mx-auto"
                               @click="newTransaction('expense')" value="Εισαγωγή εξόδου">
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import FormError from '@/components/basic/FormError'
import FinancialList from '@/components/economy/FinancialList.vue'

export default {
    components: { FormError, FinancialList },

    data () {
        return {

            dateFrom: '',
            dateTo: '',

            response: {
                message: '',
                status: '',
                errors: []
            },

            transaction: {
                id: 0,
                date: '',
                description: '',
                patient: 0,
                value: 0,
                kind: ''
            },

            transactions: [
                {
                    id: 1,
                    date: '12/01/2019',
                    description: 'Θεραπεία',
                    patient: 1,
                    value: 50,
                    kind: 'income'
                },
                {
                    id: 2,
                    date: '15/01/2019',
                    description: 'Εξοπλισμός',
                    patient: 0,
                    value: 150,
                    kind: 'expense'
                },
                {
                    id: 3,
                    date: '12/02/2019',
                    description: 'Θεραπεία',
                    patient: 2,
                    value: 250,
                    kind: 'income'
                },
                {
                    id: 4,
                    date: '14/01/2019',
                    description: 'Θεραπεία',
                    patient: 4,
                    value: 30,
                    kind: 'income'
                },
                {
                    id: 5,
                    date: '18/01/2019',
                    description: 'Θεραπεία',
                    patient: 3,
                    value: 80,
                    kind: 'income'
                },
                {
                    id: 6,
                    date: '14/02/2019',
                    description: 'Εξοπλισμός',
                    patient: 0,
                    value: 350,
                    kind: 'expense'
                },
                {
                    id: 7,
                    date: '12/01/2019',
                    description: 'Θεραπεία',
                    patient: 0,
                    value: 400,
                    kind: 'expense'
                },
                {
                    id: 8,
                    date: '14/02/2019',
                    description: 'Θεραπεία',
                    patient: 1,
                    value: 50,
                    kind: 'income'
                },
                {
                    id: 9,
                    date: '12/03/2019',
                    description: 'Εξοπλισμός',
                    patient: 0,
                    value: 500,
                    kind: 'expense'
                },
                {
                    id: 10,
                    date: '27/03/2019',
                    description: 'Θεραπεία',
                    patient: 5,
                    value: 75,
                    kind: 'income'
                },
                {
                    id: 11,
                    date: '12/05/2019',
                    description: 'Θεραπεία',
                    patient: 6,
                    value: 50,
                    kind: 'income'
                },
                {
                    id: 12,
                    date: '13/01/2019',
                    description: 'Εξοπλισμός',
                    patient: 0,
                    value: 100,
                    kind: 'expense'
                },
                {
                    id: 13,
                    date: '22/01/2019',
                    description: 'Θεραπεία',
                    patient: 0,
                    value: 150,
                    kind: 'expense'
                }
            ],

            transactionTitle: ''
        }
    },

    computed: {
        income () {
            return this.transactions.filter((transaction) => {
                return transaction.kind === 'income'
            })
        },

        expenses () {
            return this.transactions.filter((transaction) => {
                return transaction.kind === 'expense'
            })
        }
    },

    methods: {

        /**
         * Display transaction modal
         *
         * @param kind
         */
        newTransaction (kind) {
            this.transaction.kind = kind
            this.transactionTitle = (kind === 'income') ? 'Εισαγωγή εσόδου' : 'Εισαγωγή εξόδου'
            this.$refs.transactionModal.show()
        },

        saveTransaction () {
            //
        }
    }
}
</script>
