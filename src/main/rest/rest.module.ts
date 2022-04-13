import { Module } from '@nestjs/common'
import { ArticlesLifecycleController } from './controllers/articles.controller'
import { CommentsController } from './controllers/comments.controller'
import { ProfilesController } from './controllers/profiles.controller'
import {
  AuthController,
  UsersController,
} from './controllers/accounts.controller'
import { ReadingController } from './controllers/reading.controller'

@Module({
  controllers: [
    ArticlesLifecycleController,
    ReadingController,
    CommentsController,
    ProfilesController,
    AuthController,
    UsersController,
  ],
})
export class RestModule {}
