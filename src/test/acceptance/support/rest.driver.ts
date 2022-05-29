import { Axios } from 'axios'
import {
  ArticleSnapshot,
  PartialArticleSnapshot,
} from '../../../main/articles/articles.models'
import {
  ArticleDefinition,
  createCredentials,
  ProtocolDriver,
  Users,
} from './interface.driver'

export class RestDriver implements ProtocolDriver {
  private user: Users
  private static userAuth = {}

  public static async createAccounts(axios: Axios) {
    await Promise.all(
      Object.keys(Users).map(async (key) => {
        const user: Users = Users[key]
        const signup = await axios.post('accounts/signup', {
          user: createCredentials(user),
        })
        RestDriver.userAuth[user] = `Bearer ${signup.data.access_token}`
      }),
    )
  }
  public static async createProfiles(axios) {
    return await Promise.all(
      Object.keys(Users).map(async (key) => {
        const user: Users = Users[key]
        return await axios.post(
          'profiles',
          {
            profile: {
              username: user,
              bio: 'a2frasf',
              image: 'af2fasf',
            },
          },
          {
            headers: {
              Authorization: RestDriver.userAuth[user],
            },
          },
        )
      }),
    )
  }

  constructor(private axios: Axios) {}

  async login(user: Users) {
    this.user = user
  }

  private getAuth(): string {
    return RestDriver.userAuth[this.user]
  }

  async getCurrentUser(): Promise<Users> {
    return this.user
  }

  async createArticle(article: ArticleSnapshot): Promise<ArticleDefinition> {
    const headers = {
      Authorization: this.getAuth(),
    }
    console.log(headers)
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
      article: article,
    })

    return {
      author: response.data.article.author.username,
      slug: response.data.article.slug,
    }
  }

  async deleteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(`articles/${searchParams.slug}`, {
      headers: {
        Authorization: this.getAuth(),
      },
    })
    expect(response.status).toBe(204)
  }

  async findArticle(
    article: ArticleDefinition,
  ): Promise<ArticleSnapshot | null> {
    const response = await this.axios.get(`articles/${article.slug}`, {
      headers: {
        Authorization: this.getAuth(),
      },
    })
    if (response.data?.article) {
      expect(response.status).toBe(200)
      const articleResponse = response.data.article
      return {
        title: articleResponse.title,
        description: articleResponse.description,
        body: articleResponse.body,
        tags: articleResponse.tags,
      }
    } else {
      expect(response.status).toBe(404)
      return null
    }
  }

  async editArticle(
    searchParams: ArticleDefinition,
    editions: PartialArticleSnapshot,
  ): Promise<ArticleDefinition> {
    return undefined
  }

  async publishArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.post(
      `articles/${searchParams.slug}/publication`,
      undefined,
      { headers: { Authorization: this.getAuth() } },
    )
  }

  async unpublishArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `articles/${searchParams.slug}/publication`,
      { headers: { Authorization: this.getAuth() } },
    )
  }

  async favoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.post(
      `articles/${searchParams.slug}/favorite`,
    )
  }

  async unfavoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `articles/${searchParams.slug}/favorite`,
    )
  }

  async follow(user: Users) {}

  async unfollow(user: Users) {}

  async commentOnArticle(article: ArticleDefinition, comment: string) {}
}
