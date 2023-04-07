import { Module } from '@nestjs/common'
import { ArticlesModule } from '../articles/articles.module'
import { AuthorsModule } from '../authors/authors.module'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
