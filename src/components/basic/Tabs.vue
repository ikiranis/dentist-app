<template>
	<div>
		<span v-for="(value, index) in tabs" :key="index">
            <span class="tab badge badge-secondary mx-1"
				  @click="chooseTab(value)">{{ value.label }}</span>
        </span>
	</div>
</template>

<script>
	export default {
		props: {
			tabs: {
				required: true,
				type: Object
			}
		},

		methods: {
			chooseTab (tab)
			{
				Object.keys(this.tabs).forEach(key => {
					if (this.tabs[key] === tab) {
						this.tabs[key].display = true

						return
					}

					this.tabs[key].display = false
				})
			}
		}
	}
</script>

<style scoped>
	.tab {
		cursor: pointer;
	}
</style>
