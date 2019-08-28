<template functional>
    <div>

        <table class="table">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col" class="text-center">Ημ/νία</th>
                <th scope="col" class="text-center">θεραπεία</th>
                <th scope="col" class="text-center">Κόστος</th>
            </tr>
            </thead>

            <tbody v-for="treatment in props.treatments" :key="treatment.id">
            <tr>
                <td>
                    <delete class="btn-icon"
                            @click="listeners.clickDelete(treatment.id)"
                            title="Διαγραφή κίνησης"/>
                </td>
                <th scope="row">
                    <a href="#" class="px-2" @click="listeners.clickUpdate(treatment.id)">{{ treatment.formated_date }}</a>
                </th>
                <td>
                    {{ treatment.description }}
                </td>
                <td class="text-center">
                    {{ treatment.value }}
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
export default {
    props: {
        treatments: {
            required: true,
            type: Array
        }
    }
}
</script>
