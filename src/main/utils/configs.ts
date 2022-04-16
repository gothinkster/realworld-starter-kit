import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { ArticleEntity } from '../domain/articles/typeorm/article.entity'
import { TagEntity } from '../domain/articles/typeorm/tag.entity'

const memoryConnectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [ArticleEntity, TagEntity],
  synchronize: true,
  logging: false,
}
export const testConnectionOptions: DataSourceOptions = {
  ...memoryConnectionOptions,
}

export const localConnectionOptions: DataSourceOptions = {
  ...memoryConnectionOptions,
  database: 'local.sqlite3',
}
