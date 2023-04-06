import { Module } from '@nestjs/common'
import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { AuthorsModule } from '../authors/authors.module'
import {
  TypeORMArticlesRepository,
  TypeORMTagsRepository,
} from './articles.repository.typeorm'
import { AuthorsService } from '../authors/authors.service'
import { EntityManager } from 'typeorm'

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [
    {
      provide: ArticlesService,
      useFactory: (
        authorsService: AuthorsService,
        entityManager: EntityManager,
      ) => {
        return new ArticlesService(
          authorsService,
          new TypeORMTagsRepository(entityManager),
          new TypeORMArticlesRepository(entityManager),
        )
      },
      inject: [AuthorsService, EntityManager],
    },
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
