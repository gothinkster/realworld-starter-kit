import { Module } from '@nestjs/common'
import { ArticlesService } from '../../domain/articles/articles.service'
import { AuthorsService } from '../../domain/authors/service'
import { CommentsService } from '../../domain/comments/comments.service'
import { CommentsController } from '../controllers/comments.controller'
import { ArticlesModule } from './articles.module'
import { AuthorsModule } from './authors.module'

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [
    {
      provide: CommentsService,
      useFactory: (articles: ArticlesService, authors: AuthorsService) =>
        new CommentsService(articles, authors),
      inject: [ArticlesService, AuthorsService],
    },
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
