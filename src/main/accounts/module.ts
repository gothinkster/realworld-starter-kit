import { Module, Scope } from '@nestjs/common'
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface'
import { Connection } from 'typeorm'
import { DatabaseModule } from '../db.module'
import { AccountRepositoryToken, AccountsController } from './controller'
import { AccountEntity } from './entity'

const AccountRepositoryORMProvider: Provider = {
  provide: AccountRepositoryToken,
  useFactory: (connection: Connection) =>
    new connection.getRepository(AccountEntity),
  inject: [Connection],
  scope: Scope.DEFAULT,
}

@Module({
  imports: [DatabaseModule],
  providers: [AccountRepositoryORMProvider],
  controllers: [AccountsController],
})
export class AccountsModule {}
