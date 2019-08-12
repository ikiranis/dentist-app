<template>
    <div class="text-center">
        <span v-for="(value, index) in fields" :key="index">
            <span v-if="!value.display" class="field badge badge-secondary mx-1"
                  @click="removeField(value)">{{ value.label }}</span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        fields: Object
    },

    methods: {
        removeField (field) {
            field.display = true
        }
    }
}
</script>

<style scoped>
    .field {
        cursor: pointer;
    }
</style>
