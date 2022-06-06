import { Axios } from 'axios'
import {
  Article,
  ArticleFields,
  Sluged,
} from '../../../main/domain/articles/models'
import { createCredentials } from './factories/credentials.factory'
import { ArticleSearch, ProtocolDriver } from './protocol.driver'

export class RestDriver implements ProtocolDriver {
  private username: string
  private static userAuth: { [key: string]: string } = {}

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
  public static async createProfiles(axios: Axios, usernames: string[]) {
    const profiles = await Promise.all(
      usernames.map(async (username) => {
        return await axios.post(
          'profiles',
          {
            profile: {
              username: username,
              bio: `Me chamo ${username}`,
              image: 'af2fasf',
            },
          },
          {
            headers: {
              Authorization: RestDriver.userAuth[username],
            },
          },
        )
      }),
    )
    return profiles
  }

  constructor(private axios: Axios) {}

  async login(username: string) {
    this.username = username
  }

  async follow(username: string) {}

  async unfollow(username: string) {}

  private getAuth(): string {
    return RestDriver.userAuth[this.username]
  }

  async writeArticle(article: Article): Promise<string> {
    const headers = {
      Authorization: this.getAuth(),
    }
    const response = await this.axios.post(
      'articles',
      {
        article: article,
      },
      {
        headers: headers,
      },
    )
    expect(response.data).toMatchObject({
      article: { ...article, tags: article.tags.sort() },
    })

    return response.data.article.slug
  }

  async deleteArticle(slug: string) {
    const response = await this.axios.delete(`articles/${slug}`, {
      headers: {
        Authorization: this.getAuth(),
      },
    })
    expect(response.status).toBe(204)
  }

  async getArticle(slug: string): Promise<Article | null> {
    const response = await this.axios.get(`articles/${slug}`, {
      headers: {
        Authorization: this.getAuth(),
      },
    })
    if (response.data?.article) {
      expect(response.status).toBe(200)
      const article = response.data.article
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tags: article.tags,
      }
    } else {
      expect(response.status).toBe(404)
      return null
    }
  }

  private async findArticles(
    filters: ArticleSearch,
  ): Promise<Sluged<Article>[]> {
    const response = await this.axios.get(`articles/`, {
      headers: {
        Authorization: this.getAuth(),
      },
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
    const response = await this.axios.post(
      `articles/${slug}/publication`,
      undefined,
      { headers: { Authorization: this.getAuth() } },
    )
    expect(response.status).toBe(201)
  }

  async unpublishArticle(slug: string) {
    const response = await this.axios.delete(`articles/${slug}/publication`, {
      headers: { Authorization: this.getAuth() },
    })
  }

  async commentOnArticle(slug: string, comment: string) {}
}
