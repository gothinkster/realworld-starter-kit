import { Global, Module } from '@nestjs/common'
import { JWTAuthPassport } from '../nest/jwt.strategy'
import { DataSource } from 'typeorm'
import { AccountEntity } from '../accounts/accounts.entity'
import { ArticleEntity } from '../articles/article.entity'
import { AuthorEntity, UserFollows } from '../articles/author.entity'
import { CommentEntity } from '../comments/comment.entity'
import { Tag } from '../articles/tag.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'

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
