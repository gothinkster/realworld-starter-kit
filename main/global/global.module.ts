import { Global, Module } from '@nestjs/common'
import { DataSource, EntityManager } from 'typeorm'
import { AccountEntity } from '../accounts/accounts.entity'
import {
  ArticleEntity,
  ArticlesHaveTagsEntity,
  TagEntity,
} from '../articles/articles.repository.typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AuthorEntity, UserFollows } from '../authors/authors.entity'
import { CommentEntity } from '../comments/comments.entity'
import { JWTAuthPassport } from '../nest/jwt.guard'

let dataSource: DataSource
export function getPostgresDataSource() {
  if (!dataSource) {
    dataSource = new DataSource({
      type: 'mysql',
      url:
        process.env.DATABASE_URL ||
        'mysql://realworld:realworld@localhost:3306/realworld',
      database: 'realworld',
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
