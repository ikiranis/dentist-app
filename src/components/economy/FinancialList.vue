<template functional>
    <div>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!transactions.length">
            Δεν βρέθηκαν οικονομικές κινήσεις
        </div>

        <table class="table" v-if="transactions.length">
            <thead>
            <tr>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Περιγραφή</th>
                <th scope="col">Ποσό</th>
            </tr>
            </thead>

            <tbody v-for="transaction in props.transactions" :key="transaction.id">
            <tr>
                <th scope="row">{{ transaction.date }}</th>
                <td>
                    {{ transaction.description }}
                </td>
                <td>
                    {{ transaction.value }}
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    props: {
        transactions: {
            required: true,
            type: Array
        }
    }
}
</script>
