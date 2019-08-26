<template>

	<table class="table table-responsive table-hover table-sm table-bordered">

		<thead class="table-borderless">
			<tr>
				<th></th>
				<th v-for="tooth in teeth" :key="tooth.id"
					class="text-center px-3 toothNumbers text-secondary">{{ tooth.number }}
				</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="date in getDates()">
				<td class="text-center align-middle">
					<span class="toothNotes">{{ date }}</span>
				</td>

				<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
					<a href="#" @click="updateNote(getNote(date, tooth.number))">
						<note-description :note="getNote(date, tooth.number)"/>
					</a>
				</td>
			</tr>

			<tr>
				<td></td>
				<td v-for="tooth in teeth" :key="tooth.id" class="text-center">
					<plus-circle-outline fillColor="green" :size="15"
										 class="btn-icon" title="Εισαγωγή σημείωσης"
										 @click="newNote(tooth)"/>
				</td>
			</tr>
		</tbody>

	</table>

</template>

<script>
	import NoteDescription from "./NoteDescription"

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
			}
		},

		methods: {
			/**
			 * Get all the dates, without duplicates
			 *
			 * @returns {*[]}
			 */
			getDates() {
				// Get only the dates from array
				let dates = [];

				this.notes.forEach(value => {
					dates.push(value.formated_date)
				})

				// Filter duplicates
				return dates.filter((item, index) =>
					dates.indexOf(item) === index
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
			}
		}
	}
</script>

<style scoped>
	.toothNotes {
		font-size: 0.8em;
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
