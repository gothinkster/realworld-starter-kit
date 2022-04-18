import { Module } from '@nestjs/common'
import {
  ProfilesLifecycleController,
  ProfilesViewsController,
} from './profiles.controller'
import { ProfilesService } from '../profiles.service'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { GlobalModule } from '../../global.module'

const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useClass: ProfilesService,
}

@Module({
  imports: [GlobalModule],
  providers: [ProfilesServiceProvider],
  controllers: [ProfilesLifecycleController, ProfilesViewsController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
