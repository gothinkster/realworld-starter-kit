import { Module } from '@nestjs/common'
import { ArticlesController } from './controllers/articles.controller'
import { CommentsController } from './controllers/comments.controller'
import { ProfilesController } from './controllers/profiles.controller'

@Module({
  controllers: [ArticlesController, CommentsController, ProfilesController],
})
export class RestModule {}
