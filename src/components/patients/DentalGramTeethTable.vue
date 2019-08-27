<template>

	<table class="table table-responsive table-hover table-sm">

		<thead class="table-borderless">
			<tr>
				<th></th>
				<th v-for="tooth in teeth" :key="tooth.id"
					class="text-center px-3 toothNumbers text-secondary">{{ tooth.number }}
				</th>
			</tr>
		</thead>

		<tbody class="table-bordered">
			<tr class="table-active">
				<td class="text-center align-middle">
					<span class="toothNotes">Ιστορικό</span>
				</td>

				<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
					<div v-if="note = getOriginNote(tooth.number)">
						<a href="#" @click="updateOriginNote(getOriginNote(tooth.number))">
							<note-description :note="note" />
						</a>
					</div>

					<plus-circle-outline v-else
										 fillColor="black" :size="15"
										 class="btn-icon" title="Εισαγωγή σημείωσης"
										 @click="newOriginNote(tooth)"/>
				</td>
			</tr>

			<tr v-for="date in getDates()">
				<td class="text-center align-middle">
					<span class="toothNotes">{{ date }}</span>
				</td>

				<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
					<div v-if="note = getNote(date, tooth.number)">
						<a href="#" @click="updateNote(getNote(date, tooth.number))">
							<note-description :note="note" />
						</a>
					</div>
				</td>
			</tr>

			<tr>
				<td></td>
				<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
					<plus-circle-outline v-if="!findDateInNote(tooth)"
										 fillColor="green" :size="15"
										 class="btn-icon" title="Εισαγωγή σημείωσης"
										 @click="newNote(tooth)"/>
				</td>
			</tr>
		</tbody>

	</table>

</template>

<script>
	import NoteDescription from "./NoteDescription"
	import moment from 'moment'

	export default {
		components: { NoteDescription },

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
			originNotes: {
				required: true,
				type: Array
			},
			newOriginNote: {
				required: true,
				type: Function
			},
			updateOriginNote: {
				required: true,
				type: Function
			},
			deleteOriginNote: {
				required: true,
				type: Function
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
			getDates() {
				// Get only the dates from array
				let dates = [];

				this.notes.forEach(note => {
					dates.push(note.formated_date)
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
			findDateInNote (tooth)
			{
				return this.notes.find(note =>
					note.tooth_number === tooth.number
					&& note.formated_date === this.currentDate
				)
			},

			/**
			 * Get the note with date and toothNumber
			 *
			 * @param date
			 * @param toothNumber
			 * @returns {*}
			 */
			getNote(date, toothNumber) {
				return this.notes.find(note =>
					note.formated_date === date && note.tooth_number === toothNumber
				)
			},

			/**
			 * Get the origin note with date and toothNumber
			 *
			 * @param toothNumber
			 * @returns {*}
			 */
			getOriginNote(toothNumber) {
				return this.originNotes.find(note =>
					note.tooth_number === toothNumber
				)
			}
		}
	}
</script>

<style scoped>
	.toothNotes {
		font-size: 0.6em;
	}

	.toothNumbers {
		font-size: 1.5em;
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
