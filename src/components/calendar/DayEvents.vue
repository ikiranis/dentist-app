<template>
    <div>
        <div v-for="date in dates" :key="date.id" class="mb-2">
            <div class="bg-info text-light row btn-icon px-3 py-1">
                <menu-down v-if="!date.display" :size="20" @click="toggleDisplayEvent(date)" />
                <menu-up v-if="date.display" :size="20" @click="toggleDisplayEvent(date)" />
                <a href="#" class="px-2 text-light" @click="updateEvent(date.id)">{{ date.time }}</a>

                <delete class="btn-icon ml-auto" :size="15"
                        @click="deleteEvent(date.id)"
                        title="Διαγραφή ραντεβού"/>
            </div>
            <div v-if="date.display">
                <div class="w-100 text-left description mt-2 mb-2">{{ date.description }}</div>
                <div class="w-100 text-right patient" v-if="date.patient_id">με
                    <router-link :to="{ name: 'patient', params: { id: date.patient_id } }" class="patientName">
                        <strong>{{ date.patient_name }}</strong>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dates: {
                required: true,
                type: Array
            },
            deleteEvent: {
                required: true,
                type: Function
            },
            updateEvent: {
                required: true,
                type: Function
            }
        },

        watch: {
            dates() {
                this.addDisplayToDates()
            }
        },

        created() {
            this.addDisplayToDates()
        },

        methods: {
            addDisplayToDates() {
                this.dates.forEach(date => {
                    this.$set(date, 'display', false)
                })
            },

            toggleDisplayEvent(date) {
                date.display = !date.display
            },
        }
    }
</script>

<style scoped>
    .description {
        font-size: 0.8em;
    }

    .patient {
        font-size: 0.7em;
    }
</style>
