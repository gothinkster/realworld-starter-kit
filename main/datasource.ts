import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AccountEntity } from './accounts/accounts.entity'
import {
  ArticleEntity,
  ArticlesHaveTagsEntity,
  TagEntity,
} from './articles/articles.repository.typeorm'
import { AuthorEntity, UserFollows } from './authors/authors.entity'
import { CommentEntity } from './comments/comments.repository'

let dataSource

export default function getDataSourceInstance() {
  if (!dataSource) {
    const url =
      process.env.DATABASE_URL ||
      'mysql://realworld:realworld@localhost:3306/realworld'
    const production = url.includes('pscale')

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
      synchronize: !production,
      namingStrategy: new SnakeNamingStrategy(),
      ssl: production
        ? {
            requestCert: true,
            rejectUnauthorized: true,
          }
        : undefined,
    })
  }
  return dataSource
}
