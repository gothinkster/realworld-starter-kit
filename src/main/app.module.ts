import { Module } from '@nestjs/common'
import { ArticlesModule } from './articles/nest/articles.module'
import { ProfilesModule } from './profiles/nest/profiles.module'
import { AccountsModule } from './accounts/module'
import { GlobalModule } from './global.module'

@Module({
  imports: [ArticlesModule, ProfilesModule, AccountsModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
