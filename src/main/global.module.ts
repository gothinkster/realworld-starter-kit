import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection, createConnection } from 'typeorm'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { AccountEntity } from './accounts/models/accounts.entity'
import { ArticleEntity } from './articles/persistence/article.entity'
import { TagEntity } from './articles/persistence/tag.entity'
import {
  FollowersRelation,
  ProfileEntity,
} from './profiles/persistence/profiles.entity'
import { JWTAuthPassport } from './utils/jwt.strategy'

function connectionSettings(): DataSourceOptions {
  const entities = [
    ArticleEntity,
    TagEntity,
    AccountEntity,
    ProfileEntity,
    FollowersRelation,
  ]
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

@Module({
  providers: [dbProvider, JWTAuthPassport],
  exports: [dbProvider, JWTAuthPassport],
})
export class GlobalModule {}
