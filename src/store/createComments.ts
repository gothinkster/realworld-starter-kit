import { createResource } from 'solid-js'

import type { Agent } from './createAgent'

export default function createComments(agent: Agent, actions, state, setState) {
	const [comments, { mutate, refetch }] = createResource(
		() => state.articleSlug,
		agent.Comments.forArticle,
		{ initialValue: [] }
	)
	Object.assign(actions, {
		loadComments(articleSlug, reload) {
			if (reload) return refetch()
			setState({ articleSlug })
		},
		async createComment(comment) {
			const { errors } = await agent.Comments.create(state.articleSlug, comment)
			if (errors) throw errors
		},
		async deleteComment(id) {
			mutate(comments().filter((c) => c.id !== id))
			try {
				await agent.Comments.delete(state.articleSlug, id)
			} catch (err) {
				actions.loadComments(state.articleSlug)
				throw err
			}
		}
	})
	return comments
}
