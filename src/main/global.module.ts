import { Global, Module, Scope } from '@nestjs/common'
import { Connection, createConnection } from 'typeorm'
import { ArticleEntity } from './articles/persistence/article.entity'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { TagEntity } from './articles/persistence/tag.entity'
import { AccountEntity } from './accounts/models/account.entity'
import { JWTAuthPassport } from './utils/jwt.strategy'

function connectionSettings(): DataSourceOptions {
  const entities = [ArticleEntity, TagEntity, AccountEntity]
  const sqliteOption: DataSourceOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    logging: false,
    entities: entities,
    synchronize: true,
  }
  if (process.env.NODE_ENV === 'test') {
    return sqliteOption
  }
  if (!process.env.DB_URL) {
    return {
      ...sqliteOption,
      database: 'local.sqlite3',
      dropSchema: false,
    }
  }
  return {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: entities,
    synchronize: true,
  }
}

export const dbProvider: Provider = {
  provide: Connection,
  useFactory: () => createConnection(connectionSettings()),
  scope: Scope.DEFAULT,
}

@Global()
@Module({
  providers: [dbProvider, JWTAuthPassport],
  exports: [dbProvider, JWTAuthPassport],
})
export class GlobalModule {}
