<template functional>
    <div>
        <div v-for="date in props.dates" :key="date.id">
            {{ date.time }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dates: {
                required: true,
                type: Array
            }
        }
    }
</script>
