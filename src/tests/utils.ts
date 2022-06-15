import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { entities } from '../main/persistence/utils'

export function getTestDataSource(): DataSource {
  const localTestOptions: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    entities: entities,
    dropSchema: true,
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  }
  const DB_URL = process.env.DB_URL
  if (!DB_URL) {
    return new DataSource(localTestOptions)
  }
  return new DataSource({
    ...localTestOptions,
    type: 'postgres',
    url: DB_URL,
  })
}
