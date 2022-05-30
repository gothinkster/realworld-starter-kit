import { Module } from '@nestjs/common'
import { ProfilesController } from './profiles.controller'
import {
  CurrentProfile,
  CurrentProfileProvider,
  ProfilesServiceProvider,
} from './profiles.providers'
import { ProfilesService } from './profiles.service'

@Module({
  providers: [ProfilesServiceProvider, CurrentProfileProvider],
  controllers: [ProfilesController],
  exports: [ProfilesService, CurrentProfile],
})
export class ProfilesModule {}
