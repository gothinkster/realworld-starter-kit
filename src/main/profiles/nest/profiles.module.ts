import { Module } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { GlobalModule } from '../../global.module'
import { ProfilesService } from '../profiles.service'
import {
  ProfilesLifecycleController,
  ProfilesViewsController,
} from './profiles.controller'

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
