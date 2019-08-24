<template>

    <table class="table table-responsive">

        <thead>
        <tr>
            <th></th>
            <th v-for="tooth in teeth" :key="tooth.id"
                class="text-center tooth-label">
                <img :src="imageUrl(tooth.number)" class="toothImage">
                <h5>{{ tooth.number }}</h5>
            </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="date in getDates()">
            <td class="toothNotes mb-3 align-middle text-center">
                <span>{{ date }}</span>
            </td>

            <td v-for="tooth in teeth" :key="tooth.id" class="align-middle text-center">
                <note-measurements :note="getNote(date, tooth.number)"/>
            </td>
        </tr>
        </tbody>

    </table>

</template>

<script>
    import NoteMeasurements from "./NoteMeasurements";

    export default {
        components: {NoteMeasurements},

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
            getNotesForTooth(toothNumber) {
                return this.notes.filter(note => {
                    return note.tooth_number === toothNumber
                })
            },

            /**
             * Get all the dates, without duplicates
             *
             * @returns {*[]}
             */
            getDates() {
                // Get only the dates from array
                let dates = [];

                this.notes.forEach(value => {
                    dates.push(value.created_at)
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
                    note.created_at === date && note.tooth_number === toothNumber
                )
            },

            imageUrl (toothNumber)
            {
                return '/images/teeth/' + toothNumber + '.png'
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
