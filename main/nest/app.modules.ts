import { Module } from '@nestjs/common'

import { HealthModule } from '../health/health.module'
import { GlobalModule } from '../global/global.module'
import { CommentsModule } from '../comments/comments.module'
import { ArticlesModule } from '../articles/articles.module'
import { AuthorsModule } from '../authors/authors.module'
import { AccountsModule } from '../accounts/accounts.module'

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    CommentsModule,
    AccountsModule,
    HealthModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModules {}
