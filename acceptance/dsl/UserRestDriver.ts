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
    APISpecValidations.validateCreateArticleResponse(response)
    return response.data.article.slug
  }

  async deleteArticle(slug: string) {
    const response = await this.axios.delete(`articles/${slug}`)
    APISpecValidations.validateDeleteArticleResponse(response)
    expect(response.status).toBe(204)
  }

  private async findArticles(filters: ArticleSearchFields) {
    const response = await this.axios.get(`articles/`, {
      params: {
        author: filters.author,
        tags: filters.tags?.join(','),
      },
    })
    APISpecValidations.validateGetArticlesResponse(response)
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
    return slug
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
    APISpecValidations.validateCreateCommentResponse(response)
    expect(response.status).toBe(201)
  }

  private async getFeed() {
    const response = await this.axios.get(`articles/feed`)
    APISpecValidations.validateGetArticlesResponse(response)
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
    APISpecValidations.validateGetArticleResponse(response)
    return response
  }

  async shouldFindTheArticle(slug: string) {
    const response = await this.getArticle(slug)
    expect(response.data.article.slug).toEqual(slug)
  }

  async shouldNotFindTheArticle(slug: string) {
    const response = await this.getArticle(slug)
    expect(response.data.article).toBeUndefined()
  }

  async shouldSeeCommentFrom(slug: string, username: string) {
    const response = await this.axios.get(`articles/${slug}/comments`)
    APISpecValidations.validateGetCommentsResponse(response)
    expect(response.data.comments.map((v) => v.author.username)).toContainEqual(
      username,
    )
  }
}

class APISpecValidations {
  private static readonly validAuthor = {
    username: expect.any(String),
    bio: expect.any(String),
    image: expect.any(String),
  }

  private static readonly validArticle = {
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
    author: APISpecValidations.validAuthor,
    links: {
      self: expect.any(String),
      author: expect.any(String),
      comments: expect.any(String),
    },
  }

  private static readonly validComment = {
    id: expect.any(Number),
    createdAt: expect.stringMatching(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    ),
    updatedAt: expect.stringMatching(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
    ),
    body: expect.any(String),
    author: APISpecValidations.validAuthor,
    links: {
      article: expect.any(String),
      author: expect.any(String),
    },
  }

  static validateGetArticlesResponse(response) {
    expect(response.status).toEqual(200)

    if (response.data.articles.length > 0) {
      expect(response.data).toEqual({
        articles: expect.any(Array),
        links: {
          next: expect.any(String),
        },
      })
      for (const article of response.data.articles) {
        expect(article).toEqual(this.validArticle)
      }
    } else {
      expect(response.data).toEqual({
        articles: [],
        links: {},
      })
    }
  }

  static validateGetArticleResponse(response) {
    expect([200, 404]).toContain(response.status)
    if (response.status === 404) {
      expect(response.data.article).toBeUndefined()
    }
    if (response.status === 200) {
      expect(response.data.article).toEqual(this.validArticle)
    }
  }

  static validateCreateArticleResponse(response) {
    expect(response.status).toEqual(201)
    expect(response.data.article).toEqual(this.validArticle)
  }

  static validateDeleteArticleResponse(response) {
    expect(response.status).toEqual(204)
    expect(response.data.article).toBeUndefined()
  }

  static validateGetCommentsResponse(response) {
    expect(response.status).toEqual(200)
    if (response.data.comments.length > 0) {
      expect(response.data).toEqual({
        comments: expect.any(Array),
        links: {
          next: expect.any(String),
        },
      })
      for (const comment of response.data.comments) {
        expect(comment).toEqual(this.validComment)
      }
    } else {
      expect(response.data).toEqual({
        comments: [],
        links: {},
      })
    }
  }

  static validateCreateCommentResponse(response) {
    expect(response.status).toEqual(201)
    expect(response.data.comment).toEqual(this.validComment)
  }
}
