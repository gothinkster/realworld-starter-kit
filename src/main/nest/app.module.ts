import { Module } from '@nestjs/common'
import { AccountsModule } from './modules/accounts.module'
import { ArticlesModule } from './modules/articles.module'
import { GlobalModule } from './modules/global.module'
import { ProfilesModule } from './modules/profiles.module'

@Module({
  imports: [ArticlesModule, ProfilesModule, AccountsModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
