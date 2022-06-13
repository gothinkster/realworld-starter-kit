import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { entities, getRemoteDataSource } from '../main/persistence/utils'

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: entities,
  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
})

export function getAcceptanceTestsDataSource(): DataSource {
  const DB_URL = process.env.DB_URL
  if (!DB_URL) {
    return testDataSource
  }
  return getRemoteDataSource(DB_URL)
}
