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
            <tr v-for="note in getNotesForTooth(tooth.number)" :key="note.id" class="mb-2">
				<span class="toothNotes">
<!--                <span class="toothNotes"-->
<!--					  	@mouseover="displayNote({toothId: tooth.id, noteId: note.id})"-->
<!--                    	@mouseout="mouseleave">-->
                    <span class="date-icon">{{ note.created_at }}</span>
                </span>
            </tr>

            <div class="row">
				<plus-circle-outline fillColor="green" :size="15"
									 class="btn-icon mx-auto" title="Εισαγωγή μετρήσεων"/>
<!--                <plus-circle-outline @click="click"-->
<!--                                     fillColor="green" :size="15"-->
<!--                                     class="btn-icon mx-auto" title="Εισαγωγή μετρήσεων"/>-->
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
		},

		displayNote (data)
		{
			this.$emit('displayNote', data)

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
