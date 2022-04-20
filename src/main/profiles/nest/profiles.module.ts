import { Module } from '@nestjs/common'
import { GlobalModule } from '../../global.module'
import { ProfilesService } from '../profiles.service'
import { ProfilesController } from './profiles.controller'
import {
  CurrentProfile,
  CurrentProfileProvider,
  ProfilesServiceProvider,
} from './profiles.providers'

@Module({
  imports: [GlobalModule],
  providers: [ProfilesServiceProvider, CurrentProfileProvider],
  controllers: [ProfilesController],
  exports: [ProfilesService, CurrentProfile],
})
export class ProfilesModule {}
