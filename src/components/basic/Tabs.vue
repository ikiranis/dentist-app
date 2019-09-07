<template>
	<div>
		<span v-for="(value, index) in tabs" :key="index">
            <span class="tab badge mx-1"
				  :class="value.display ? 'badge-primary' : 'badge-secondary'"
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
        /**
			 * Change tabs display values
			 *
			 * @param tab
			 */
        chooseTab (tab) {
            Object.keys(this.tabs).forEach(key => {
                this.tabs[key].display = this.tabs[key] === tab
            })
        }
    }
}
</script>

<style scoped>
	.tab {
		font-size: 1.1em;
		cursor: pointer;
	}
</style>
