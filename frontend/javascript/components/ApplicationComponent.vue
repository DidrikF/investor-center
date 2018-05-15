<template>
	<div class="Application">
		<main-navigation class="Navigation__container"></main-navigation>

		<div class="Page__container">
            <!--<keep-alive>-->
                <router-view></router-view> 
                <!-- Where the views will be injected based on there we navigate using the router -->
            <!--</keep-alive>-->
        </div>

		<side-panel class="SidePanel__container"></side-panel>
	</div>
</template>

<script>
	
import MainNavigationComponent from './MainNavigationComponent.vue';
import SidePanel from './SidePanel.vue';

export default {
	data: () => {
		return {

		}
	},
	methods: {

	},
	components: {
		'main-navigation': MainNavigationComponent,
		'side-panel': SidePanel,
	}
}


</script>

<style lang="sass" scoped>

// You can do attribute selectors

.Application 
	font-family: "Roboto"
	height: 100%
	width: 100%
	display: grid
	grid-template-rows: 1fr // you can use pixels as well
	grid-template-columns: 250px 1fr 250px //width: calc(100% - 520px) 
	grid-template-areas: "navigation page side-panel"
	//grid-gap: 10px

.Navigation__container
	grid-area: navigation
.Page__container
	grid-area: page
.SidePanel__container
	grid-area: side-panel
// Notes:
.Tag__container
	// flex is great for automatically calculating the desired position/spacing of children within a parent element
	// Flex ads new properties to some css attributes
	// Flex can manipulate how a child is displayed within a paren element
	display: flex
	flex-direction: row // defailt
	flex-wrap: wrap // think its default... 
	// flex-flow: // short hand for several flex properties

	//justify-content: center // 

</style>