<template>
    <div class="text-center">
        <span v-for="field in falseFields" :key="field.id">
            <span class="field badge badge-secondary mx-1">{{ field.label }}</span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        fields: Array
    },

    computed: {
        falseFields () {
            return this.fields.filter((field) => {
                return !field.display
            })
        }
    }
}
</script>
