import { Inject, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { DATA_SOURCE_PROVIDER } from '../database/database.providers'
import { AccountEntity } from './models/accounts.entity'

const AccountRepositoryToken = 'AccountRepository'

export const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(AccountEntity),
  inject: [DATA_SOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}

export const InjectAccountRepository = () => Inject(AccountRepositoryToken)
