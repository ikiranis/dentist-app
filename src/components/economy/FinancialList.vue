<template functional>
    <div>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!props.transactions.length">
            Δεν βρέθηκαν οικονομικές κινήσεις
        </div>

        <table class="table table-responsive table-sm" v-if="props.transactions.length">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Ημ/νία</th>
                <th scope="col">Περιγραφή</th>
                <th scope="col">Ποσό</th>
            </tr>
            </thead>

            <tbody v-for="transaction in props.transactions" :key="transaction.id">
            <tr>
                <td class="align-middle">
                    <delete class="btn-icon"
                            @click="listeners.clickDelete(transaction.id)"
                            title="Διαγραφή κίνησης"/>
                </td>
                <th scope="row" class="align-middle">
                    <a href="#" class="px-2" @click="listeners.clickUpdate(transaction.id)">{{ transaction.formated_date
                        }}</a>
                </th>
                <td class="align-middle">
                    {{ transaction.description }}
                </td>
                <td class="align-middle">
                    {{ transaction.value }}
                </td>
            </tr>
            </tbody>
            <tr>
                <td></td>
                <td></td>
                <td class="text-right"><strong>Σύνολο</strong></td>
                <td>
                    <stong>{{ props.sum }}</stong>
                </td>
            </tr>
        </table>

    </div>
</template>

<script>
export default {
    props: {
        transactions: {
            required: true,
            type: Array
        },
        sum: {
            required: true,
            type: Number
        }
    }
}
</script>
