import {
  ArticleCreation,
  ArticleDefinition,
  ArticleEditions,
  ProtocolDriver,
  Users,
} from './interface.driver'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Axios } from 'axios'
import { connectToNestApp } from './rest.connection'

export class RestDriver implements ProtocolDriver {
  private app: INestApplication
  private axios: Axios

  public async init(): Promise<void> {
    const connectionObj = await connectToNestApp()
    this.app = connectionObj.app
    this.axios = new Axios({
      baseURL: connectionObj.url,
    })
  }
  stop = () => this.app?.close()

  async createArticle(article: ArticleCreation): Promise<ArticleDefinition> {
    const response = await this.axios.post(
      'articles',
      JSON.stringify({
        article: article,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    const body = JSON.parse(response.data)

    expect([HttpStatus.CREATED, HttpStatus.CONFLICT]).toContain(response.status)
    expect(body).toMatchObject({
      article: article,
    })

    return {
      author: body.article.author.username,
      slug: body.article.slug,
    }
  }

  async deleteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(`articles/${searchParams.slug}`)
    expect(response.status).toBe(204)
  }

  async editArticle(
    searchParams: ArticleDefinition,
    editions: ArticleEditions,
  ): Promise<ArticleDefinition> {
    return undefined
  }

  async publishArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.post(
      `articles/${searchParams.slug}/publication`,
    )
    expect([HttpStatus.CREATED, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async unpublishArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `articles/${searchParams.slug}/publication`,
    )
    expect([HttpStatus.NO_CONTENT, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async favoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.post(
      `articles/${searchParams.slug}/favorite`,
    )
    expect([HttpStatus.CREATED, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async unfavoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `articles/${searchParams.slug}/favorite`,
    )
    expect([HttpStatus.NO_CONTENT, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async follow(user: Users) {}

  async unfollow(user: Users) {}

  async commentOnArticle(article: ArticleDefinition, comment: string) {}

  async getCurrentUser(): Promise<Users> {
    return undefined
  }

  async loginAs(user: Users) {}
}
