import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { AccountsController } from './controller'
import { AccountEntity } from './models/account.entity'
import {
  AccountRepositoryToken,
  AccountsService,
} from './auth/accounts.service'
import { LocalAuthPassport } from './auth/local.auth'
import { GlobalModule } from '../global.module'

const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    new connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [GlobalModule],
  providers: [AccountRepository, AccountsService, LocalAuthPassport],
  controllers: [AccountsController],
})
export class AccountsModule {}
