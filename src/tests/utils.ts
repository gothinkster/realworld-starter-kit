import { DataSource } from 'typeorm'
import { entities } from '../main/persistence/utils'

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: entities,
  synchronize: true,
  logging: false,
})
