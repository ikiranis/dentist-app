<template functional>
    <span class="toothNotes">
        <div>{{ props.note.formated_date }}</div>
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
