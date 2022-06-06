import { Module } from '@nestjs/common'
import { ProfilesService } from '../../domain/profiles/service'
import { ProfilesController } from '../controllers/profiles.controller'
import { ProfilesServiceProvider } from '../providers/profiles.providers'

@Module({
  providers: [ProfilesServiceProvider],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
