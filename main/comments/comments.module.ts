import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { ArticlesModule } from '../articles/articles.module'
import { AuthorsModule } from '../authors/authors.module'

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
