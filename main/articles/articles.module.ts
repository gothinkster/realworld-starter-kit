import { Module } from '@nestjs/common'
import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { AuthorsModule } from '../authors/authors.module'

@Module({
  imports: [AuthorsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
