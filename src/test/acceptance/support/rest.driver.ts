import {
  ArticleCreation,
  ArticleDefinition,
  ArticleEditions,
  ProtocolDriver,
  Users,
} from './interface.driver'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Axios } from 'axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../main/app.module'

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function startNestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
  app.setGlobalPrefix('api')
  await app.listen(getRndInteger(1000, 9999))
  return app
}

export class RestDriver implements ProtocolDriver {
  private app: INestApplication
  private axios: Axios

  public async init(): Promise<void> {
    this.app = await startNestApp()
    this.axios = new Axios({
      baseURL: await this.app.getUrl(),
    })
  }
  stop = () => this.app.close()

  async createArticle(article: ArticleCreation): Promise<ArticleDefinition> {
    const response = await this.axios.post(
      'api/articles',
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
    const response = await this.axios.delete(
      `api/articles/${searchParams.slug}`,
    )
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
      `api/articles/${searchParams.slug}/publication`,
    )
    expect([HttpStatus.CREATED, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async unpublishArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `api/articles/${searchParams.slug}/publication`,
    )
    expect([HttpStatus.NO_CONTENT, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async favoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.post(
      `api/articles/${searchParams.slug}/favorite`,
    )
    expect([HttpStatus.CREATED, HttpStatus.NOT_FOUND]).toContain(
      response.status,
    )
  }

  async unfavoriteArticle(searchParams: ArticleDefinition) {
    const response = await this.axios.delete(
      `api/articles/${searchParams.slug}/favorite`,
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
