import { Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { ProfilesService } from '../../domain/profiles/service'
import { ProfileEntity } from '../../persistence/profiles.entity'
import { DATASOURCE_PROVIDER } from './database.providers'

export const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useFactory: (dataSource: DataSource) =>
    new ProfilesService(dataSource.getRepository(ProfileEntity)),
  inject: [DATASOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}
