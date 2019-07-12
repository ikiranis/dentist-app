<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Περιγραφή</th>
                <th scope="col">Ποσό</th>
            </tr>
        </thead>

        <tbody v-for="transaction in transactions" :key="transaction.id" v-if="transaction.kind === kind">
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
</template>

<script>
export default {
    props: {
        transactions: Array,
        kind: String
    }
}

</script>
