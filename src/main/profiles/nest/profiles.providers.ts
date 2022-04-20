import { Inject, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { REQUEST } from '@nestjs/core'
import { Connection } from 'typeorm'
import { AccountType } from '../../utils/jwt.strategy'
import { ProfileEntity } from '../persistence/profiles.entity'
import { ProfilesService } from '../profiles.service'

export const ProfilesServiceProvider: Provider = {
  provide: ProfilesService,
  useFactory: (connection: Connection) =>
    new ProfilesService(connection.getRepository(ProfileEntity)),
  inject: [Connection],
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
