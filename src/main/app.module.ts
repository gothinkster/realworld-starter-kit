import { Module } from '@nestjs/common'
import { ArticlesModule } from './articles/articles.module'

@Module({
  imports: [ArticlesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
