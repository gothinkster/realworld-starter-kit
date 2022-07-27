import type { SetStoreFunction } from 'solid-js/store'

import { createResource, createSignal } from 'solid-js'

import type { Agent } from './createAgent'

import type { Actions, Article, State, Tag } from '~/types'

type ArticlePredicate = {
	myFeed?: any
	favoritedBy?: string
	tag?: string
	author?: string
}

const LIMIT = 10

export default function createArticles(
	agent: Agent,
	actions: Actions,
	state: State,
	setState: SetStoreFunction<State>
) {
	const [articleSource, setArticleSource] = createSignal<
		[type: 'articles', predicate: ArticlePredicate] | [type: 'article', slug: string]
	>()
	const [articles] = createResource<
		{ [slug: string]: Article },
		[type: 'articles', predicate: ArticlePredicate] | [type: 'article', slug: string]
	>(
		articleSource,
		(args, { value }) => {
			// if we ask for articles (plural)
			if (args[0] === 'articles') {
				return $req(args[1]).then(({ articles: receivedArticles, articlesCount }) => {
					queueMicrotask(() => setState({ totalPagesCount: Math.ceil(articlesCount / LIMIT) }))
					return receivedArticles.reduce((memo, singleArticle) => {
						memo[singleArticle.slug] = singleArticle
						return memo
					}, {})
				})
			}
			// if we ask for article (single)
			const article = state.articles[args[1]]
			if (article) return value
			return agent.Articles.get(args[1]).then((singleArticle) => ({
				...value,
				[args[1]]: singleArticle
			}))
		},
		{ initialValue: {} }
	)

	function $req(predicate: ArticlePredicate) {
		if (predicate.myFeed) return agent.Articles.feed(state.page, LIMIT)
		if (predicate.favoritedBy)
			return agent.Articles.favoritedBy(predicate.favoritedBy, state.page, LIMIT)
		if (predicate.tag) return agent.Articles.byTag(predicate.tag, state.page, LIMIT)
		if (predicate.author) return agent.Articles.byAuthor(predicate.author, state.page, LIMIT)
		return agent.Articles.all(state.page, LIMIT, predicate)
	}

	Object.assign(actions, {
		setPage: (page: number) => setState({ page }),
		setSlug: (slug: string) => {
			setState({ articleSlug: slug })
		},
		loadArticles(predicate: {
			tag?: Tag
			author?: string
			myFeed?: boolean
			favoritedBy?: string
		}) {
			setArticleSource(['articles', predicate])
		},
		loadArticle(slug: string) {
			setArticleSource(['article', slug])
		},
		async makeFavorite(slug: string) {
			const article: Article | null = state.articles[slug]

			if (article && !article.favorited) {
				setState('articles', slug, (s) => ({
					favorited: true,
					favoritesCount: s.favoritesCount + 1
				}))
				try {
					await agent.Articles.favorite(slug)
				} catch (err) {
					setState('articles', slug, (s) => ({
						favorited: false,
						favoritesCount: s.favoritesCount - 1
					}))
					throw err
				}
			}
		},
		async unmakeFavorite(slug: string) {
			const article = state.articles[slug]
			if (article && article.favorited) {
				setState('articles', slug, (s) => ({
					favorited: false,
					favoritesCount: s.favoritesCount - 1
				}))
				try {
					await agent.Articles.unfavorite(slug)
				} catch (err) {
					setState('articles', slug, (s) => ({
						favorited: true,
						favoritesCount: s.favoritesCount + 1
					}))
					throw err
				}
			}
		},
		async createArticle(newArticle: Article) {
			const { article, errors } = await agent.Articles.create(newArticle)
			if (errors) throw errors
			setState('articles', { [article.slug]: article })
			return article
		},
		async updateArticle(data) {
			const { article, errors } = await agent.Articles.update(data)
			if (errors) throw errors
			setState('articles', { [article.slug]: article })
			return article
		},
		async deleteArticle(slug) {
			const article = state.articles[slug]
			setState('articles', { [slug]: undefined })
			try {
				await agent.Articles.del(slug)
			} catch (err) {
				setState('articles', { [slug]: article })
				throw err
			}
		}
	})
	return articles
}
