<template functional>
    <div>

        <div class="alert alert-success text-center w-50 mt-5 mx-auto" v-if="!props.transactions.length">
            Δεν βρέθηκαν οικονομικές κινήσεις
        </div>

        <table class="table" v-if="props.transactions.length">
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
				<td>
					<delete class="btn-icon"
							@click="listeners.clickDelete(transaction.id)"
							title="Διαγραφή κίνησης"/>
				</td>
                <th scope="row">
					<a href="#" class="px-2" @click="listeners.clickUpdate(transaction.id)">{{ transaction.formated_date }}</a>
				</th>
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
