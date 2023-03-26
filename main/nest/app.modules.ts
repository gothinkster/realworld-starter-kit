import { Global, Module } from '@nestjs/common'
import { AccountsController } from '../accounts/accounts.controller'
import { AccountsService } from '../accounts/accounts.service'
import { BasicAuthStrategy } from '../accounts/basic.auth'
import { AuthorsService } from '../authors/service'
import { AuthorsController } from '../authors/authors.controller'
import { ArticlesController } from '../articles/articles.controller'
import { ArticlesService } from '../articles/articles.service'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { AccountEntity } from '../accounts/accounts.entity'
import { ArticleEntity } from '../articles/article.entity'
import { AuthorEntity, UserFollows } from '../articles/author.entity'
import { Tag } from '../articles/tag.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { JWTAuthPassport } from './jwt.strategy'
import { CommentsService } from '../comments/comments.service'
import { CommentsController } from '../comments/comments.controller'
import { CommentEntity } from '../comments/comment.entity'
import { HealthModule } from '../health/health.module'

export function initializePostgresDataSource() {
  return new DataSource({
    type: 'postgres',
    url:
      process.env.DB_URL ||
      'postgres://postgres:postgres@localhost:5432/postgres',
    entities: [
      AccountEntity,
      ArticleEntity,
      AuthorEntity,
      UserFollows,
      CommentEntity,
      Tag,
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
  }).initialize()
}

export const DATASOURCE_PROVIDER = 'DATASOURCE_PROVIDER'
export const databaseProviders: Provider[] = [
  {
    provide: DATASOURCE_PROVIDER,
    useFactory: initializePostgresDataSource,
  },
]

@Global()
@Module({
  providers: [...databaseProviders, JWTAuthPassport],
  exports: [JWTAuthPassport],
})
class GlobalModule {}

@Module({
  providers: [AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
class AccountsModule {}

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
class AuthorsModule {}

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
class ArticlesModule {}

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
class CommentsModule {}

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    CommentsModule,
    AccountsModule,
    HealthModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModules {}
