<template functional>
    <div class="row">
        <div v-for="event in props.events" :key="event.id" class="col-4 mb-3">
            <div class="card">
                <div class="card-header">
                    <span>{{ event.date }} {{ event.time }}</span>

                    <delete @click="listeners.click(event.id)" title="Διαγραφή ραντεβού"/>
                </div>

                <div class="card-body">
                    {{ event.description }}
                </div>

                <div class="card-footer">
                    {{ event.patientName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CalendarTable',

        props: {
            events: {
                required: true,
                type: Array
            }
        }
    }
</script>
