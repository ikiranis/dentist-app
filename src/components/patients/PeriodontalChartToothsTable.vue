<template>

    <table class="table table-responsive">

        <thead>
        <tr>
            <th v-for="tooth in teeth" :key="tooth.id"
                class="text-center tooth-label">
                <img :src="'/images/teeth/' + tooth.number + '.png'" class="toothImage">
                <h5>{{ tooth.number }}</h5>
            </th>
        </tr>
        </thead>

        <tbody>
        <td v-for="tooth in teeth" :key="tooth.id">
            <tr v-for="note in getNotesForTooth(tooth.number)"
				:key="note.id"
				class="row">
				<div class="toothNotes mb-3 mx-auto">
					<div>{{ note.measure1 }} {{ note.measure2 }} {{ note.measure3 }}</div>
					<div>{{ note.measure4 }} {{ note.measure5 }} {{ note.measure6 }}</div>
                </div>
            </tr>

            <div class="row">
				<plus-circle-outline fillColor="green" :size="15"
									 @click="newNote('paok')"
									 class="btn-icon mx-auto"
									 title="Εισαγωγή μετρήσεων"/>
            </div>
        </td>
        </tbody>

    </table>

</template>

<script>
export default {
    name: 'PeriodontalChartToothsTable',

    props: {
        teeth: {
            required: true,
            type: Array
        },
		notes: {
			required: true,
			type: Array
		},
		newNoteFunction: {
        	required: true,
			type: Function
		}
    },

	methods: {
		/**
		 * Filter notes for every tooth
		 *
		 * @param toothNumber
		 * @returns {*}
		 */
    	getNotesForTooth (toothNumber)
		{
    		return this.notes.filter(note => {
    			return note.tooth_number === toothNumber
			})
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
