<template>
    <div class="text-center">
        <b-alert
                :show="dismissCountDown"
                dismissible
                :variant="variant"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged">
            <span>{{ text }}</span>
            <b-progress
                    :variant="variant"
                    :max="dismissSecs"
                    :value="dismissCountDown"
                    height="4px"
            ></b-progress>
        </b-alert>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: true
            }
        },

        props: {
            alert: Object,
            variant: String
        },

        computed: {
            text: function () {
                return this.alert.text
            }
        },

        watch: {
            text () {
                this.showAlert()
            },

            /**
             * On countdown = 0, reset message
             *
             * @param value
             */
            dismissCountDown (value) {
                if(value === 0) {
                    this.alert.text = ' '
                }
            }
        },

        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },

            showAlert() {
                this.dismissCountDown = this.dismissSecs
            }
        }
    }
</script>
