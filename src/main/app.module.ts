import { Module } from '@nestjs/common'
import { AccountsModule } from './accounts/accounts.module'
import { ArticlesModule } from './articles/articles.module'
import { GlobalModule } from './global.module'
import { ProfilesModule } from './profiles/profiles.module'

@Module({
  imports: [ArticlesModule, ProfilesModule, AccountsModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
