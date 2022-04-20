import { Inject, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { AccountEntity } from './models/accounts.entity'

const AccountRepositoryToken = 'AccountRepository'

export const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

export const InjectAccountRepository = () => Inject(AccountRepositoryToken)
