import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { ProfilesModule } from '../profiles/profiles.module'
import { ArticlesService } from './articles.service'
import { ArticlesLifecycleController } from './cms/cms.controller'
import { CommentsController } from './comments/comments.controller'
import { ArticlesTypeORMPersistence } from './persistence/persistence.impl'
import { ArticlesViewsController } from './views/views.controller'

const ArticlesProvider: Provider = {
  provide: ArticlesService,
  useFactory: (persistence: ArticlesTypeORMPersistence) =>
    new ArticlesService(persistence),
  inject: [ArticlesTypeORMPersistence],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [ProfilesModule],
  controllers: [
    ArticlesViewsController,
    ArticlesLifecycleController,
    CommentsController,
  ],
  providers: [ArticlesProvider, ArticlesTypeORMPersistence],
  exports: [ArticlesService],
})
export class ArticlesModule {}
