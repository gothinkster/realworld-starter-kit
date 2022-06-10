import { Module, Scope } from '@nestjs/common'
import { ArticlesService } from '../../domain/articles/articles.service'
import { AuthorsService } from '../../domain/authors/service'
import { ArticlesController } from '../controllers/articles.controller'
import { AuthorsModule } from './authors.module'

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [
    {
      provide: ArticlesService,
      useFactory: (authors: AuthorsService) => new ArticlesService(authors),
      inject: [AuthorsService],
      scope: Scope.DEFAULT,
    },
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
