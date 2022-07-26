import { createSignal, createResource, batch } from 'solid-js'

import { User } from '../types/index'
import type { Agent } from './createAgent'

export default function createAuth(agent: Agent, actions, setState) {
	const [loggedIn, setLoggedIn] = createSignal(false),
		[currentUser, { mutate }] = createResource(loggedIn, agent.Auth.current)
	Object.assign(actions, {
		pullUser: () => setLoggedIn(true),
		async login(email: string, password: string) {
			const { user, errors } = await agent.Auth.login(email, password)
			if (errors) throw errors
			actions.setToken(user.token)
			setLoggedIn(true)
		},
		async register(username: string, email: string, password: string) {
			const { user, errors } = await agent.Auth.register(username, email, password)
			if (errors) throw errors
			actions.setToken(user.token)
			setLoggedIn(true)
		},
		logout() {
			batch(() => {
				setState({ token: undefined })
				mutate(undefined)
			})
		},
		async updateUser(newUser: User) {
			const { user, errors } = await agent.Auth.save(newUser)
			if (errors) throw errors
			mutate(user)
		}
	})
	return currentUser
}
