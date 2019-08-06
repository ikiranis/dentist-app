<template>
    <div v-if="loading">
        <img src="@/assets/loader.gif">
    </div>
</template>

<script>
export default {
    props: {
        loading: Boolean
    }
}
</script>
