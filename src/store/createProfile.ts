import { createSignal, createResource } from 'solid-js'

import type { Agent } from './createAgent'

export default function createProfile(agent: Agent, actions, state, setState) {
	const [username, setUsername] = createSignal()
	const [profile] = createResource(username, agent.Profile.get)
	Object.assign(actions, {
		loadProfile: setUsername,
		async follow() {
			if (state.profile && !state.profile.following) {
				setState('profile', 'following', true)
				try {
					await agent.Profile.follow(state.profile.username)
				} catch (err) {
					setState('profile', 'following', false)
				}
			}
		},
		async unfollow() {
			if (state.profile && state.profile.following) {
				setState('profile', 'following', false)
				try {
					await agent.Profile.unfollow(state.profile.username)
				} catch (err) {
					setState('profile', 'following', true)
				}
			}
		}
	})
	return profile
}
