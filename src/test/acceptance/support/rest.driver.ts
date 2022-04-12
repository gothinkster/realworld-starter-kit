import {
  ArticleCreation,
  ArticleDefinition,
  ArticleEditions,
  ProtocolDriver,
  Users,
} from './interface.driver'
import { INestApplication } from '@nestjs/common'
import { Axios } from 'axios'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../main/app.module'

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function appFactory() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
  app.setGlobalPrefix('api')
  await app.listen(getRndInteger(1000, 9999))
  return app
}

async function axiosFactory(app: INestApplication): Promise<Axios> {
  return new Axios({
    baseURL: await app.getUrl(),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export class RestDriver implements ProtocolDriver {
  private app: INestApplication
  private axios: Axios

  public async init(): Promise<void> {
    this.app = await appFactory()
    this.axios = await axiosFactory(this.app)
  }
  stop = () => this.app.close()

  async commentOnArticle(article: ArticleDefinition, comment: string) {}

  async createArticle(article: ArticleCreation): Promise<ArticleDefinition> {
    const response = await this.axios.post(
      'api/articles',
      JSON.stringify({
        article: article,
      }),
    )
    const body = JSON.parse(response.data)

    expect(response.status).toBe(201)
    expect(body).toMatchObject({
      article: article,
    })

    return {
      author: body.article.author.username,
      slug: body.article.slug,
    }
  }

  async deleteArticle(searchParams: ArticleDefinition) {}

  async editArticle(
    searchParams: ArticleDefinition,
    editions: ArticleEditions,
  ): Promise<ArticleDefinition> {
    return undefined
  }

  async favoriteArticle(searchParams: ArticleDefinition) {}

  async follow(user: Users) {}

  async getCurrentUser(): Promise<Users> {
    return undefined
  }

  async loginAs(user: Users) {}

  async publishArticle(searchParams: ArticleDefinition) {}

  async unfavoriteArticle(searchParams: ArticleDefinition) {}

  async unfollow(user: Users) {}

  async unpublishArticle(searchParams: ArticleDefinition) {}
}
