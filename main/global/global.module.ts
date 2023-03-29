import { Global, Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { AccountEntity } from '../accounts/accounts.entity'
import { ArticleEntity, Tag } from '../articles/articles.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { AuthorEntity, UserFollows } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'
import { JWTAuthPassport } from '../nest/jwt.guard'

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
export class GlobalModule {}
