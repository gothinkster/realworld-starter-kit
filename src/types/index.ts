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

export type ResponseType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>

export type Optional<T, K extends keyof T> = OptionalPick<T, K> & Omit<T, K>

export type CustomErrors = {
	errors: {
		errorName: string[]
	}
}
