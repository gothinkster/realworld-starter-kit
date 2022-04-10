import {
  Article,
  ArticleDefinition,
  ArticleEditions,
  ProtocolDriver,
  Users,
} from './interface.driver'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../main/app.module'

export class RestDriver implements ProtocolDriver {
  private app: INestApplication

  public async init(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    this.app = moduleFixture.createNestApplication()
    await this.app.init()
  }
  public async stop(): Promise<void> {
    await this.app.close()
  }

  commentOnArticle(article: ArticleDefinition, comment: string) {}

  createArticle(article: Article): ArticleDefinition {
    return undefined
  }

  deleteArticle(searchParams: ArticleDefinition): void {}

  editArticle(
    searchParams: ArticleDefinition,
    editions: ArticleEditions,
  ): void {}

  favoriteArticle(searchParams: ArticleDefinition): void {}

  follow(user: Users): void {}

  getCurrentUser(): Users {
    return undefined
  }

  loginAs(user: Users) {}

  publishArticle(searchParams: ArticleDefinition): void {}

  unfavoriteArticle(searchParams: ArticleDefinition): void {}

  unfollow(user: Users): void {}

  unpublishArticle(searchParams: ArticleDefinition): void {}
}
