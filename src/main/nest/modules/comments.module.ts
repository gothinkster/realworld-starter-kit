import { Module } from '@nestjs/common'
import { CommentsService } from '../../domain/comments/comments.service'
import { CommentsController } from '../controllers/comments.controller'
import { ArticlesModule } from './articles.module'
import { AuthorsModule } from './authors.module'

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
