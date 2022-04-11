import { Module } from '@nestjs/common'
import { ArticlesModule } from './articles/articles.module'
import { ProfilesModule } from './profiles/profiles.module'

@Module({
  imports: [ArticlesModule, ProfilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
