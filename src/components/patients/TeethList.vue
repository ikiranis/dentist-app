<template>
	<div>
		<span v-for="(value, index) in teeth" :key="index">
            <span class="tooth badge mx-1"
				  :class="value.display ? 'badge-primary' : 'badge-secondary'"
				  @click="chooseTooth(value)">{{ value.number }}</span>
        </span>
	</div>
</template>

<script>
	export default {
		props: {
			teeth: {
				required: true,
				type: Object
			}
		},

		methods: {
			/**
			 * Change teeth display values
			 *
			 * @param tooth
			 */
			chooseTooth (tooth) {
				Object.keys(this.teeth).forEach(key => {
					this.teeth[key].display = this.teeth[key] === tooth
				})
			}
		}
	}
</script>

<style scoped>
	.tooth {
		font-size: 1em;
		cursor: pointer;
	}
</style>
