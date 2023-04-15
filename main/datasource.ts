import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AccountEntity } from './accounts/accounts.entity'
import {
  ArticleEntity,
  ArticlesHaveTagsEntity,
  TagEntity,
} from './articles/articles.repository.typeorm'
import { AuthorEntity, UserFollows } from './authors/authors.entity'
import { CommentEntity } from './comments/comments.repository'
import { getEnvs } from './environment'

export function createDataSourceInstance(opts?: Partial<DataSourceOptions>) {
  const { DATABASE_URL } = getEnvs()

  const url =
    DATABASE_URL ?? 'mysql://realworld:realworld@localhost:3306/realworld'

  const pscaleDatabase = url.includes('pscale')

  let config: DataSourceOptions = {
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
    migrations: ['migrations/*.ts'],
    migrationsTransactionMode: 'each',
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    ssl: pscaleDatabase
      ? {
          requestCert: true,
          rejectUnauthorized: true,
        }
      : undefined,
  }
  if (opts) {
    config = Object.assign(config, opts)
  }

  return new DataSource(config)
}

export function createUnitTestDataSource() {
  return createDataSourceInstance({
    url: 'mysql://realworld:realworld@localhost:3306/realworld',
    logging: Boolean(process.env.DEBUG),
  })
}
