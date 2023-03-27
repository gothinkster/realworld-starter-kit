import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { ArticlesModule } from '../articles/articles.module'

@Module({
  controllers: [HealthController],
  imports: [ArticlesModule],
})
export class HealthModule {}
