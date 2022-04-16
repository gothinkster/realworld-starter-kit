import { Module, Scope } from '@nestjs/common'
import { ArticlesService } from './domain/articles/articles.service'
import { Connection, createConnection } from 'typeorm'
import { CMSPersistenceTypeORM } from './domain/articles/typeorm/persistence.impl'
import { ArticleEntity } from './domain/articles/typeorm/article.entity'
import { ProfilesService } from './domain/profiles/profiles.service'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { TagEntity } from './domain/articles/typeorm/tag.entity';

function connectionSettings(): DataSourceOptions {
  const entities = [ArticleEntity, TagEntity]
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
      dropSchema: false
    }
  }
  return {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: entities,
    synchronize: true,
  }
}

const dbProvider: Provider = {
  provide: 'DB_CONNECTION',
  useFactory: () => createConnection(connectionSettings()),
  scope: Scope.DEFAULT,
}

const articlesProvider: Provider = {
  provide: ArticlesService,
  useFactory: (connection: Connection) =>
    new ArticlesService(
      new CMSPersistenceTypeORM(connection.getRepository(ArticleEntity)),
    ),
  inject: [dbProvider.provide],
  scope: Scope.DEFAULT,
}

@Module({
  providers: [dbProvider, articlesProvider, ProfilesService],
  exports: [ArticlesService, ProfilesService],
})
export class AppProviders {}
