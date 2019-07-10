<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Κίνηση</th>
                <th scope="col">Ποσό</th>
            </tr>
        </thead>

        <tbody v-for="transaction in transactions" v-if="transaction.kind === kind">
            <tr>
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
</template>

<script>
    export default {
        props: {
            transactions: Array,
            kind: String
        }
    }

</script>