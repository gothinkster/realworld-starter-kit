import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { DatabaseModule } from '../db.module'
import { AccountsController } from './controller'
import { AccountEntity } from './models/account.entity'
import {
  AccountRepositoryToken,
  AccountsService,
} from './auth/accounts.service'
import { BasicAuthStrategy } from './auth/local.auth'

const AccountRepository: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    new connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [DatabaseModule],
  providers: [AccountRepository, AccountsService, BasicAuthStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
