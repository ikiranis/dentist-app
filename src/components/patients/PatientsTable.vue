<template functional>
	<div>

		<table class="table">
			<thead>
			<tr>
				<th scope="col" class="patient-label"></th>
				<th scope="col" class="patient-label">#</th>
				<th scope="col" class="patient-label">Όνομα</th>
				<th scope="col" class="patient-label">Επώνυμο</th>
				<th scope="col" class="patient-label">Σημειώσεις</th>
			</tr>
			</thead>
			<tbody v-for="patient in props.patients" :key="patient.id">
			<tr>
				<td class="text-center btn-icon">
					<delete @click="listeners.click(patient.id)" title="Διαγραφή ασθενή"/>
				</td>
				<th scope="row" class="patientId">{{ patient.id }}</th>
				<td>
					<router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
						{{ patient.fname }}
					</router-link>
				</td>
				<td>
					<router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
						{{ patient.lname }}
					</router-link>
				</td>
				<td class="text-right" v-if="patient.icons.length">
					<span v-for="icon in patient.icons" :key="icon.id" class="patient-icon">
					   <biohazard-icon v-if="icon.label === 'Ασθένεια' && icon.name !== ''" :title="icon.name"/>
					   <medical-bag-icon v-if="icon.label === 'Εκρεμείς θεραπείες' && icon.name !== ''" :title="icon.name"/>
					   <currency-eur-icon v-if="icon.label === 'Χρέος' && icon.name !== ''" :title="icon.name"/>
					</span>
				</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
export default {
    name: 'PatientsTable',

    props: {
        patients: {
            required: true,
            type: Array
        }
    }
}
</script>
