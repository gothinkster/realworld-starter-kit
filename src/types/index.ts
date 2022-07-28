import { JSX, Setter } from 'solid-js'

export type Children =
	| number
	| boolean
	| Node
	| JSX.Element
	| JSX.ArrayElement
	| JSX.FunctionElement
	| (string & {})
export interface User {
	email: string
	token: string
	username: string
	bio: string
	image: string
}

export interface Profile {
	username: string
	bio: string
	image: string
	following: boolean
}

export interface Author {
	username: string
	bio: string
	image: string
	following: boolean
}

export type Tag = string

export interface Article {
	slug: string
	title: string
	description: string
	body: string
	tagList: Tag[]
	createdAt: string
	updatedAt: string
	favorited: boolean
	favoritesCount: number
	author: Author
}

export interface Comment {
	id: number
	createdAt: string
	updatedAt: string
	body: string
	author: Author
}

export type State = {
	readonly articles: { [slug: string]: Article } | null
	readonly comments: Comment[] | null
	readonly tags: Tag[] | null
	readonly profile: Profile | null
	readonly currentUser: User | null
	page: number
	totalPagesCount: number
	token: string
	appName: string
	articleSlug: string
}

export type Actions = {
	loadArticle?: (slug: string) => Promise<void>
	loadArticles?: (predicate: {
		tag?: Tag
		author?: string
		myFeed?: boolean
		favoritedBy?: string
	}) => Promise<void>
	createArticle?: (article: Article) => Promise<Article>
	updateArticle?: (article: Optional<Article, keyof Article>) => Promise<Article>
	deleteArticle?: (slug: string) => Promise<void>
	setPage?: (page: number) => Promise<void>
	setSlug?: (slug: string) => Promise<void>
	unmakeFavorite?: (slug: string) => Promise<void>
	makeFavorite?: (slug: string) => Promise<void>
	createComment?: any
	deleteComment?: any
	loadComments?: any
	register?: any
	pullUser?: any
	login?: any
	logout?: any
	setToken?: any
	updateUser?: any
	unfollow?: () => Promise<void>
	follow?: () => Promise<void>
	loadProfile?: Setter<string>
}

export type ResponseType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>

export type Optional<T, K extends keyof T> = OptionalPick<T, K> & Omit<T, K>

export type CustomErrors = {
	errors: {
		errorName: string[]
	}
}
