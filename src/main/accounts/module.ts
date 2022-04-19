import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { GlobalModule } from '../global.module'
import {
  AccountRepositoryToken,
  AccountsService,
} from './auth/accounts.service'
import { LocalAuthPassport } from './auth/local.auth'
import { AccountsController } from './controller'
import { AccountEntity } from './models/account.entity'

const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [GlobalModule],
  providers: [AccountRepository, AccountsService, LocalAuthPassport],
  controllers: [AccountsController],
})
export class AccountsModule {}
