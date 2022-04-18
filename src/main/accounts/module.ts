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
import { LocalStrategy } from './auth/local.strategy'

const AccountRepositoryORMProvider: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    new connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [DatabaseModule],
  providers: [AccountRepositoryORMProvider, AccountsService, LocalStrategy],
  controllers: [AccountsController],
})
export class AccountsModule {}
