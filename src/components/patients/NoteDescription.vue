<template functional>
    <span class="toothNotes">
        <div v-if="props.note.formated_date"><strong>{{ props.note.formated_date }}</strong></div>
        <div>{{ props.note.description }}</div>
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
