<template functional>
    <span v-if="props.note" class="toothNotes">
        <div>{{ props.note.measure1 }} {{ props.note.measure2 }} {{ props.note.measure3 }}</div>
        <div>{{ props.note.measure4 }} {{ props.note.measure5 }} {{ props.note.measure6 }}</div>
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
