import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { DATASOURCE_PROVIDER } from '../database.providers'
import { ProfilesModule } from '../profiles/profiles.module'
import { ProfilesService } from '../profiles/profiles.service'
import { ArticlesService } from './articles.service'
import { ArticlesLifecycleController } from './cms/cms.controller'
import { CommentsController } from './comments/comments.controller'
import { ArticleEntity } from './persistence/article.entity'
import { ArticlesViewsController } from './views/views.controller'

const ArticlesProvider: Provider = {
  provide: ArticlesService,
  useFactory: (dataSource: DataSource, profilesService: ProfilesService) =>
    new ArticlesService(
      dataSource.getRepository(ArticleEntity),
      profilesService,
    ),
  inject: [DATASOURCE_PROVIDER, ProfilesService],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [ProfilesModule],
  controllers: [
    ArticlesViewsController,
    ArticlesLifecycleController,
    CommentsController,
  ],
  providers: [ArticlesProvider],
  exports: [ArticlesService],
})
export class ArticlesModule {}
