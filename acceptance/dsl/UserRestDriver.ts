import { Axios } from 'axios'
import {
  Article,
  PartialArticle,
  ArticleSearchFields,
  createCredentials,
  UserDriver,
} from './UserDriver'

export class UserRestDriver implements UserDriver {
  private axios = new Axios({
    baseURL: process.env.API_URL || 'http://localhost:3000/api',
    responseType: 'json',
    transformRequest: (data) => (data ? JSON.stringify(data) : data),
    transformResponse: (data) => (data ? JSON.parse(data) : data),
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status < 500,
  })

  private async createAccount(username: string) {
    const sign = await this.axios.post('accounts/signup', {
      user: createCredentials(username),
    })

    expect(sign.status).toBe(201)
    expect(sign.data.access_token).toBeDefined()

    this.axios.defaults.headers.common = {
      Authorization: `Bearer ${sign.data.access_token}`,
    }
  }

  private async createProfile(username: string) {
    const response = await this.axios.post('profiles', {
      profile: {
        username: username,
        bio: `Me chamo ${username}`,
        image: 'afs3fas',
      },
    })
    expect(response.status).toBe(201)
  }

  async login(username: string) {
    await this.createAccount(username)
    await this.createProfile(username)
  }

  async follow(username: string) {
    const response = await this.axios.post(`profiles/${username}/follow`, '')
    expect(response.status).toBe(201)
  }

  async unfollow(username: string) {
    const response = await this.axios.delete(`profiles/${username}/follow`)
    expect(response.status).toBe(204)
  }

  async writeArticle(article: Article) {
    const response = await this.axios.post('articles', {
      article: article,
    })
    expect(response.data).toMatchObject({
      article: { ...article, tags: article.tags.sort() },
    })
    return response.data.article.slug
  }

  async deleteArticle(slug: string) {
    const response = await this.axios.delete(`articles/${slug}`)
    expect(response.status).toBe(204)
  }

  private async findArticles(filters: ArticleSearchFields) {
    const response = await this.axios.get(`articles/`, {
      params: {
        author: filters.author,
        tags: filters.tags?.join(','),
      },
    })
    APISpec.validateArticlesResponse(response)
    return response.data.articles
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
    return undefined
  }

  async publishArticle(slug: string) {
    const response = await this.axios.post(`articles/${slug}/publication`)
    expect(response.status).toBe(201)
  }

  async unpublishArticle(slug: string) {
    const response = await this.axios.delete(`articles/${slug}/publication`)
    expect(response.status).toBe(204)
  }

  async commentOnArticle(slug: string, comment: string) {
    const response = await this.axios.post(`articles/${slug}/comments`, {
      comment: { body: comment },
    })
    expect(response.status).toBe(201)
  }

  private async getFeed() {
    const response = await this.axios.get(`articles/feed`)
    APISpec.validateFeedResponse(response)
    return response.data.articles
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
    const response = await this.axios.get(`articles/${slug}`)

    expect(response.status).not.toBe(500)

    return response
  }

  async shouldFindTheArticle(slug: string) {
    const response = await this.getArticle(slug)

    expect(response.status).toBe(200)
    expect(response.data.article).toBeTruthy()
  }

  async shouldNotFindTheArticle(slug: string) {
    const response = await this.getArticle(slug)

    expect(response.status).toBe(404)
    expect(response.data.article).toBeFalsy()
  }

  async shouldSeeCommentFrom(slug: string, username: string) {
    const response = await this.axios.get(`articles/${slug}/comments`)

    expect(response.status).toBe(200)
    expect(response.data.comments.map((v) => v.author.username)).toContainEqual(
      username,
    )
  }
}

class APISpec {
  static validateArticlesResponse(response) {
    expect(response.status).toEqual(200)
    if (response.data.articles.length > 0) {
      expect(response.data).toEqual({
        articles: expect.arrayContaining([
          {
            slug: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            body: expect.any(String),
            tags: expect.arrayContaining([expect.any(String)]),
            createdAt: expect.stringMatching(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
            ),
            updatedAt: expect.stringMatching(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
            ),
            author: {
              username: expect.any(String),
              bio: expect.any(String),
              image: expect.any(String),
            },
            links: {
              self: expect.any(String),
              author: expect.any(String),
              comments: expect.any(String),
            },
          },
        ]),
        links: {
          next: expect.any(String),
        },
      })
    } else {
      expect(response.data).toEqual({
        articles: [],
      })
    }
  }

  static validateFeedResponse(response) {
    return this.validateArticlesResponse(response)
  }
}
