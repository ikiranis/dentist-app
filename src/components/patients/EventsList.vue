<template functional>
	<div>

		<table class="table table-sm table-hover table-responsive">
			<thead>
			<tr>
				<th scope="col" class="text-center">Ημ/νία</th>
				<th scope="col" class="text-center">Περιγραφή</th>
			</tr>
			</thead>

			<tbody v-for="event in props.events" :key="event.id">
			<tr>
				<th scope="row" class="align-middle">
					<div>{{ event.formated_date }}</div>
					<div>@ {{ event.time }}</div>
				</th>
				<td class="align-middle">
					{{ event.description }}
				</td>
			</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
	export default {
		props: {
			events: {
				required: true,
				type: Array
			}
		}
	}
</script>
