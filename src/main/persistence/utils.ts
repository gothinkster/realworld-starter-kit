import { DataSource } from 'typeorm'

export const entities = [`${__dirname}/*.entity{.ts,.js}`]

function getLocalDataSource(): DataSource {
  return new DataSource({
    type: 'sqlite',
    database: 'local.sqlite3',
    entities: entities,
    synchronize: true,
  })
}

export function getRemoteDataSource(dbUrl: string): DataSource {
  return new DataSource({
    type: 'postgres',
    url: dbUrl,
    entities: entities,
  })
}

export function getDataSource(): DataSource {
  if (!process.env.DB_URL) {
    return getLocalDataSource()
  } else {
    return getRemoteDataSource(process.env.DB_URL)
  }
}
