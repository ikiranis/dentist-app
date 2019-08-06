<template functional>
    <div class="row">
        <div v-for="event in props.events" :key="event.id" class="col-4 mb-3">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <span class="px-2">{{ event.date }} {{ event.time }}</span>
                        <span class="col text-right">
                            <delete class="btn-icon"
                                    @click="listeners.click(event.id)"
                                    title="Διαγραφή ραντεβού"/>
                        </span>
                    </div>
                </div>

                <div class="card-body">
                    {{ event.description }}
                </div>

                <div class="card-footer">
                    <span>Ραντεβού με: <strong>{{ event.patient_name }}</strong></span>
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
