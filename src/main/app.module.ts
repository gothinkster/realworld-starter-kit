import { Module } from '@nestjs/common'
import { AccountsModule } from './accounts/accounts.module'
import { ArticlesModule } from './articles/articles.module'
import { DatabaseModule } from './database/database.module'
import { ProfilesModule } from './profiles/profiles.module'

@Module({
  imports: [ArticlesModule, ProfilesModule, AccountsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
