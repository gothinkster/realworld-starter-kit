import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { ArticleEntity } from '../../main/articles/persistence/article.entity'
import { TagEntity } from '../../main/articles/persistence/tag.entity'

const memoryConnectionOptions: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [ArticleEntity, TagEntity],
  synchronize: true,
  logging: false,
}
export const testConnectionOptions: DataSourceOptions = memoryConnectionOptions
