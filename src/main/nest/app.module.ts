import { Module } from '@nestjs/common'
import { AccountsModule } from './modules/accounts.module'
import { ArticlesModule } from './modules/articles.module'
import { AuthorsModule } from './modules/authors.module'
import { CommentsModule } from './modules/comments.module'
import { GlobalModule } from './modules/global.module'

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
export class AppModule {}
