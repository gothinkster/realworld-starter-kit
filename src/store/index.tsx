import { createStore } from 'solid-js/store'
import { Accessor, createContext, useContext } from 'solid-js'

import createAuth from './createAuth'
import createAgent from './createAgent'
import createCommon from './createCommon'
import createProfile from './createProfile'
import createArticles from './createArticles'
import createComments from './createComments'
import createRouteHandler from './createRouteHandler'

import type { Article, Comment, Profile, Tag, User } from '../types/index'

type State = {
	readonly articles: Article[] | null
	readonly comments: Comment[] | null
	readonly tags: Tag[] | null
	readonly profile: Profile | null
	readonly currentUser: User | null
	page: number
	totalPagesCount: number
	token: string
	appName: string
}
type Actions = {
	unmakeFavorite?: any
	makeFavorite?: any
	loadArticles?: any
	setPage?: any
}

const RouterContext = createContext<{
	location: Accessor<string>
	match: (name: any, test: any) => boolean
	getParams: () => any
}>()
const StoreContext = createContext<[State, Actions]>()

export function Provider(props) {
	let articles, comments, tags, profile, currentUser
	const router = createRouteHandler(''),
		[state, setState] = createStore({
			get articles() {
				return articles()
			},
			get comments() {
				return comments()
			},
			get tags() {
				return tags()
			},
			get profile() {
				return profile()
			},
			get currentUser() {
				return currentUser()
			},
			page: 0,
			totalPagesCount: 0,
			token: localStorage.getItem('jwt'),
			appName: 'conduit'
		}),
		actions = {},
		store: [State, Actions] = [state, actions],
		agent = createAgent(store)

	articles = createArticles(agent, actions, state, setState)
	comments = createComments(agent, actions, state, setState)
	tags = createCommon(agent, actions, state, setState)
	profile = createProfile(agent, actions, state, setState)
	currentUser = createAuth(agent, actions, setState)

	return (
		<RouterContext.Provider value={router}>
			<StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
		</RouterContext.Provider>
	)
}

export function useStore() {
	return useContext(StoreContext)
}

export function useRouter() {
	return useContext(RouterContext)
}
