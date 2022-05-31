import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'

const entities = [__dirname + '/**/*.entity{.ts,.js}']

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: entities,
  synchronize: true,
  logging: true,
})

export const localDataSource = new DataSource({
  type: 'sqlite',
  database: 'local.sqlite3',
  entities: entities,
  synchronize: true,
  logging: true,
})

export const DATA_SOURCE_PROVIDER = 'DATA_SOURCE_PROVIDER'
export const READONLY_DATASOURCE_PROVIDER = 'READONLY_DATASOURCE_PROVIDER'

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE_PROVIDER,
    useFactory: async () => {
      let dataSource: DataSource
      if (!process.env.DB_URL) {
        dataSource = localDataSource
      } else {
        dataSource = new DataSource({
          type: 'postgres',
          url: process.env.DB_URL,
          entities: entities,
          logging: false,
        })
      }
      return dataSource.initialize()
    },
  },
]

if (!process.env.READONLY_DB_URL) {
  databaseProviders.push({
    provide: READONLY_DATASOURCE_PROVIDER,
    useExisting: DATA_SOURCE_PROVIDER,
  })
} else {
  databaseProviders.push({
    provide: READONLY_DATASOURCE_PROVIDER,
    useFactory: () =>
      new DataSource({
        type: 'postgres',
        url: process.env.READONLY_DB_URL,
        entities: entities,
        logging: false,
      }).initialize(),
  })
}
