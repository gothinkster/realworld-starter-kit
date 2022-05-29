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
  private usersAccesses = {
    [Users.Me]: createCredentials(Users.Me),
    [Users.Costello]: createCredentials(Users.Costello),
    [Users.Abbott]: createCredentials(Users.Abbott),
  }
  private user: Users

  constructor(private axios: Axios) {}

  private getAuth(): string {
    return `Bearer ${this.usersAccesses[this.user].token}`
  }

  async createArticle(article: ArticleSnapshot): Promise<ArticleDefinition> {
    const response = await this.axios.post(
      'articles',
      {
        article: article,
      },
      {
        headers: {
          Authorization: this.getAuth(),
        },
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

  async getCurrentUser(): Promise<Users> {
    return undefined
  }

  async login(user: Users) {
    this.user = user
    const userAccess = this.usersAccesses[this.user]
    if (!userAccess.token) {
      const response = await this.axios.post('accounts/signup', {
        user: userAccess.access,
      })
      userAccess.token = response.data.access_token
      const profile = await this.axios.post(
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
            Authorization: this.getAuth(),
          },
        },
      )
    }
  }
}
