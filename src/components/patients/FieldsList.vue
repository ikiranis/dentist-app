<template>
    <div class="text-center">
        <span v-for="field in fields" :key="field.id">
            <span class="badge badge-secondary mx-1">{{ field.label }}</span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        fields: Array
    }
}
</script>
