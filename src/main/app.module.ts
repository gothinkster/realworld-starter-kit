import { Module } from '@nestjs/common'
import { AccountsModule } from './accounts/accounts.module'
import { ArticlesModule } from './articles/nest/articles.module'
import { ProfilesModule } from './profiles/nest/profiles.module'

@Module({
  imports: [ArticlesModule, ProfilesModule, AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
