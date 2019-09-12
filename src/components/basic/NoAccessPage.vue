<template functional>
    <div class="container">
        <b-alert show class="my-auto text-center"
                 variant="danger">{{ props.message }}
        </b-alert>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                required: true,
                type: String
            }
        }
    }
</script>
