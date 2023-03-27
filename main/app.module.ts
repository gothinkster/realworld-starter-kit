import { Module } from '@nestjs/common'
import { GlobalModule } from './global/global.module'
import { AccountsModule } from './accounts/accounts.module'
import { CommentsModule } from './comments/comments.module'
import { ChecksModule } from './checks/checks.module'
import { ArticlesModule } from './articles/articles.module'
import { AuthorsModule } from './authors/authors.module'

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    CommentsModule,
    AccountsModule,
    ArticlesModule,
    GlobalModule,
    ChecksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
