<template functional>
    <div>
        <div v-for="date in props.dates" :key="date.id" class="mb-2">
            <div class="bg-secondary text-light row px-3 py-1">
                <a href="#" class="px-2 text-light" @click="listeners.clickUpdate(date.id)">{{ date.time }}</a>
                <delete class="btn-icon ml-auto" :size="15"
                        @click="listeners.clickDelete(date.id)"
                        title="Διαγραφή ραντεβού"/>
            </div>
            <div class="w-100 text-left description mt-2 mb-2">{{ date.description }}</div>
            <div class="w-100 text-right patient">με
                <router-link :to="{ name: 'patient', params: { id: date.patient_id } }" class="patientName">
                    <strong>{{ date.patient_name }}</strong>
                </router-link>
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
            }
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
