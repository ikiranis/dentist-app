<template functional>
	<div>

		<table class="table table-hover">
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
				<td class="text-center align-middle">
					<delete class="deletePatient btn-icon"
							@click="listeners.deletePatient(patient.id)"
							title="Διαγραφή ασθενή"/>

					<database-export class="btn-icon"
							@click="listeners.databaseExport(patient.id)"
							title="Εξαγωγή δεδομένων"/>
				</td>
				<th scope="row" class="patientId">{{ patient.id }}</th>
				<td class="align-middle">
					<router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
						<span>{{ patient.fname }}</span>
					</router-link>
				</td>
				<td class="align-middle">
					<router-link :to="{ name: 'patient', params: { id: patient.id } }" class="patientName">
						<span class="my-auto">{{ patient.lname }}</span>
					</router-link>
				</td>
				<td class="text-right align-middle" v-if="patient.icons.length">
					<span v-for="icon in patient.icons" :key="icon.id">
					   <hospital v-if="icon.label === 'Ασθένεια' && icon.name"
									   :title="icon.name" fillColor="red"
									   class="patient-icon btn-icon"
									   @click="listeners.displayIconText(icon.name)" />
					   <medical-bag-icon v-if="icon.label === 'Εκρεμείς θεραπείες' && icon.name"
										 :title="icon.name"
										 class="patient-icon btn-icon"
										 @click="listeners.displayIconText(icon.name)" />
					   <currency-eur-icon v-if="icon.label === 'Χρέος' && icon.name"
										  :title="icon.name"
										  class="patient-icon btn-icon"
										  @click="listeners.displayIconText(icon.name)" />
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
