import { Module } from '@nestjs/common'
import { GlobalModule } from '../global.module'
import { ProfilesController } from './profiles.controller'
import {
  CurrentProfile,
  CurrentProfileProvider,
  ProfilesServiceProvider,
} from './profiles.providers'
import { ProfilesService } from './profiles.service'

@Module({
  imports: [GlobalModule],
  providers: [ProfilesServiceProvider, CurrentProfileProvider],
  controllers: [ProfilesController],
  exports: [ProfilesService, CurrentProfile],
})
export class ProfilesModule {}
