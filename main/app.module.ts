import { Module } from '@nestjs/common'
import { GlobalModule } from './global/global.module'
import { AccountsModule } from './accounts/accounts.module'
import { CommentsModule } from './comments/comments.module'
import { ArticlesModule } from './articles/articles.module'
import { AuthorsModule } from './authors/authors.module'
import { ChecksController } from './nest/checks.controller'

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    CommentsModule,
    AccountsModule,
    ArticlesModule,
    GlobalModule,
  ],
  controllers: [ChecksController],
  providers: [],
})
export class AppModule {}
