import { Module } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { AuthorsModule } from '../authors/authors.module'
import { AuthorsService } from '../authors/authors.service'
import { ArticlesController } from './articles.controller'
import {
  TypeORMArticlesRepository,
  TypeORMTagsRepository,
} from './articles.repository.typeorm'
import { ArticlesService } from './articles.service'

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
