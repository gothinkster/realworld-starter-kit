import { Global, Module } from '@nestjs/common'
import { AccountsService } from '../accounts/accounts.service'
import { BasicAuthStrategy } from '../accounts/basic.auth'
import { ArticlesService } from '../domain/articles/articles.service'
import { AuthorsService } from '../domain/authors/service'
import { CommentsService } from '../domain/comments/comments.service'
import { AccountsController } from './controllers/accounts.controller'
import { ArticlesController } from './controllers/articles.controller'
import { AuthorsController } from './controllers/authors.controller'
import { CommentsController } from './controllers/comments.controller'
import { databaseProviders } from './db.providers'
import { JWTAuthPassport } from './security/jwt.strategy'

@Global()
@Module({
  providers: [...databaseProviders, JWTAuthPassport],
  exports: [JWTAuthPassport],
})
class GlobalModule {}

@Module({
  providers: [AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
class AccountsModule {}

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
class AuthorsModule {}

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
class ArticlesModule {}

@Module({
  imports: [ArticlesModule, AuthorsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
class CommentsModule {}

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    CommentsModule,
    AccountsModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModules {}
