<template functional>
	<div>

		<table class="table table-sm table-hover">
			<tbody v-for="event in props.events" :key="event.id">
			<tr>
				<th scope="row" class="align-middle small">
					<div>{{ event.formated_date }}</div>
					<div><strong>@ {{ event.time }}</strong></div>
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
