<template functional>
	<div>

		<table class="table">
			<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">#</th>
				<th scope="col">Όνομα</th>
				<th scope="col">Επώνυμο</th>
				<th scope="col">Σημειώσεις</th>
			</tr>
			</thead>
			<tbody v-for="patient in props.patients" :key="patient.id">
			<tr>
				<td class="text-center btn-icon">
					<delete @click="listeners.click(patient.id)" title="Διαγραφή ασθενή"/>
				</td>
				<th scope="row">{{ patient.id }}</th>
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
<!--				<td class="text-center" v-if="patient.icons.length">-->
<!--					<span v-for="icon in patient.icons" :key="icon.id">-->
<!--					   <biohazard-icon v-if="icon.label === 'Ασθένεια'" :title="icon.name"/>-->
<!--					   <medical-bag-icon v-if="icon.label === 'Εκρεμείς θεραπείες'" :title="icon.name"/>-->
<!--					   <currency-eur-icon v-if="icon.label === 'Χρέος'" :title="icon.name"/>-->
<!--					</span>-->
<!--				</td>-->
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
