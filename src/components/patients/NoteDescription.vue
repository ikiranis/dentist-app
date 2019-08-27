<template functional>
    <span class="toothNotes">
        <span>{{ props.note.description }}</span>
    </span>
</template>

<script>
	export default {
		props: {
			note: {
				required: true,
				type: Object
			}
		}
	}
</script>
