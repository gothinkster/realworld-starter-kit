import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { GlobalModule } from '../../global.module'
import { ProfilesModule } from '../../profiles/nest/profiles.module'
import { ArticlesService } from '../articles.service'
import { ArticlesTypeORMPersistence } from '../persistence/persistence.impl'
import { ArticlesLifecycleController } from './controllers/cms.controller'
import { CommentsController } from './controllers/comments.controller'
import { ArticlesViewsController } from './controllers/views.controller'

const ArticlesProvider: Provider = {
  provide: ArticlesService,
  useFactory: (persistence: ArticlesTypeORMPersistence) =>
    new ArticlesService(persistence, persistence),
  inject: [ArticlesTypeORMPersistence],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [GlobalModule, ProfilesModule],
  controllers: [
    ArticlesLifecycleController,
    ArticlesViewsController,
    CommentsController,
  ],
  providers: [ArticlesProvider, ArticlesTypeORMPersistence],
  exports: [ArticlesService],
})
export class ArticlesModule {}
