import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'

export const entities = [__dirname + '/**/*.entity{.ts,.js}']

export const localDataSource = new DataSource({
  type: 'sqlite',
  database: 'local.sqlite3',
  entities: entities,
  synchronize: true,
  logging: true,
})

export const DATASOURCE_PROVIDER = 'DATA_SOURCE_PROVIDER'
export const READONLY_DATASOURCE_PROVIDER = 'READONLY_DATASOURCE_PROVIDER'

export const databaseProviders: Provider[] = [
  {
    provide: DATASOURCE_PROVIDER,
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
    useExisting: DATASOURCE_PROVIDER,
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
