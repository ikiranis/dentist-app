<template>

    <table class="table table-responsive table-hover table-sm table-bordered">

        <thead class="table-borderless">
            <tr>
                <th></th>
                <th v-for="tooth in teeth" :key="tooth.id"
                    class="text-center px-2">
                    <img :src="imagePath(tooth.number)" class="toothImage">
                    <div class="toothNumbers text-secondary">{{ tooth.number }}</div>
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
                    	<note-measurements :note="getNote(date, tooth.number)" />
					</a>
                </td>
            </tr>

            <tr>
                <td></td>
                <td v-for="tooth in teeth" :key="tooth.id" class="text-center">
                    <plus-circle-outline fillColor="green" :size="15"
                                         class="btn-icon" title="Εισαγωγή μετρήσεων"
                                         @click="newNote(tooth)" />
                </td>
            </tr>
        </tbody>

    </table>

</template>

<script>
    import NoteMeasurements from "./NoteMeasurements";

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
             * Get the note with date and  toothNumber
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
             * Get the image path
             *
             * @param toothNumber
             * @returns {string}
             */
            imagePath (toothNumber)
            {
                return '/images/teeth/' + toothNumber + '.png'
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
