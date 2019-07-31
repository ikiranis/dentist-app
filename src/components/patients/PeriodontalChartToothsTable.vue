<template functional>

    <table class="table table-responsive">

        <thead>
        <tr>
            <th v-for="tooth in props.tooths" :key="tooth.id"
                class="text-center tooth-label">
                <img :src="'/images/teeths/' + tooth.id + '.png'" class="toothImage">
                <h5>{{ tooth.id }}</h5>
            </th>
        </tr>
        </thead>

        <tbody>
        <td v-for="tooth in props.tooths" :key="tooth.id">
            <tr v-for="note in tooth.notes" :key="note.id" class="mb-2">
                <span class="toothNotes" @mouseover="listeners.mouseover({toothId: tooth.id, noteId: note.id})"
                    @mouseout="listeners.mouseleave">
                    <span class="date-icon">{{ note.date }}</span>
                </span>
            </tr>

            <div class="row">
                <plus-circle-outline @click="listeners.click"
                                     fillColor="green" :size="15"
                                     class="btn-icon mx-auto" title="Εισαγωγή μετρήσεων"/>
            </div>
        </td>
        </tbody>

    </table>

</template>

<script>
export default {
    name: 'PeriodontalChartToothsTable',

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

    .date-icon {
        cursor: crosshair;
    }

    .toothImage {
        height: 3em;
    }
</style>
