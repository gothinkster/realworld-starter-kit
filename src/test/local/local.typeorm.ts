import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { ArticleEntity } from '../../main/domain/articles/typeorm/article.entity'
import { TagEntity } from '../../main/domain/articles/typeorm/tag.entity'

const memoryConnectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  // database: 'local.sqlite3',
  dropSchema: true,
  entities: [ArticleEntity, TagEntity],
  synchronize: true,
  logging: false,
}
export const testConnectionOptions: DataSourceOptions = memoryConnectionOptions
