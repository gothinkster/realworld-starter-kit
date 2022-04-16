import { Module } from '@nestjs/common'
import { ArticlesController } from './controllers/articles.controller'
import { CommentsController } from './controllers/comments.controller'
import { ProfilesController } from './controllers/profiles.controller'
import {
  AuthController,
  UsersController,
} from './controllers/accounts.controller'

@Module({
  controllers: [
    ArticlesController,
    CommentsController,
    ProfilesController,
    AuthController,
    UsersController,
  ],
})
export class RestModule {}
