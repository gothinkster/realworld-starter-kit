import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AccountEntity } from './accounts/accounts.entity.js'
import {
  ArticleEntity,
  ArticlesHaveTagsEntity,
  TagEntity,
} from './articles/articles.repository.typeorm.js'
import { AuthorEntity, UserFollows } from './authors/authors.entity.js'
import { CommentEntity } from './comments/comments.entity.js'

let dataSource

export default function getDataSourceInstance() {
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
      ssl: useSsl
        ? {
            requestCert: true,
            rejectUnauthorized: true,
          }
        : undefined,
    })
  }
  return dataSource
}
