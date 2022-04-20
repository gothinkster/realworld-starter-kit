import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { GlobalModule } from '../../global.module'
import { Profile } from '../profile.entity'
import { ProfilesService } from '../profiles.service'
import { ProfilesController } from './profiles.controller'

const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useFactory: (connection: Connection) =>
    new ProfilesService(connection.getRepository(Profile)),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [GlobalModule],
  providers: [ProfilesServiceProvider],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
