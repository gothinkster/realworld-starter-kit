import { Inject, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { DataSource } from 'typeorm'
import { AccountEntity } from '../../persistence/accounts.entity'
import { DATASOURCE_PROVIDER } from './database.providers'

const AccountRepositoryToken = 'AccountRepository'

export const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(AccountEntity),
  inject: [DATASOURCE_PROVIDER],
  scope: Scope.DEFAULT,
}

export const InjectAccountRepository = () => Inject(AccountRepositoryToken)
