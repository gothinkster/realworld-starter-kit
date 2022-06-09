import { Axios } from 'axios'
import {
  Article,
  ArticleFields,
  Sluged,
} from '../../../main/domain/articles/models'
import { createCredentials } from './factories/credentials.factory'
import { ArticleSearch, ProtocolDriver } from './protocol.driver'

export class RestDriver implements ProtocolDriver {
  private static userAuth: { [key: string]: string } = {}
  private username: string

  public static async createAccounts(axios: Axios, usernames: string[]) {
    const accounts = await Promise.all(
      usernames.map(async (username) => {
        const signup = await axios.post('accounts/signup', {
          user: createCredentials(username),
        })
        if (signup.data.access_token) {
          RestDriver.userAuth[username] = `Bearer ${signup.data.access_token}`
        }
      }),
    )
    return accounts
  }

  constructor(private axios: Axios) {}

  async login(username: string) {
    this.username = username
    const auth = RestDriver.userAuth[username]
    expect(auth).toBeDefined()
    this.axios.defaults.headers.common = { Authorization: auth }
  }

  async createProfile() {
    const response = await this.axios.post('profiles', {
      profile: {
        username: this.username,
        bio: `Me chamo ${this.username}`,
        image: 'af2fasf',
      },
    })
    expect(response.status).toBe(201)
  }

  async follow(username: string) {
    const response = await this.axios.post(`profiles/${username}/follow`, '')
    expect(response.status).toBe(201)
  }

  async unfollow(username: string) {
    const response = await this.axios.delete(`profiles/${username}/follow`)
    expect(response.status).toBe(204)
  }

  async writeArticle(article: Article): Promise<string> {
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

  private async findArticles(
    filters: ArticleSearch,
  ): Promise<Sluged<Article>[]> {
    const response = await this.axios.get(`articles/`, {
      params: {
        author: filters.author,
        tags: filters.tags?.join(','),
      },
    })
    expect(response.status).toBe(200)
    return response.data.articles
  }

  async shouldFindArticleBy(filters: ArticleSearch, slug: string) {
    const articles = await this.findArticles(filters)
    expect(articles.map((v) => v.slug)).toContainEqual(slug)
  }

  async shouldNotFindArticleBy(filters: ArticleSearch, slug: string) {
    const articles = await this.findArticles(filters)
    expect(articles.map((v) => v.slug)).not.toContainEqual(slug)
  }

  async editArticle(slug: string, editions: ArticleFields): Promise<string> {
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
      comment,
    })
    expect(response.status).toBe(201)
  }

  private async getFeed(): Promise<Sluged<Article>[]> {
    const response = await this.axios.get(`articles/feed`)
    expect(response.status).toBe(200)
    return response.data.articles
  }

  async shouldSeeTheArticleInTheFeed(slug: string): Promise<void> {
    const feed = await this.getFeed()
    expect(feed.map((v) => v.slug)).toContainEqual(slug)
  }
  async shouldNotSeeTheArticleInTheFeed(slug: string): Promise<void> {
    const feed = await this.getFeed()
    expect(feed.map((v) => v.slug)).not.toContainEqual(slug)
  }

  private async getArticle(slug: string) {
    const response = await this.axios.get(`articles/${slug}`)
    expect(response.status).not.toBe(500)
    return response
  }

  async shouldFindTheArticle(slug: string): Promise<void> {
    const response = await this.getArticle(slug)
    expect(response.status).toBe(200)
    expect(response.data.article).toBeTruthy()
  }
  async shouldNotFindTheArticle(slug: string): Promise<void> {
    const response = await this.getArticle(slug)
    expect(response.status).toBe(404)
    expect(response.data.article).toBeFalsy()
  }
}
