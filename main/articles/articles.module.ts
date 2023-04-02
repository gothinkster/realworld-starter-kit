import { Module } from '@nestjs/common'
import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { AuthorsModule } from '../authors/authors.module'
import {
  TypeORMArticlesRepository,
  TypeORMTagsRepository,
} from './articles.repository.typeorm'
import { AuthorsService } from '../authors/authors.service'

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [
    {
      provide: ArticlesService,
      useFactory: (authorsService: AuthorsService) => {
        return new ArticlesService(
          authorsService,
          new TypeORMTagsRepository(),
          new TypeORMArticlesRepository(),
        )
      },
      inject: [AuthorsService],
    },
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
