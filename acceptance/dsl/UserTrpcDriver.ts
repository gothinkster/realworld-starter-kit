import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { FetchEsque, HeadersEsque } from '@trpc/client/dist/internals/types'
import { ResponseEsque } from '@trpc/client/src/internals/types'
import axios, {
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from 'axios'
import type { AppRouter } from '../../main/server'
import {
  Article,
  ArticleSearchFields,
  PartialArticle,
  UserDriver,
} from './UserDriver'
import { UserRestDriver } from './UserRestDriver'

function convertAxiosHeadersToTrpcHeaders(
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders,
): HeadersEsque {
  const trpcMap = new Map<string, string>()
  for (const [key, value] of Object.entries(headers ?? {})) {
    if (value) {
      trpcMap.set(key, String(value))
    }
  }
  return {
    get: (key) => trpcMap.get(key) ?? null,
    set: (key, value) => trpcMap.set(key, value),
    append: (key, value) => trpcMap.set(key, value),
    has: (key) => trpcMap.has(key),
    delete: (key) => trpcMap.delete(key),
    forEach: (callback) => trpcMap.forEach(callback),
  }
}

function convertAxiosResponseToTrpcResposne(
  response: AxiosResponse,
): ResponseEsque {
  const ok = response.status < 500
  return {
    ok,
    status: response.status,
    statusText: response.statusText,
    headers: convertAxiosHeadersToTrpcHeaders(response.headers),
    json: () => Promise.resolve(response.data),
    clone: () => convertAxiosResponseToTrpcResposne(response),
    url: response.config.url ?? '',
    redirected: false,
    type: ok ? 'basic' : 'error',
  }
}

const fetchToAxiosAdapter: FetchEsque = async (input, init) => {
  const response = await axios.request({
    url: input.toString(),
    method: init?.method,
    data: init?.body,
    headers: init?.headers as any,
  })
  return convertAxiosResponseToTrpcResposne(response)
}

export class UserTrpcDriver implements UserDriver {
  private authorization: undefined | string = undefined

  private readonly restClient = new UserRestDriver()

  private trpcClient = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        fetch: fetchToAxiosAdapter,
        url: process.env.TRPC_URL ?? 'http://localhost:3000/trpc',
        headers: () => {
          return {
            'Content-Type': 'application/json',
            Authorization: this.authorization,
          }
        },
      }),
    ],
  })

  async login(username: string) {
    const token = await this.restClient.createAccount(username)
    this.authorization = `Bearer ${token}`
    await this.trpcClient.profiles.create.mutate({
      profile: {
        username: username,
        bio: `Me chamo ${username}`,
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      },
    })
  }

  async follow(username: string) {
    await this.trpcClient.profiles.follow.mutate({ username })
  }

  async unfollow(username: string) {
    await this.trpcClient.profiles.unfollow.mutate({ username })
  }

  async writeArticle(article: Article) {
    const response = await this.trpcClient.articles.create.mutate({ article })
    return response.article.slug
  }

  async deleteArticle(slug: string) {
    await this.trpcClient.articles.delete.mutate({ slug })
  }

  private async findArticles(filters: ArticleSearchFields) {
    const response = await this.trpcClient.articles.getMany.query({
      filters: {
        ...filters,
        tags: filters.tags?.join(' '),
      },
      pagination: { take: 20, skip: 0 },
    })
    return response.articles
  }

  async shouldFindArticleBy(filters: ArticleSearchFields, slug: string) {
    const articles = await this.findArticles(filters)
    expect(articles.map((v) => v.slug)).toContainEqual(slug)
  }

  async shouldNotFindArticleBy(filters: ArticleSearchFields, slug: string) {
    const articles = await this.findArticles(filters)
    expect(articles.map((v) => v.slug)).not.toContainEqual(slug)
  }

  async editArticle(slug: string, editions: PartialArticle) {
    return slug
  }

  async publishArticle(slug: string) {
    await this.trpcClient.articles.publish.mutate({ slug })
  }

  async unpublishArticle(slug: string) {
    await this.trpcClient.articles.unpublish.mutate({ slug })
  }

  async commentOnArticle(slug: string, body: string) {
    await this.trpcClient.comments.add.mutate({ slug, comment: { body } })
  }

  private async getFeed() {
    const response = await this.trpcClient.articles.getFeed.query({
      pagination: { take: 20, skip: 0 },
    })
    return response.articles
  }

  async shouldSeeTheArticleInTheFeed(slug: string) {
    const feed = await this.getFeed()
    expect(feed.map((v) => v.slug)).toContainEqual(slug)
  }

  async shouldNotSeeTheArticleInTheFeed(slug: string) {
    const feed = await this.getFeed()
    expect(feed.map((v) => v.slug)).not.toContainEqual(slug)
  }

  private async getArticle(slug: string) {
    const response = await this.trpcClient.articles.getOne.query({ slug })
    return response.article
  }

  async shouldFindTheArticle(slug: string) {
    const response = await this.getArticle(slug)
    expect(response.slug).toEqual(slug)
  }

  async shouldNotFindTheArticle(slug: string) {
    await expect(this.getArticle(slug)).rejects.toThrow(/404/)
  }

  async shouldSeeCommentFrom(slug: string, username: string) {
    const response = await this.trpcClient.comments.getMany.query({
      slug,
      pagination: { take: 20, skip: 0 },
    })
    expect(response.comments.map((v) => v.author.username)).toContainEqual(
      username,
    )
  }
}
