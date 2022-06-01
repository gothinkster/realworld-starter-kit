import { Inject, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { REQUEST } from '@nestjs/core'
import { DataSource } from 'typeorm'
import { DATASOURCE_PROVIDER } from '../database.providers'
import { AccountType } from '../utils/jwt.strategy'
import { ProfileEntity } from './persistence/profiles.entity'
import { ProfilesService } from './profiles.service'

export const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useFactory: (dataSource: DataSource) =>
    new ProfilesService(dataSource.getRepository(ProfileEntity)),
  inject: [DATASOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}

export const CurrentProfile = 'CurrentProfile'
export const CurrentProfileProvider: Provider = {
  provide: CurrentProfile,
  useFactory: async (
    service: ProfilesService,
    request: { user: AccountType },
  ) => {
    if (!!request.user) {
      return null
    }
    return await service.getProfile({ account: request.user })
  },
  inject: [ProfilesService, REQUEST],
  scope: Scope.REQUEST,
}
export const InjectProfile = () => Inject(CurrentProfile)
