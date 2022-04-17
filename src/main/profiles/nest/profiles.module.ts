import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../db.module'
import {
  ProfilesLifecycleController,
  ProfilesViewsController,
} from './profiles.controller'
import { ProfilesService } from '../profiles.service'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'

const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useClass: ProfilesService,
}

@Module({
  imports: [DatabaseModule],
  providers: [ProfilesServiceProvider],
  controllers: [ProfilesLifecycleController, ProfilesViewsController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
