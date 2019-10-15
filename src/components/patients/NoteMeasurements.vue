<template functional>
    <span v-if="props.note" class="toothNotes">
        <div>{{ props.note.data1 }}</div>
        <div>{{ props.note.data2 }}</div>
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
