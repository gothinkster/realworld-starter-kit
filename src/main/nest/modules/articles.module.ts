import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { ArticlesService } from '../../domain/articles/articles.service'
import { AuthorsService } from '../../domain/authors/service'
import { ArticleEntity } from '../../persistence/article.entity'
import { ArticlesController } from '../controllers/articles.controller'
import { DATASOURCE_PROVIDER } from '../providers/database.providers'
import { AuthorsModule } from './authors.module'

const ArticlesServiceProvider: Provider = {
  provide: ArticlesService,
  useFactory: (dataSource: DataSource, authorsService: AuthorsService) =>
    new ArticlesService(
      dataSource.getRepository(ArticleEntity),
      authorsService,
    ),
  inject: [DATASOURCE_PROVIDER, AuthorsService],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [ArticlesServiceProvider],
  exports: [ArticlesService],
})
export class ArticlesModule {}
