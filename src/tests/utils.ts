import { DataSource } from 'typeorm'
import { entities } from '../main/database.providers'

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: entities,
  synchronize: true,
})
