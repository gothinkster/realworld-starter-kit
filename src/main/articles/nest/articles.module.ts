import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { GlobalModule } from '../../global.module'
import { ProfilesModule } from '../../profiles/nest/profiles.module'
import { ArticlesService } from '../articles.service'
import { ArticleEntity } from '../persistence/article.entity'
import { CMSPersistenceTypeORM } from '../persistence/persistence.impl'
import { ArticlesLifecycleController } from './controllers/cms.controller'
import { CommentsController } from './controllers/comments.controller'
import { ArticlesViewsController } from './controllers/views.controller'

const CMSPersistenceTypeORMProvider: Provider = {
  provide: CMSPersistenceTypeORM,
  useFactory: (connection: Connection) =>
    new CMSPersistenceTypeORM(connection.getRepository(ArticleEntity)),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

const ArticlesProvider: Provider = {
  provide: ArticlesService,
  useFactory: (persistence: CMSPersistenceTypeORM) =>
    new ArticlesService(persistence, persistence),
  inject: [CMSPersistenceTypeORM],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [GlobalModule, ProfilesModule],
  controllers: [
    ArticlesLifecycleController,
    ArticlesViewsController,
    CommentsController,
  ],
  providers: [ArticlesProvider, CMSPersistenceTypeORMProvider],
  exports: [ArticlesService],
})
export class ArticlesModule {}
