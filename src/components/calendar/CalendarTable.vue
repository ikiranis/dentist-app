<template functional>
    <div class="row">
        <div v-for="event in props.events" :key="event.id" class="col-4 mb-3">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <a href="#" class="px-2" @click="listeners.clickUpdate(event.id)">{{ event.date }} {{ event.time }}</a>
                        <span class="col text-right">
                            <delete class="btn-icon"
                                    @click="listeners.clickDelete(event.id)"
                                    title="Διαγραφή ραντεβού"/>
                        </span>
                    </div>
                </div>

                <div class="card-body">
                    <div>
                        {{ event.description }}
                    </div>

                    <div class="mt-3">
                        <small v-if="event.patient_name">Ραντεβού με:
							<router-link :to="{ name: 'patient', params: { id: event.patient_id } }" class="patientName">
								<strong>{{ event.patient_name }}</strong>
							</router-link>
						</small>
                    </div>
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
