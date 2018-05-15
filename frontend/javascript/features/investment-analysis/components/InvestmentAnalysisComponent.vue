<template>

	<div class="MainComponent__container"> <!-- Defined in the Application component maybe... -->
		<h2>Financial Analysis component</h2>
		<div class="Analysis__menu">
			
		</div>
		<financial-statement v-on:contextUpdate="handleContextUpdate"></financial-statement>

		<todo-list></todo-list>

	</div>


</template>


<script>

import FinancialStatement from './FinancialStatement.vue';
import TodoList from './TodoList.vue';
import axios from 'axios';


export default {
	data: () => {
		return {
			context: {
				type: 'analysis',
				company: 'Apple inc.',
				industry: ['Computer Hardware', 'Computer Software', 'Online Services'],
				exchange: ['New York Stock Exchange'],
				country: 'USA',
			},
			childContext: {},
		}
	},
	watchers: {
		context: () => {
			handleContextUpdate()
		},
	},
	methods: {
		handleContextUpdate(childContext) {
			const contexts = [this.context]
			if (!childContext) {
				contexts.push(this.childContext);
			} else {
				this.childContext = childContext;
				contexts.push(this.childContext);
			}
			this.$emit('contextUpdate', this.context);
			
			axios.post('/app/kcgraph', {
				contexts: contexts,
			}).then(res => {
				console.log(res)
			}).catch(errRes => {
				console.log(errRes)
			})
			
		}
	},
	components: {
		'financial-statement': FinancialStatement,
		'todo-list': TodoList,
	},
}
</script>

<style lang="sass" scoped>
	@import "~styles/variables"

	.vue-grid-layout

	.vue-grid-item
		border: 1px solid $lightGrey
		overflow: hidden //scroll makes corner not accessible

	.Analysis__menu
		display: flex
</style>
