<template functional>
    <span v-if="props.note" class="toothNotes">
        <span>{{ props.note.description }}</span>
    </span>
</template>

<script>
	export default {
		props: {
			note: {
				required: false,
				type: Object
			}
		}
	}
</script>
