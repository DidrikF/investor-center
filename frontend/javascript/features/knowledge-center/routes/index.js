import { KnowledgeCenterComponent } from '../components'

export default [
	{
		path: '/kcenter/',
		component: KnowledgeCenterComponent,
		name: 'knowledgeCenter',
		meta: {
			needsAuth: true
		}
	}
]