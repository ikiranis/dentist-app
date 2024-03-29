<template>

	<div>
		<table class="table table-responsive table-hover">

			<thead class="table-borderless">
				<tr>
					<th></th>
					<th v-for="tooth in teeth" :key="tooth.id"
						class="text-center px-2 label">
						<img :src="imagePath(tooth.number)" class="toothImage">
						<div class="toothNumbers text-secondary">{{ tooth.number }}</div>
					</th>
				</tr>
			</thead>

			<tbody class="table-bordered">
				<tr v-for="date in getDates()" :key="date">
					<td class="text-center align-middle">
						<span class="toothNotes">{{ date }}</span>
					</td>

					<td v-for="tooth in teeth" :key="tooth.id" class="text-center toothNotes">
						<div v-for="note in getNotes(date, tooth.number)" :key="note.id">
							<a href="#" @click="updateNote(note)">
								<note-measurements :note="note" />
							</a>
						</div>

<!--						<div v-if="note = getNote(date, tooth.number)">-->
<!--							<a href="#" @click="updateNote(getNote(date, tooth.number))">-->
<!--								<note-measurements :note="note" />-->
<!--							</a>-->
<!--						</div>-->
					</td>
				</tr>

				<tr>
					<td></td>
					<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
						<plus-circle-outline
											 fillColor="green" :size="15"
											 class="btn-icon" title="Εισαγωγή μετρήσεων"
											 @click="newNote(tooth, kind)" />
					</td>
				</tr>
			</tbody>

		</table>

	</div>
</template>

<script>
import NoteMeasurements from './NoteMeasurements'
import moment from 'moment'

export default {
    components: { NoteMeasurements },

    props: {
        teeth: {
            required: true,
            type: Array
        },
        notes: {
            required: true,
            type: Array
        },
        newNote: {
            required: true,
            type: Function
        },
        updateNote: {
            required: true,
            type: Function
        },
        deleteNote: {
            required: true,
            type: Function
        },
        kind: {
            required: true,
            type: Number
        }
    },

    data () {
        return {
            currentDate: null
        }
    },

    created: function () {
        this.currentDate = moment(new Date()).format('DD/MM/YYYY')
    },

    methods: {
        moment,

        /**
         * Get all the dates, without duplicates
         *
         * @returns {*[]}
         */
        getDates () {
            // Get only the dates from array
            let dates = []

            this.notes.forEach(value => {
                if (value.kind === this.kind) {
                    dates.push(value.formated_date)
                }
            })

            // Filter duplicates
            return dates.filter((item, index) =>
                dates.indexOf(item) === index
            )
        },

        /**
         * Find if there is a note in current date already
         * Returns true when find any
         */
        findDateInNote (tooth) {
            return this.notes.find(note =>
                note.tooth_number === tooth.number &&
                note.formated_date === this.currentDate
            )
        },

        /**
         * Get the note with date and  toothNumber
         *
         * @param date
         * @param toothNumber
         * @returns {*}
         */
        getNote (date, toothNumber) {
            return this.notes.find(note =>
                note.formated_date === date && note.tooth_number === toothNumber && note.kind === this.kind
            )
        },

		/**
		 * Get notes in date, for toothNumber
		 *
		 * @param date
		 * @param toothNumber
		 * @returns {*[]}
		 */
		getNotes (date, toothNumber) {
			return this.notes.filter(note =>
				note.formated_date === date && note.tooth_number === toothNumber && note.kind === this.kind
			)
		},

        /**
         * Get the image path
         *
         * @param toothNumber
         * @returns {string}
         */
        imagePath (toothNumber) {
            return '/images/teeth/' + toothNumber + '.png'
        }
    }
}
</script>

<style scoped>
    .toothNotes {
        font-size: 0.8em;
		min-width: 5em;
    }

	.label {
		min-width: 5em;
	}

    .toothNumbers {
        font-size: 1.5em;
    }

    .toothImage {
        height: 2.5em;
    }

	/* unvisited link */
	a:link {
		color: black;
	}

	/* visited link */
	a:visited {
		color: black;
	}

	/* mouse over link */
	a:hover {
		color: black;
	}

	/* selected link */
	a:active {
		color: black;
	}
</style>
