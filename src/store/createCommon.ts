import { createEffect, createResource } from 'solid-js'

export default function createCommon(agent, actions, state, setState) {
	const [tags] = createResource(
		'tags',
		() => agent.Tags.getAll().then((tags) => tags.map((t) => t.toLowerCase())),
		{ initialValue: [] }
	)
	createEffect(() => {
		state.token ? localStorage.setItem('jwt', state.token) : localStorage.removeItem('jwt')
	})
	actions.setToken = (token) => setState({ token })
	return tags
}
