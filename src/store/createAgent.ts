import { Article, Comment, Optional, User } from '~/types'

const API_ROOT = 'https://api.realworld.io/api'

const encode = encodeURIComponent

type AuthUser = Pick<User, 'username' | 'email'> & { password: string }

type CreateUserRequest = {
	user: AuthUser
}

type LoginRequest = {
	user: Omit<AuthUser, 'username'>
}

type CreateArticleRequest = {
	article: Article
}

type UpdateArticleRequest = {
	article: Optional<Article, keyof Article>
}

type CreateCommentRequest = {
	comment: Comment
}

type BodyArgTypes =
	| LoginRequest
	| CreateUserRequest
	| CreateArticleRequest
	| UpdateArticleRequest
	| CreateCommentRequest

type Response = {
	errors?: string[]
}

type UserResponse = Response & {
	user: Omit<User, 'password'>
}

type ArticleResponse = Response & {
	article: Article
}

type ArticlesResponse = Response & {
	articles: Article[]
	articlesCount: number
}

type CommentResponse = Response & {
	comment: Comment
}

export type Agent = {
	Articles: {
		all: (page: number, lim?: number, predicate?: any) => Promise<ArticlesResponse>
		byAuthor: (author: string, page: number, size?: number) => Promise<ArticlesResponse>
		byTag: (tag: string, page: number, lim?: number) => Promise<ArticlesResponse>
		del: (slug: string) => Promise<ArticleResponse>
		favorite: (slug: string) => Promise<ArticleResponse>
		favoritedBy: (author: string, page: number, size?: number) => Promise<ArticlesResponse>
		feed: (size?: number, offset?: number) => Promise<ArticlesResponse>
		get: (slug: string) => Promise<ArticleResponse>
		unfavorite: (slug: string) => Promise<ArticleResponse>
		update: (article: Optional<Article, keyof Article>) => Promise<ArticleResponse>
		create: (article: Article) => Promise<ArticleResponse>
	}
	Auth: {
		current: () => Promise<UserResponse>
		login: (email: string, password: string) => Promise<UserResponse>
		register: (username: string, email: string, password: string) => Promise<UserResponse>
		save: (user: User) => Promise<UserResponse>
	}
	Comments: {
		create: (slug: string, comment: Comment) => Promise<CommentResponse>
		delete: (slug: string, commentId: number) => Promise<CommentResponse>
		forArticle: (slug: string) => Promise<Comment[]>
	}
	Profile: {
		follow: (username: string) => Promise<ArticlesResponse>
		get: (username: string) => Promise<ArticlesResponse>
		unfollow: (username: string) => Promise<ArticlesResponse>
	}
	Tags: { getAll: () => Promise<string[]> }
}

export default function createAgent([state, actions]): Agent {
	async function send(
		method: 'get' | 'post' | 'put' | 'delete',
		url: string,
		data?: BodyArgTypes | undefined,
		resKey?: string | undefined
	) {
		const headers = {},
			opts: RequestInit = { method, headers }
		if (data !== undefined) {
			headers['Content-Type'] = 'application/json'
			opts.body = JSON.stringify(data)
		}

		if (state.token) headers['Authorization'] = `Token ${state.token}`

		try {
			const response = await fetch(API_ROOT + url, opts)
			const json = await response.json()
			return resKey ? json[resKey] : json
		} catch (err) {
			if (err && err.response && err.response.status === 401) {
				actions.logout()
			}
			return err
		}
	}

	const Auth = {
		current: () => send('get', '/user', undefined, 'user'),
		login: (email, password) =>
			send('post', '/users/login', { user: { email, password } } as LoginRequest),
		register: (username, email, password) =>
			send('post', '/users', { user: { username, email, password } }),
		save: (user) => send('put', '/user', { user })
	}

	const Tags = {
		getAll: () => send('get', '/tags', undefined, 'tags')
	}

	const limit = (count: number, p: number) => `limit=${count}&offset=${p ? p * count : 0}`
	const omitSlug = (
		article: Article | Optional<Article, keyof Article>
	): Optional<Article, keyof Article> => Object.assign({}, article, { slug: undefined })

	const Articles = {
		all: (page: number, lim = 10, _predicate?: any) => send('get', `/articles?${limit(lim, page)}`),
		byAuthor: (author: string, page: number, size = 5) =>
			send('get', `/articles?author=${encode(author)}&${limit(size, page)}`),
		byTag: (tag, page: number, lim = 10) =>
			send('get', `/articles?tag=${encode(tag)}&${limit(lim, page)}`),
		del: (slug: string) => send('delete', `/articles/${slug}`),
		favorite: (slug: string) => send('post', `/articles/${slug}/favorite`),
		favoritedBy: (author: string, page: number, size = 5) =>
			send('get', `/articles?favorited=${encode(author)}&${limit(size, page)}`),
		feed: (size = 10, offset = 0) => send('get', `/articles/feed?${limit(size, offset)}`),
		get: (slug: string) => send('get', `/articles/${slug}`, undefined, 'article'),
		unfavorite: (slug: string) => send('delete', `/articles/${slug}/favorite`),
		update: (article: Optional<Article, keyof Article>) =>
			send('put', `/articles/${article.slug}`, { article: omitSlug(article) }),
		create: (article: Article) => send('post', '/articles', { article })
	}

	const Comments = {
		create: (slug: string, comment) => send('post', `/articles/${slug}/comments`, { comment }),
		delete: (slug: string, commentId: number) =>
			send('delete', `/articles/${slug}/comments/${commentId}`),
		forArticle: (slug: string) => {
			if (!slug) return
			return send('get', `/articles/${slug}/comments`, undefined, 'comments')
		}
	}

	const Profile = {
		follow: (username: string) => send('post', `/profiles/${username}/follow`),
		get: (username: string) => send('get', `/profiles/${username}`, undefined, 'profile'),
		unfollow: (username: string) => send('delete', `/profiles/${username}/follow`)
	}

	return {
		Articles,
		Auth,
		Comments,
		Profile,
		Tags
	}
}
