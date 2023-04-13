import { Module } from '@nestjs/common'
import { ArticlesModule } from '../articles/articles.module'
import { AuthorsModule } from '../authors/authors.module'
import { CommentsController } from './comments.controller'
import { CommentsRepository } from './comments.repository'

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
