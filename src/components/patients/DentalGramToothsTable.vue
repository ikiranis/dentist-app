<template functional>

    <table class="table table-responsive">

        <thead>
        <tr>
            <th v-for="tooth in props.tooths" :key="tooth.id"
                class="text-center">{{ tooth.id }}</th>
        </tr>
        </thead>

        <tbody>
        <td v-for="tooth in props.tooths" :key="tooth.id">
            <tr v-for="note in tooth.notes" :key="note.id" class="mb-2">
                <span class="toothNotes" @mouseover="listeners.mouseover">
                    {{ note.date }}
                </span>
            </tr>

            <div class="row">
                <plus-circle-outline @click="listeners.click"
                                     fillColor="green" size="15"
                                     class="btn-icon mx-auto" title="Εισαγωγή σημείωσης"/>
            </div>
        </td>
        </tbody>

    </table>

</template>

<script>
export default {
    name: 'DentalGramToothsTable',

    props: {
        tooths: {
            required: true,
            type: Array
        }
    }
}
</script>

<style scoped>
    .toothNotes {
        font-size: 0.5em;
    }
</style>
