import { Global, Module } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AccountEntity } from '../accounts/accounts.entity'
import {
  ArticleEntity,
  ArticlesHaveTagsEntity,
  TagEntity,
} from '../articles/articles.repository.typeorm'
import { AuthorEntity, UserFollows } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'
import { JWTAuthPassport } from '../nest/jwt.guard'

let dataSource: DataSource
export function getPostgresDataSource() {
  if (!dataSource) {
    const url =
      process.env.DATABASE_URL ||
      'mysql://realworld:realworld@localhost:3306/realworld'
    const useSsl = url.includes('pscale')

    dataSource = new DataSource({
      type: 'mysql',
      url,
      entities: [
        AccountEntity,
        ArticleEntity,
        AuthorEntity,
        UserFollows,
        CommentEntity,
        TagEntity,
        ArticlesHaveTagsEntity,
      ],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      ssl: {
        requestCert: useSsl,
        rejectUnauthorized: useSsl,
      },
    })
  }
  return dataSource
}

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: () => getPostgresDataSource().initialize(),
    },
    {
      provide: EntityManager,
      useFactory: (dataSource: DataSource) => dataSource.manager,
      inject: [DataSource],
    },
    JWTAuthPassport,
  ],
  exports: [JWTAuthPassport, EntityManager],
})
export class GlobalModule {}
